import React, { useState } from 'react';
import './App.css';
import { Bounce, Fade, Pulse, Slide } from './components/index';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

  // const [bounce, setBounce] = useState(false);
  // const [slide, setSlide] = useState(false);
  // const [fadeIn, setFadeIn] = useState(false);
  // const [fadeOut, setFadeOut] = useState(false);
  // const [pulse, setPulse] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Simple Anime Library</h1>

      <div className="container">
        <div className="wrap">
          <Bounce duration="5000" delay="500" animationIterationCount="Infinite">
            <div className="block-red">
              <p>Bounce</p>
            </div>
          </Bounce>

          < Fade duration="2000" delay="500" cascade={true} damping="1.5" method="fadeIn" className="animate">
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

          <Fade duration="2000" delay="500" cascade={true} damping="1" method="fadeOut">
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

          <Pulse duration="2000" delay="500" className="parent">
            <div className="block-cadetblue">
              <p>Pulse</p>
            </div>
          </Pulse>

          {/* <Slide duration="2000" delay="500" className="parent">
            <div className="block-cadetblue">
              <p>Slide</p>
            </div>
          </Slide> */}
        </div>
      </div>
    </>
  );
}

export default App;
