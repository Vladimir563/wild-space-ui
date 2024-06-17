import { Component } from "react";
import { SpriteService } from '../../services/sprite-service';
import './GameObject.css';

export default class GameObject extends Component {
    constructor(props) {
        super(props);
        this.spriteService = new SpriteService({
            frameSize: this.props.frameSize,
            hFrames: this.props.hFrames,
            vFrames: this.props.vFrames,
            frame: this.props.frame,
            scale: this.props.scale
            });

        this.state = {
            sprite: this.spriteService.getSprite(),
            position: this.props.position,
            image: this.props.image,
            bgColor: this.props.bgColor
        }
    }

    updateFrame = (newFrame) => {
        this.setState((prevState) => ({
            sprite: {
                ...prevState.sprite,
                frame: newFrame
            }
        }));
    }

    render() {
    const { sprite, position, image, bgColor } = this.state;
    const backgroundSize = sprite.frameSize.x * sprite.hFrames;
    const frameXPos = sprite.frameMap.get(sprite.frame).x;
    const frameYPos = sprite.frameMap.get(sprite.frame).y;
    
    return (
        <div
        className="game-object"
        style={
            {
                backgroundImage: `url(${image})`,
                width: `${sprite.frameSize.x}px`,
                height: `${sprite.frameSize.y}px`,
                backgroundSize: `${backgroundSize}px`,
                backgroundPosition: `${-frameXPos}px ${-frameYPos}px`,
                top: position.y,
                left: position.x + this.props.offsetX,
                backgroundColor: bgColor
            }}>
        </div>
        );
    };
}