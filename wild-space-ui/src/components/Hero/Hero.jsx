import { Component } from 'react';
import './Hero.css';
import { SpriteService, Vector2 } from '../../services/sprite-service';
import { EngineService } from '../../services/engine-service';
import { Arrows, RootFrames } from '../../services/constants';
import SpaceHeroImage from '../../assets/astronaut-assets.png';

export default class Hero extends Component {

  constructor(){
    super();
    this.spriteService = new SpriteService({
      frameSize: new Vector2(60, 90),
      hFrames: 4,
      vFrames: 4,
      frame: RootFrames.DOWN,
      scale: 0.3
    });

    this.state = {
      heroSprite: this.spriteService.getSprite(),  
      position: { x: 150, y: 100 },
      speed: 3,
      walkingAnimationIndex: 0,
      zIndex: 10
    }

    this.engineService = new EngineService();
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

  startMovement = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      const { heroSprite, position, speed, walkingAnimationIndex } = this.state;
      const { objects } = this.props;

      let newHeroSprite = { ...heroSprite };
      let newWalkingIndex = walkingAnimationIndex;
      let newPosition = { ...position };

      if(newWalkingIndex === heroSprite.hFrames) {
        newWalkingIndex = 0;
      }

      let newDirection = '';
      let deltaX = 0;
      let deltaY = 0;

      if (this.keysPressed[Arrows.UP]) {
        deltaY -= speed;
        newDirection = RootFrames.UP;
      } else if (this.keysPressed[Arrows.DOWN]) {
        deltaY  += speed;
        newDirection = RootFrames.DOWN;
      }

      if (this.keysPressed[Arrows.LEFT]) {
        deltaX -= speed;
        newDirection = RootFrames.LEFT;
      } else if (this.keysPressed[Arrows.RIGHT]) {
        deltaX += speed;
        newDirection = RootFrames.RIGHT;
      }

      if (deltaX !== 0 && deltaY !== 0) {
        // Нормализуем скорость при движении по диагонали
        deltaX /= Math.sqrt(2);
        deltaY /= Math.sqrt(2);
      }

      const potentialNewPositionX = {
        y: newPosition.y,
        x: newPosition.x + deltaX,
      };
      const potentialNewPositionY = {
        y: newPosition.y + deltaY,
        x: newPosition.x,
      };

      // проверяем возможность движения по X
      if (!this.engineService.checkCollision(potentialNewPositionX, heroSprite.frameSize, speed, objects)) {
        newPosition.x += deltaX;
      }

      // проверяем возможность движения по Y
      if (!this.engineService.checkCollision(potentialNewPositionY, heroSprite.frameSize, speed, objects)) {
        newPosition.y += deltaY;
      }

      // всегда обновляем анимацию
      const walkingFrames = this.spriteService.makeWalkingFrames(newDirection);
      newHeroSprite.frame = walkingFrames.frames[newWalkingIndex].frame;
      newWalkingIndex++;

      this.setState({
        heroSprite: newHeroSprite,
        walkingAnimationIndex: newWalkingIndex,
        position: newPosition
      });

      // TODO: отображение подсказки о взаимодействии (не реализовано)
      var allInteractableObjects = this.engineService.getAllInteractableObjects(heroSprite, position, objects);
      if(allInteractableObjects.size > 0) {
        //console.log(allInteractableObjects);
      }
      
    }, this.interval);
  }

  handleInteraction = (openEditor) => {  
    const {toggleDisplayInterface} = this.props;
    toggleDisplayInterface(openEditor);
  };

  handleKeyDown(event) {
    const { key } = event;
    const { heroSprite, position } = this.state;
    const { objects } = this.props;
    const computer = objects.find(x => x.name === 'Computer');

    if(key === 'e' && this.engineService.couldInteractWith(heroSprite, position, computer)){
      // открываем редактор кода
      this.handleInteraction(true);
    }

    if(key === 'Escape'){
      // закрываем редактор кода
      this.handleInteraction(false);
    }

    const arrowPressed = Object.values(Arrows).includes(key);

    if (arrowPressed && !this.keysPressed[key]) {
      this.keysPressed[key] = true;
      this.startMovement();
    }
  }

  handleKeyUp(event) {
    const { key } = event;
    const arrowPressed = Object.values(Arrows).includes(key);

    if (arrowPressed) {
      this.keysPressed[key] = false;
      const noneArrowsAreHeld = Object.values(Arrows).every(key => !this.keysPressed[key]);
      if (noneArrowsAreHeld) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.setState({ walkingAnimationIndex: 0 });
  
        // Сбрасываем анимацию в Idle
        let idleFrame;
        if (key === Arrows.UP) idleFrame = RootFrames.UP;
        else if (key === Arrows.DOWN) idleFrame = RootFrames.DOWN;
        else if (key === Arrows.LEFT) idleFrame = RootFrames.LEFT;
        else if (key === Arrows.RIGHT) idleFrame = RootFrames.RIGHT;
  
        const newHeroSprite = { ...this.state.heroSprite, frame: idleFrame };
        this.setState({ heroSprite: newHeroSprite });
      }
      else {
        this.startMovement(); // Продолжаем движение, даже если было нажато другое направление
      }
    }
  }

  render() {
    const { heroSprite, position, zIndex } = this.state;
    const backgroundSize = heroSprite.frameSize.x * heroSprite.hFrames;
    const frameXPos = heroSprite.frameMap.get(heroSprite.frame).x;
    const frameYPos = heroSprite.frameMap.get(heroSprite.frame).y;

    return (
      <div
        className="hero"
        style={
            {
                backgroundImage: `url(${SpaceHeroImage})`,
                width: `${heroSprite.frameSize.x}px`,
                height: `${heroSprite.frameSize.y}px`,
                backgroundSize: `${backgroundSize}px`,
                backgroundPosition: `${-frameXPos}px ${-frameYPos}px`,
                top: position.y,
                left: position.x,
                zIndex: zIndex
            }}>
      </div>
      );
    };
  }