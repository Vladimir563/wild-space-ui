import './GameCanvas.css';
import Ground from '../Ground';
import Hero from '../Hero';
import { Component } from 'react';
import { ImgLoaderService } from '../../services/img-loader-service';
import { GameObjectsLoaderService } from '../../services/game-objects-loader-service';
import GameObject from '../../components/GameObject';
import AnimatedGameObject from '../../components/AnimatedGameObject'


export default class GameCanvas extends Component {

  constructor() {
    super();
    this.state = {
      isDisplayInterface: false,
      gameObjects: [],
      groundWalls: [],
      gameComponents: [],
      offsetX: 0,
      oldWidth: window.innerWidth
    };

    this.toggleDisplayInterface = this.toggleDisplayInterface.bind(this);

    this.imgLoaderService = new ImgLoaderService();
    this.images = this.imgLoaderService.loadGameObjectImages();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.setAllObjects();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleDisplayInterface(isDisplayInterface) {
    this.setState({ isDisplayInterface });
  }

  handleResize = () => {
    const newWidth = window.innerWidth;
    const resizeValue = this.state.oldWidth - newWidth;
    if(newWidth > 970){
      this.setState({ offsetX: -resizeValue/2 });
    }
  };

  setAllObjects = () => {
    const gameObjectsLoaderService = new GameObjectsLoaderService();
    const gameObjects = gameObjectsLoaderService.loadGameObjects();
    const groundWalls = gameObjectsLoaderService.loadGroundWalls();
    const gameComponents = this.buildGameComponents([...gameObjects, ...groundWalls]);

    this.setState({
      gameObjects: gameObjects,
      groundWalls: groundWalls,
      gameComponents: gameComponents
    });  
  }

  buildGameComponents = (gameObjects) => {
    let id = 0;
    return gameObjects.map((gameObject) => {
        if (gameObject.animationInterval > 0) {
        // возвращаем анимированный объект
        return (
            <AnimatedGameObject
                key={id++}
                frameSize={gameObject.frameSize}
                position={gameObject.position}
                hFrames={gameObject.hFrames}
                vFrames={gameObject.vFrames}
                frame={gameObject.frame}
                scale={gameObject.scale}
                image={this.images.get(gameObject.name)}
                animationInterval={gameObject.animationInterval}
                enableAnimation={gameObject.enableAnimation}
                bgColor={gameObject.bgColor}
                offsetX={this.state.offsetX}/>
            );
        } else {
        // возвращаем просто объект
        return (    
            <GameObject
                key={id++}
                frameSize={gameObject.frameSize}
                position={gameObject.position}
                hFrames={gameObject.hFrames}
                vFrames={gameObject.vFrames}
                frame={gameObject.frame}
                scale={gameObject.scale}
                image={this.images.get(gameObject.name)}
                bgColor={gameObject.bgColor}
                offsetX={this.state.offsetX}/>
            );
        }
    });
  }

  render(){
    // сделать загрузку всех игровых объектов через .map в return()
    const {isDisplayInterface, gameObjects, groundWalls} = this.state;


    return (
      <div className="game-canvas">
          <Ground /> 
          <Hero
            objects={[...gameObjects, ...groundWalls]}
            toggleDisplayInterface={this.toggleDisplayInterface}
            offsetX = {this.state.offsetX}/>
          
          {this.buildGameComponents([...gameObjects, ...groundWalls])}

          <div
            className='interface'
            style={
              {
                  visibility: isDisplayInterface ? 'visible' : 'hidden'
              }}>
          </div>
      </div>
    );
  };
}