import { Component } from 'react';
import './UICodeEditor.css';

export default class UICodeEditor extends Component {
    constructor(props) {
        super(props);
        this.canvasWidth = this.props.canvasWidth;
        this.canvasHeight = this.props.canvasHeight;
        this.uiWidth = this.props.uiWidth;
        this.uiHeight = this.props.uiHeight;
    }

    render(){
        return (
            <div
                className='ui-code-editor'
                style={
                {
                    visibility: this.props.displayUICodeEditor ? 'visible' : 'hidden',
                    textAlign: "center",
                    color: "white",
                    fontSize: "5px",
                    height: `${this.uiHeight}px`,
                    width: `${this.uiWidth}px`,
                    marginTop: `${this.canvasHeight/2 - this.uiHeight/2}px`,
                    marginLeft: `${this.canvasWidth/2 - this.uiWidth/2}px`,
                }}>
                Тут будет писаться код...
                <button style={{
                height: 15,
                fontSize: "5px"
                }}>компилировать</button>
            </div>);
    };
}