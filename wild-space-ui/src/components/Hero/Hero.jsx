import { Component } from 'react';
import './Hero.css';
import { SpriteService, Vector2 } from '../../services/sprite-service';
import { EngineService } from '../../services/engine-service';
import { Arrows, RootFrames, KeyMappings } from '../../services/constants';
import SpaceHeroImage from '../../assets/astronaut-assets.png';
import UIElement from '../../assets/e-letter.png'

export default class Hero extends Component {

  constructor(props){
    super(props);
    this.spriteService = new SpriteService({
      frameSize: new Vector2(60, 90),
      hFrames: 4,
      vFrames: 4,
      frame: RootFrames.DOWN,
      scale: 0.3
    });

    this.state = {
      heroSprite: this.spriteService.getSprite(),  
      position: { x: this.props.startPosX, y: this.props.startPosY },
      speed: 3,
      walkingAnimationIndex: 0,
      zIndex: 10,
      showInteractField: false
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

      if(this.props.isGameOnPause){
        return;
      }

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

      // перемещение камеры, для слежения за игроком
      this.props.updateCameraPosition(position);
      
    }, this.interval);
  }

  handleInteraction = (openEditor) => {
    const {toggleDisplayInterface} = this.props;
    toggleDisplayInterface(openEditor);
  };

  handleInteractionWindow = (interactionWindowInfo) => {
    const {toggleDisplayInteractWindow} = this.props;
    toggleDisplayInteractWindow(interactionWindowInfo);
  };

  handleKeyDown(event) {
    const { code } = event;
    const { heroSprite, position } = this.state;
    const { objects } = this.props;
    const computer = objects.find(x => x.name === 'Computer');

    const {updateGamePauseState} = this.props;
    if(code === 'Escape'){
      updateGamePauseState(false);
      // закрываем редактор кода
      this.handleInteraction(false);
    }

    if(this.props.isGameOnPause){
      return;
    }

    if(code === 'KeyE' && this.engineService.couldInteractWith(heroSprite, position, computer)){
      // открываем редактор кода
      updateGamePauseState(true);
      this.handleInteraction(true);
    }

    const interactableObjects = objects
      .filter(x => x.isInteractable)
      .filter(x => this.engineService.couldInteractWith(heroSprite, position, x));

    if(interactableObjects.length > 0){
      // доработать взаимодествие с объектами
      const enableInteractWindowIds = interactableObjects.map(element => {
        return element.id;
      });
      this.handleInteractionWindow(enableInteractWindowIds);

      // скрытие поля "E"
      this.setState({showInteractField: true});
    }
    else{
      // отображение поля "E"
      this.setState({showInteractField: false});
    }

    const mappedKey = KeyMappings[code];
    const arrowPressed = mappedKey && Object.values(Arrows).includes(mappedKey);

    if (arrowPressed && !this.keysPressed[mappedKey]) {
      this.keysPressed[mappedKey] = true;
      this.startMovement();
    }
  }

  handleKeyUp(event) {
    const { code } = event;
    const mappedKey = KeyMappings[code];
    const arrowPressed = mappedKey && Object.values(Arrows).includes(mappedKey);

    if (arrowPressed) {
      this.keysPressed[mappedKey] = false;
      const noneArrowsAreHeld = Object.values(Arrows).every(key => !this.keysPressed[key]);
      if (noneArrowsAreHeld) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.setState({ walkingAnimationIndex: 0 });
  
        // Сбрасываем анимацию в Idle
        let idleFrame;
        if (mappedKey === Arrows.UP) idleFrame = RootFrames.UP;
        else if (mappedKey === Arrows.DOWN) idleFrame = RootFrames.DOWN;
        else if (mappedKey === Arrows.LEFT) idleFrame = RootFrames.LEFT;
        else if (mappedKey === Arrows.RIGHT) idleFrame = RootFrames.RIGHT;
  
        const newHeroSprite = { ...this.state.heroSprite, frame: idleFrame };
        this.setState({ heroSprite: newHeroSprite });
      }
      else {
        this.startMovement(); // Продолжаем движение, даже если было нажато другое направление
      }
    }
  }

  render() {
    const { heroSprite, position, zIndex, showInteractField } = this.state;
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
        <div
         className={ showInteractField ? 'interactable-field' : 'none-interactable-field' }
         style={{backgroundImage: `url(${UIElement})`}}></div>
      </div>
      );
    };
  }