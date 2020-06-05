import React from 'react';
import './App.css';
import { Bounce, Fade, Pulse } from './components/index';

const App = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Simple Anime Library</h1>
      <div className="container">
        <div className="wrap">
          <Bounce duration="5000" delay="500" cascade={false} damping="1" >
            <div className="block-red">
              <p>Bounce</p>
            </div>
            <div className="block-red">
              <p>Bounce</p>
            </div>
            <div className="block-red">
              <p>Bounce</p>
            </div>
          </Bounce>

          <Fade duration="5000" delay="1000" cascade={false} damping="1" method="fadeIn" className="animate">
            <div className="block-grey">
              <p>Fade In</p>
            </div>
            <div className="block-grey">
              <p>Fade In</p>
            </div>
            <div className="block-grey">
              <p>Fade In</p>
            </div>
          </Fade>

          <Fade duration="5000" delay="1000" cascade={false} damping="2.5" method="fadeOut">
            <div className="block-orange">
              <p>Fade Out</p>
            </div>
            <div className="block-orange">
              <p>Fade Out</p>
            </div>
            <div className="block-orange">
              <p>Fade Out</p>
            </div>
          </Fade>

          <Pulse duration="5000" delay="1000" className="parent" cascade={true} damping="2.5">
            <div className="block-cadetblue">
              <p>Pulse</p>
            </div>
            <div className="block-cadetblue">
              <p>Pulse</p>
            </div>
            <div className="block-cadetblue">
              <p>Pulse</p>
            </div>
          </Pulse>
        </div>
      </div>
    </>
  );
}

export default App;
