import React from 'react';
import * as d3 from 'd3';
import XAxis from './xaxis';
import YAxis from './yaxis';
import Bar from './bar';

class BarChart extends React.Component {

  render() {
    const data = this.props.data;
    console.log(data);
    // if (Array.isArray(data) && data.length === 0) {
    //   throw Error('No Data Found')
    // }
    const margin = { top: 20, right: 20, bottom: 30, left: 45 };
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;
    const labelKey = this.props.labelKey;
    const valueKey = this.props.valueKey;
    const barColor = this.props.barColor === undefined ? '#14828E' : this.props.barColor;
    const barWidth = this.props.barWidth === undefined ? '20' : this.props.barWidth;

    // this.would be x label array
    const xAxisData = data.map((d) => d.labelKey);

    //D3 mathy bits    
    const ticks = d3.range(0, width, (width / data.length));
    const x = d3.scaleOrdinal()
      .domain(xAxisData)
      .range(ticks)
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d[valueKey])])
      .range([height, 0])

    let bars = []
    let bottom = 450

    data.forEach((bar, index) => {
      bars.push(<Bar
        key={index}
        x={x(bar[labelKey])}
        y={bottom - 6 - (height - y(bar[valueKey]))}
        width={barWidth}
        height={height - y(bar[valueKey])}
        style={{ fill: barColor }}
      />
      )
    })

    return (
      <svg width={this.props.width} height={this.props.height}>
        <YAxis y={40} labels={y.ticks().reverse()} start={15} end={height} />

        <g className="chart" transform={`translate(${margin.left},${margin.top})`}>
          {bars}
          <XAxis x={bottom} labels={xAxisData} start={0} end={width} />
        </g>
      </svg>
    );
  }

}

export default BarChart;