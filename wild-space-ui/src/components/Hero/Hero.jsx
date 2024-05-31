import { Component } from 'react';
import './Hero.css';
import { SpriteHelper, Vector2 } from '../../helpers/sprite-helper';
import Move from '../../constants/move';
import SpaceHeroImage from '../../assets/astronaut-assets.png';

export default class Hero extends Component {

  constructor(){
    super();
    this.state = {
      hero: new SpriteHelper({
        frameSize: new Vector2(60, 90),
        hFrames: 4,
        vFrames: 4,
        frame: Move.DOWN_IDLE,
        scale: 1
      }),
      position: { top: 0, left: 0 },
      speed: 15,
      walkingAnimationIndex: 0,
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

      let deltaX = 0;
      let deltaY = 0;

      if(newWalkingIndex === hero.hFrames) {
        newWalkingIndex = 0;
      }

      if (this.keysPressed['ArrowUp']) {
        deltaY -= speed;
        newHero.frame = this.makeWalkingFrames(Move.UP_IDLE).frames[newWalkingIndex].frame;
      } else if (this.keysPressed['ArrowDown']) {
        deltaY  += speed;
        newHero.frame = this.makeWalkingFrames(Move.DOWN_IDLE).frames[newWalkingIndex].frame;
      }

      if (this.keysPressed['ArrowLeft']) {
        deltaX -= speed;
        newHero.frame = this.makeWalkingFrames(Move.LEFT_IDLE).frames[newWalkingIndex].frame;
      } else if (this.keysPressed['ArrowRight']) {
        deltaX += speed;
        newHero.frame = this.makeWalkingFrames(Move.RIGHT_IDLE).frames[newWalkingIndex].frame;
      }

      if (deltaX !== 0 && deltaY !== 0) {
        // Нормализуем скорость при движении по диагонали
        deltaX /= Math.sqrt(2);
        deltaY /= Math.sqrt(2);
      }

      newPosition.top += deltaY;
      newPosition.left += deltaX;
      newWalkingIndex++;

      this.setState({
        hero: newHero,
        position: newPosition,
        walkingAnimationIndex: newWalkingIndex
      });
    }, this.interval);
  }

  handleKeyDown(event) {
    const { key } = event;
    if (!this.keysPressed[key]) {
      this.keysPressed[key] = true;
      this.startMovement();
    }
  }

  handleKeyUp(event) {
    const { key } = event;
    this.keysPressed[key] = false;

    if (!this.keysPressed['ArrowUp'] && !this.keysPressed['ArrowDown'] && !this.keysPressed['ArrowLeft'] && !this.keysPressed['ArrowRight']) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.setState({ walkingAnimationIndex: 0 });

      // Reset to idle frame
      let idleFrame;
      if (key === 'ArrowUp') idleFrame = Move.UP_IDLE;
      else if (key === 'ArrowDown') idleFrame = Move.DOWN_IDLE;
      else if (key === 'ArrowLeft') idleFrame = Move.LEFT_IDLE;
      else if (key === 'ArrowRight') idleFrame = Move.RIGHT_IDLE;

      const newHero = { ...this.state.hero, frame: idleFrame };
      this.setState({ hero: newHero });
    } else {
      this.startMovement(); // Continue movement if any other key is still pressed
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
                marginTop: position.top,
                marginLeft: position.left,
            }}>
      </div>
      );
    };
  }