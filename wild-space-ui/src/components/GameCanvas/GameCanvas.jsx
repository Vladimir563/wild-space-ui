import './GameCanvas.css';
import SpaceBackground from '../../assets/space-sky.png';
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
    };
    this.toggleDisplayInterface = this.toggleDisplayInterface.bind(this);

    this.imgLoaderService = new ImgLoaderService();
    this.images = this.imgLoaderService.loadGameObjectImages();

    this.gameObjectsLoaderService = new GameObjectsLoaderService();
    this.gameObjects = this.gameObjectsLoaderService.loadGameObjects();
    this.groundWalls = this.gameObjectsLoaderService.loadGroundWalls();

    this.gameComponents = this.buildGameComponents([...this.gameObjects, ...this.groundWalls]);
  }

  toggleDisplayInterface(isDisplayInterface) {
    this.setState({ isDisplayInterface });
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
                bgColor={gameObject.bgColor}/>
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
                bgColor={gameObject.bgColor}/>
            );
        }
    });
  }

  render(){
    // сделать загрузку всех игровых объектов через .map в return()
    const {isDisplayInterface} = this.state;
    
    return (
      <div
        className="game-canvas"
        style={{backgroundImage: `url(${SpaceBackground})`}}>
          <Ground /> 
          <Hero
            objects={[...this.gameObjects, ...this.groundWalls]}
            toggleDisplayInterface={this.toggleDisplayInterface}/>
          
          {this.gameComponents}

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