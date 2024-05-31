import './Ground.css';
import GroundImage from '../../assets/ground.png';


function Ground() {
  return (
    <div
      className="ground"
      style={{backgroundImage: `url(${GroundImage})`}}>
    </div>
  );
}

export default Ground;