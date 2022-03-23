import React, {Component, useState} from "react";
import '../styles/App.css';

const App = () => {
  return (
    <>
    <div id="main">
      <h1>25:00</h1>
    <h1>Work-Time</h1>
    <button data-testid='start-btn'>start</button>
    <button data-testid='stop-btn'>Stop</button>
    <button data-testid='reset-btn'>Reset</button>
    <input data-testid='work-duration'>25</input>
    <input data-testid='break-duration'>5</input>
    <button data-testid='set-btn'>Set</button>
    </div>
    </>
  );
}


export default App;
