import { Component } from 'react';
import './Hero.css';
import { SpriteHelper, Vector2 } from '../../helpers/sprite-helper';
import RootHeroFrames from '../../constants/RootHeroFrames';
import Move from '../../constants/Move';
import SpaceHeroImage from '../../assets/astronaut-assets.png';

export default class Hero extends Component {

  constructor(){
    super();
    this.state = {
      hero: new SpriteHelper({
        frameSize: new Vector2(60, 90),
        hFrames: 4,
        vFrames: 4,
        frame: RootHeroFrames.DOWN_IDLE,
        scale: 1
      }),
      position: { top: 450, left: 400 },
      speed: 10,
      walkingAnimationIndex: 0,
      zIndex: 4
    }

    this.keysPressed = {};
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.intervalId = null;
    this.interval = 70;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  makeWalkingFrames = (rootFrame = 0) => {
    return {
      frames: [
        {
          frame: rootFrame
        },
        {
          frame: rootFrame+1
        },
        {
          frame: rootFrame+2
        },
        {
          frame: rootFrame+3
        }
      ]
    }
  }

  startMovement = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      const { hero, walkingAnimationIndex, position, speed } = this.state;
      let newHero = { ...hero };
      let newWalkingIndex = walkingAnimationIndex;
      let newPosition = { ...position };

      if(newWalkingIndex === hero.hFrames) {
        newWalkingIndex = 0;
      }

      let newDirection = '';
      let deltaX = 0;
      let deltaY = 0;

      if (this.keysPressed[Move.UP]) {
        deltaY -= speed;
        newDirection = RootHeroFrames.UP_IDLE;
      } else if (this.keysPressed[Move.DOWN]) {
        deltaY  += speed;
        newDirection = RootHeroFrames.DOWN_IDLE;
      }

      if (this.keysPressed[Move.LEFT]) {
        deltaX -= speed;
        newDirection = RootHeroFrames.LEFT_IDLE;
      } else if (this.keysPressed[Move.RIGHT]) {
        deltaX += speed;
        newDirection = RootHeroFrames.RIGHT_IDLE;
      }

      if (deltaX !== 0 && deltaY !== 0) {
        // Нормализуем скорость при движении по диагонали
        deltaX /= Math.sqrt(2);
        deltaY /= Math.sqrt(2);
      }

      const potentialNewPositionX = {
        top: newPosition.top,
        left: newPosition.left + deltaX,
      };
      const potentialNewPositionY = {
        top: newPosition.top + deltaY,
        left: newPosition.left,
      };

      // проверяем возможность движения отдельно по X и Y
      if (!this.checkCollision(potentialNewPositionX)) {
        newPosition.left += deltaX;
      }

      if (!this.checkCollision(potentialNewPositionY)) {
        newPosition.top += deltaY;
      }

      // всегда обновляем анимацию
      newHero.frame = this.makeWalkingFrames(newDirection).frames[newWalkingIndex].frame;
      newWalkingIndex++;

      this.setState({
        hero: newHero,
        position: newPosition,
        walkingAnimationIndex: newWalkingIndex,
      });

    }, this.interval);
  }

  checkInteraction = () => {
    const { hero, position } = this.state;
    const { objects } = this.props;

    objects.forEach((obj) => {
      const interaction_radius = obj.width + obj.width / 2;
      const objectCenterX = obj.x + obj.width / 2;
      const objectCenterY = obj.y + obj.height / 2;
      const playerCenterX = position.left + hero.frameSize.x / 2;
      const playerCenterY = position.top + hero.frameSize.y / 2;

      const distance = Math.sqrt(
        Math.pow(objectCenterX - playerCenterX, 2) +
        Math.pow(objectCenterY - playerCenterY, 2)
      );

      
      let isDisplayUI = false;      
      if (distance <= interaction_radius) {
        // Вызываем функцию для взаимодействия с объектом
        this.handleInteraction(obj);
        isDisplayUI = true;
      }

      const {toggleDisplayInterface} = this.props;
      toggleDisplayInterface(isDisplayUI);
    });
  };

  handleInteraction = ({name}) => {
    // Реализация взаимодействия с объектом
    console.log(`Вы взаимодействуете с объектом ${name}`);
  };

  checkCollision = (newPosition) => {
    const { hero:{frameSize} } = this.state;
    const { objects } = this.props;
    const playerRect = {
      x: newPosition.left,
      y: newPosition.top,
      width: frameSize.x,
      height: frameSize.y,
    };

    return objects.some((obj) => {    
      const objectRect = {
        x: obj.x,
        y: obj.y,
        width: obj.width,
        height: obj.height,
      };

      return this.isColliding(playerRect, objectRect);
    });
  };

  isColliding = (rect1, rect2) => {
    const {speed} = this.state;
    return (
      rect1.x + speed <= rect2.x + rect2.width &&
      rect1.x + rect1.width >= rect2.x + speed &&
      rect1.y + speed <= rect2.y + rect2.height &&
      rect1.y + rect1.height >= rect2.y + speed
    );
  };

  handleKeyDown(event) {
    const { key } = event;

    if(key === 'e'){
        // Добавляем проверку на взаимодействие
        this.checkInteraction();
    }

    const arrowPressed = Object.values(Move).includes(key);

    if (arrowPressed && !this.keysPressed[key]) {
      this.keysPressed[key] = true;
      this.startMovement();
    }
  }

  handleKeyUp(event) {
    const { key } = event;
    const arrowPressed = Object.values(Move).includes(key);

    if (arrowPressed) {
      this.keysPressed[key] = false;
      const noneArrowsAreHeld = Object.values(Move).every(key => !this.keysPressed[key]);
      if (noneArrowsAreHeld) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.setState({ walkingAnimationIndex: 0 });
  
        // Сбрасываем анимацию в Idle
        let idleFrame;
        if (key === Move.UP) idleFrame = RootHeroFrames.UP_IDLE;
        else if (key === Move.DOWN) idleFrame = RootHeroFrames.DOWN_IDLE;
        else if (key === Move.LEFT) idleFrame = RootHeroFrames.LEFT_IDLE;
        else if (key === Move.RIGHT) idleFrame = RootHeroFrames.RIGHT_IDLE;
  
        const newHero = { ...this.state.hero, frame: idleFrame };
        this.setState({ hero: newHero });
      } else {
        this.startMovement(); // Продолжаем движение, даже если было нажато другое направление
      }
    }
  }

  render() {
    const {hero, position} = this.state;
    const backgroundSize = hero.frameSize.x * hero.hFrames;
    const frameXPos = hero.frameMap.get(hero.frame).x;
    const frameYPos = hero.frameMap.get(hero.frame).y;

    return (
      <div
        className="hero"
        style={
            {
                backgroundImage: `url(${SpaceHeroImage})`,
                width: `${hero.frameSize.x}px`,
                height: `${hero.frameSize.y}px`,
                backgroundSize: `${backgroundSize}px`,
                backgroundPosition: `${-frameXPos}px ${-frameYPos}px`,
                top: position.top,
                left: position.left
            }}>
      </div>
      );
    };
  }