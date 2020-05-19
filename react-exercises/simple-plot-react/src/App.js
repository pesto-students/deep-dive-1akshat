import React from 'react';
import './App.css';
import BarChart from './components/charts/bar/barchart';

const App = () => {
  return (
    <div className="App">
      <p>This page will interact with the users to get the desired props for the chart.</p>
      <BarChart data={[2, 4, 6, 8, 10, 14, 20, 5, 2]} fillColor={'grey'} individualBarWidth={40} width={700} height={500} scale={20} />
    </div>
  );
}

export default App;
