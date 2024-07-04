import React from 'react'
import ReactDOM from 'react-dom/client'
import GameCanvas from './components/GameCanvas'
import './index.css'

var screenWidth = 352;
var screenHeight = 198;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameCanvas width={screenWidth} height={screenHeight} />
  </React.StrictMode>,
)

var root = document.getElementById('root');
root.style.width = `${screenWidth}px`;
root.style.height = `${screenHeight}px`;
