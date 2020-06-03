import React from 'react';
import './App.css';
import Bounce from './components/Bounce/bounce';
import Fade from './components/Fade/fade';
import Pulse from './components/Pulse/pulse';

const App = () => {
  return (
    <>
      <p>This will be consuming component.</p>
      <Bounce duration="5000" delay="1000" >
        <div className="block-red">Bounce</div>
      </Bounce>

      <Fade duration="5000" delay="1000" method="fadeIn">
        <div className="block-grey">Fade In</div>
      </Fade>
      
      <Fade duration="5000" delay="1000" method="fadeOut">
        <div className="block-cadetblue">Fade Out</div>
      </Fade>

      <Pulse duration="5000" delay="1000" className="parent">
        <div className="block-cadetblue">Pulse</div>
      </Pulse>
    </>
  );
}

export default App;
