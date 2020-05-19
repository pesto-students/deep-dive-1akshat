import React from 'react';


const defaultProperties = {
  width: 500,
  height: 500,
  data: null,
  xLabel: null,
  yLabel: null,
  legend: true,
  margin: {
    top: 0, left: 0, bottom: 0, right: 0
  }
}


const LineChart = (props) => {
  const chartProps = {
    ...defaultProperties
  }
  return (
    <>
      <p>I am line component.</p>
      {console.log(chartProps)}
    </>
  )

}

export default LineChart;