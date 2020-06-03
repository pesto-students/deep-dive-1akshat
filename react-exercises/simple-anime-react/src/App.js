import React from 'react';
import './App.css';
import Bounce from './components/Bounce/bounce';



const App = () => {
  return (
    <>
      <p>This will be consuming component.</p>
      <Bounce duration="5000" delay="1000" >
        <div className="block"></div>
      </Bounce>
    </>
  );
}

export default App;
