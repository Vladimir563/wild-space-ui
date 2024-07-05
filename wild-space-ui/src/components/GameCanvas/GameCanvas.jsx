import './GameCanvas.css';
import Hero from '../Hero';
import { Component } from 'react';
import { ImgLoaderService } from '../../services/img-loader-service';
import { GameObjectsLoaderService } from '../../services/game-objects-loader-service';
import GameObject from '../../components/GameObject';
import AnimatedGameObject from '../../components/AnimatedGameObject'
import UICodeEditor from '../../components/UICodeEditor';
import Ground from '../../assets/ground.png';


export default class GameCanvas extends Component {

  constructor(props) {
    super(props);
    var gameObjectsLoaderService = new GameObjectsLoaderService();

    this.state = {
      gameObjects: gameObjectsLoaderService.loadGameObjects(),
      groundWalls: gameObjectsLoaderService.loadGroundWalls(),
      gameComponents: [],
      displayUICodeEditor: false,
      cameraPosition: { x: 0, y: 0 },
      canvasWidth: this.props.width,
      canvasHeight: this.props.height,
      isGameOnPause: false
    };

    this.toggleDisplayInterface = this.toggleDisplayInterface.bind(this);
    this.toggleDisplayInteractWindow = this.toggleDisplayInteractWindow.bind(this);

    this.imgLoaderService = new ImgLoaderService();
    this.images = this.imgLoaderService.loadGameObjectImages();
  }

  componentDidMount() {
    this.updateGameComponents();
  }

  updateGameComponents = () => {
    const{gameObjects, groundWalls} = this.state;
    const newGameComponents = this.buildGameComponents([...gameObjects, ...groundWalls]);

    this.setState({gameComponents: newGameComponents});
  }

  updateCameraPosition = (playerPosition) => {
    this.setState({
      cameraPosition: {
        x: playerPosition.x - this.state.canvasWidth / 2,
        y: playerPosition.y - this.state.canvasHeight / 2
      }
    });
  }  

  toggleDisplayInterface(displayUICodeEditor) {
    this.setState({ displayUICodeEditor });
  }

  // доработать
  toggleDisplayInteractWindow(interactableObjectIds) {
    const interactableObjects = this.state.gameObjects
      .filter(x => interactableObjectIds.includes(x.id));
    //console.log(interactableObjectIds);
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
                enableAnimation={!this.state.isGameOnPause}
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

  updateGamePauseState = (isGameOnPause) => {
      this.setState({ isGameOnPause }, () => {
        this.updateGameComponents();
    });
  }

  render(){
    // сделать загрузку всех игровых объектов через .map в return()
    const {
      gameObjects,
      groundWalls,
      gameComponents,
      displayUICodeEditor,
      cameraPosition,
      canvasWidth,
      canvasHeight,
      isGameOnPause} = this.state;

    return (
      <>
        <UICodeEditor
          displayUICodeEditor={displayUICodeEditor}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          uiWidth={100}
          uiHeight={100}/>
        <div className="game-canvas"
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            backgroundImage: `url("${Ground}")`,
            transform: `translate(${-cameraPosition.x}px, ${-cameraPosition.y}px)`,
            opacity: isGameOnPause ? 0.3 : 1 
          }}>
            <Hero
              isGameOnPause={isGameOnPause}
              startPosX={canvasWidth/2}
              startPosY={canvasHeight/2}
              objects={[...gameObjects, ...groundWalls]}
              toggleDisplayInterface={this.toggleDisplayInterface}
              toggleDisplayInteractWindow={this.toggleDisplayInteractWindow}
              updateCameraPosition={this.updateCameraPosition}
              updateGamePauseState={this.updateGamePauseState}/>
            
            {gameComponents}
        </div>
      </>

    );
  };
}