import './GameCanvas.css';
import SkyImage from '../../assets/sky.png';
import Ground from '../Ground';
import Hero from '../Hero';


function GameCanvas() {

  const objects= [
    { id: 1, x: -150, y: 100, width: 50, height: 50 },
  ];

  return (
    <div
      className="game-canvas"
      style={{backgroundImage: `url(${SkyImage})`}}>
        <Ground /> 
        <Hero objects={objects}/>
        <div className='simpleComponent'></div>
    </div>
  );
}

export default GameCanvas;