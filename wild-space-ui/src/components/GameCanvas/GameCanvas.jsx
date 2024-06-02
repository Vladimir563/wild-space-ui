import './GameCanvas.css';
import SpaceBackground from '../../assets/space-background.png';
import Ground from '../Ground';
import Hero from '../Hero';
import GameObject from '../GameObject/GameObject';
import AnimatedGameObject from '../AnimatedGameObject'
import { Vector2 } from '../../services/sprite-service';
import { Component } from 'react';
import { ImgLoaderService } from '../../services/img-loader-service';


export default class GameCanvas extends Component {

  constructor() {
    super();
    this.state = {
      isDisplayInterface: false,
    };
    this.toggleDisplayInterface = this.toggleDisplayInterface.bind(this);

    this.imgLoaderService = new ImgLoaderService();
    this.images = this.imgLoaderService.loadGameObjectImages();
  }

  toggleDisplayInterface(isDisplayInterface) {
    this.setState({ isDisplayInterface });
  }

  render(){
    // сделать загрузку всех игровых объектов через .map в return()
    const objects= [
      { id: 1, position: new Vector2(550, 350), frameSize: new Vector2(70, 50), hFrames: 1, vFrames: 1, frame: 0, scale: 1, name: "Computer" },
      { id: 2, position: new Vector2(250, 400), frameSize: new Vector2(40, 40), hFrames: 11, vFrames: 1, frame: 0, scale: 1, name: "ClrPet" }
    ];

    const {isDisplayInterface} = this.state;
    const crlPet = objects.find((item) => item.name === 'ClrPet');
    const computer = objects.find((item) => item.name === 'Computer');

    return (
      <div
        className="game-canvas"
        style={{backgroundImage: `url(${SpaceBackground})`}}>
          <Ground /> 
          <Hero
            objects={objects}
            toggleDisplayInterface={this.toggleDisplayInterface}/>
          <AnimatedGameObject
            frameSize={crlPet.frameSize}
            position={crlPet.position}
            hFrames={crlPet.hFrames}
            vFrames={crlPet.vFrames}
            frame={crlPet.frame}
            scale={crlPet.scale}
            image={this.images.get(crlPet.name)}
            animationInterval={80}
            enableAnimation={false}/>

          <GameObject 
            frameSize={computer.frameSize}
            position={computer.position}
            hFrames={computer.hFrames}
            vFrames={computer.vFrames}
            frame={computer.frame}
            scale={computer.scale}
            image={this.images.get(computer.name)}/>
          



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