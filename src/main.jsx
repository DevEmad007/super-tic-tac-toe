import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GameContext } from './hooks/useGameContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <GameContext>
    <App />
  </GameContext>
  /* </React.StrictMode> */
);
