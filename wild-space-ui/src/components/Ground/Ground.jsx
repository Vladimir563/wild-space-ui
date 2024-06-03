import './Ground.css';
import GroundImage from '../../assets/ground-sprites.png';


function Ground() {
  return (
    <div
      className="ground"
      style={{backgroundImage: `url(${GroundImage})`}}>
    </div>
  );
}

export default Ground;