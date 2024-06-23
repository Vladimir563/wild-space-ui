import './GameCanvas.css';
import Hero from '../Hero';
import { Component } from 'react';
import { ImgLoaderService } from '../../services/img-loader-service';
import { GameObjectsLoaderService } from '../../services/game-objects-loader-service';
import GameObject from '../../components/GameObject';
import AnimatedGameObject from '../../components/AnimatedGameObject'
import Ground from '../../assets/ground.png';


export default class GameCanvas extends Component {

  constructor() {
    super();
    this.state = {
      isDisplayInterface: false,
      isDisplayInteractWindow: false
    };

    this.toggleDisplayInterface = this.toggleDisplayInterface.bind(this);
    this.toggleDisplayInteractWindow = this.toggleDisplayInteractWindow.bind(this);

    this.imgLoaderService = new ImgLoaderService();
    this.images = this.imgLoaderService.loadGameObjectImages();

    const gameObjectsLoaderService = new GameObjectsLoaderService();
    this.gameObjects = gameObjectsLoaderService.loadGameObjects();
    this.groundWalls = gameObjectsLoaderService.loadGroundWalls();
    this.gameComponents = this.buildGameComponents([...this.gameObjects, ...this.groundWalls]);
  }

  toggleDisplayInterface(isDisplayInterface) {
    this.setState({ isDisplayInterface });
  }

  toggleDisplayInteractWindow(interactableObjectIds) {
    const interactableObjects = this.gameObjects
      .filter(x => interactableObjectIds.includes(x.id));
    console.log(interactableObjectIds);
  }

  buildGameComponents = (gameObjects) => {
    let id = 0;
    return gameObjects.map((gameObject) => {
        if (gameObject.animationInterval > 0) {
        // возвращаем анимированный объект
        return (
            <AnimatedGameObject
                key={id++}
                id={gameObject.id}
                name={gameObject.name}
                isInteractable={gameObject.isInteractable}
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
                id={gameObject.id}
                name={gameObject.name}
                isInteractable={gameObject.isInteractable}
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
    const {isDisplayInterface, isDisplayInteractWindow} = this.state;


    return (
      <div className="game-canvas"
        style={{
          backgroundImage: `url("${Ground}")`
        }}>
          <Hero
            objects={[...this.gameObjects, ...this.groundWalls]}
            toggleDisplayInterface={this.toggleDisplayInterface}
            toggleDisplayInteractWindow={this.toggleDisplayInteractWindow}/>
          
          {this.gameComponents}

          <div
            className='interface'
            style={
              {
                  visibility: isDisplayInterface ? 'visible' : 'hidden'
              }}>
          </div>

          <div
            className='interact-window'
            style={
              {
                  visibility: isDisplayInteractWindow ? 'visible' : 'hidden'
              }}>
          </div>
      </div>
    );
  };
}