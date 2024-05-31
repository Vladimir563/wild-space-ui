import './GameCanvas.css';
import SkyImage from '../../assets/sky.png';
import Ground from '../Ground';
import Hero from '../Hero';


function GameCanvas() {
  return (
    <div
      className="game-canvas"
      style={{backgroundImage: `url(${SkyImage})`}}>
        <Ground /> 
        <Hero />
    </div>
  );
}

export default GameCanvas;