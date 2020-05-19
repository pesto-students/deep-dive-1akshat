import React from 'react';
import './App.css';
import LineChart from './components/charts/linechart';
import BarChart from './components/charts/barchart';

const App = () => {
  return (
    <div className="App">
      <p>App Ok.</p>
      <LineChart />
      <BarChart />
    </div>
  );
}

export default App;
