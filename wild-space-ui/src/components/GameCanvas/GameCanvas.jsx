import './GameCanvas.css';
import SkyImage from '../../assets/sky.png';
import Ground from '../Ground';
import Hero from '../Hero';
import GameObject from '../GameObject/GameObject';
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
      { id: 1, position: new Vector2(550, 350), frameSize: new Vector2(50, 50), hFrames: 1, vFrames: 1, frame: 0, scale: 1, name: "Computer" },
      { id: 2, position: new Vector2(250, 400), frameSize: new Vector2(40, 40), hFrames: 11, vFrames: 1, frame: 0, scale: 1, name: "ClrPet" }
    ];

    const {isDisplayInterface} = this.state;
    const crlPet = objects.find((item) => item.name === 'ClrPet');

    return (
      <div
        className="game-canvas"
        style={{backgroundImage: `url(${SkyImage})`}}>
          <Ground /> 
          <Hero
            objects={objects}
            toggleDisplayInterface={this.toggleDisplayInterface}/>
          <GameObject
            frameSize={crlPet.frameSize}
            position={crlPet.position}
            hFrames={crlPet.hFrames}
            vFrames={crlPet.vFrames}
            frame={crlPet.frame}
            scale={crlPet.scale}
            image={this.images.get(crlPet.name)}/>

          <div className='simpleComponent'></div>
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