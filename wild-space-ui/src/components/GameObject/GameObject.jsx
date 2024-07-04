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
            id: this.props.id,
            name: this.props.name,
            sprite: this.spriteService.getSprite(),
            position: this.props.position,
            image: this.props.image,
            bgColor: this.props.bgColor,
            isInteractable: this.props.isInteractable
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
    const { sprite, position, image, bgColor, isInteractable } = this.state;
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
                    left: position.x,
                    backgroundColor: bgColor
                }}>
        </div>
        );
    };
}