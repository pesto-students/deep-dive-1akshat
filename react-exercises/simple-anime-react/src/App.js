import React from 'react';
import './App.css';
import Bounce from './components/Bounce/bounce';

const App = () => {
  return (
    <>
      <p>This will be consuming component.</p>
      <Bounce>
        <button>I will Bounce</button>
      </Bounce>
    </>
  );
}

export default App;
