import { Component } from 'react';
import GameObject from '../GameObject/GameObject';
import './AnimatedGameObject.css';
import { SpriteService } from '../../services/sprite-service';

export default class AnimatedGameObject extends Component {
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
            isInteractable: this.props.isInteractable,
            sprite: this.spriteService.getSprite(),
            position: this.props.position,
            image: this.props.image,
            enableAnimation: this.props.enableAnimation
        }

        this.intervalId = null;
        this.interval = this.props.animationInterval;
    }

    componentDidMount() {
        const { enableAnimation } = this.state;
        if(enableAnimation) {
            this.animateGameObject();
        }
    }

    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    animateGameObject =() => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.intervalId = setInterval(() => {
            this.updateFrame();
        }, this.interval);
    }

    updateFrame() {
        const {sprite:{frame}, sprite:{hFrames}} = this.state;

        const newFrame = frame < hFrames - 1 ? frame + 1 : 0;
        this.setState((prevState) => ({
            sprite: {
                ...prevState.sprite,
                frame: newFrame
            }
        }));

        this.changeGameObjectFrame(frame);
    }

    changeGameObjectFrame = (newFrame) => {
        // Логика изменения состояния дочернего компонента
        this.animatedGameObjectRef.updateFrame(newFrame);
    };

    render() {
        const { sprite, position, image, id, isInteractable, name } = this.state;
        return (
            <div className="animated-game-object">
                <GameObject
                    id={id}
                    name={name}
                    isInteractable={isInteractable}
                    frameSize={sprite.frameSize}
                    position={position}
                    hFrames={sprite.hFrames}
                    vFrames={sprite.vFrames}
                    frame={sprite.frame}
                    scale={sprite.scale}
                    image={image}
                    ref={(ref) => (this.animatedGameObjectRef = ref)}/>
            </div>
            );
        };
    }