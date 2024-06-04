import './Ground.css';
import GroundImage from '../../assets/ground-sprites.png';
import { Component } from 'react';

export default class Ground extends Component {
  render(){
    return (
      <div
        className="ground"
        style={{backgroundImage: `url(${GroundImage})`}}>
      </div>
    );
  };
}
