import './GameCanvas.css';
import SkyImage from '../../assets/sky.png';
import Ground from '../Ground';
import Hero from '../Hero';
import { Component } from 'react';


export default class GameCanvas extends Component {

  constructor() {
    super();
    this.state = {
      isDisplayInterface: false,
    };
    this.toggleDisplayInterface = this.toggleDisplayInterface.bind(this);
  }

  toggleDisplayInterface(isDisplayInterface) {
    this.setState({ isDisplayInterface });
  }

  render(){
    const objects= [
      { id: 1, x: 550, y: 350, width: 50, height: 50, zIndex: 2, name: "Computer" }
    ];

    const {isDisplayInterface} = this.state;

    return (
      <div
        className="game-canvas"
        style={{backgroundImage: `url(${SkyImage})`}}>
          <Ground /> 
          <Hero objects={objects} toggleDisplayInterface={this.toggleDisplayInterface}/>
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