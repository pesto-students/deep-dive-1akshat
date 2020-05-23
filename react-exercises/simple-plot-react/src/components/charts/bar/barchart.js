import React from 'react';
import * as d3 from 'd3';
import XAxis from './xaxis';
import YAxis from './yaxis';
import Bar from './bar';
import './style.css';

class BarChart extends React.Component {

  render() {
    const data = this.props.data;
    const margin = { top: 20, right: 20, bottom: 30, left: 45 };
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;
    const labelKey = this.props.labelKey;
    const valueKey = this.props.valueKey;
    const barColor = this.props.barColor;
    const barWidth = this.props.barWidth;
    const strokeColor = this.props.strokeColor;
    const axisLabelColor = this.props.axisLabelColor;
    const strokeWidth = this.props.strokeWidth;

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

    let bars = [];
    let bottom = 450;

    data.forEach((bar, index) => {
      bars.push(
        <Bar
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
      <div className="svgFrame">
        <svg width={this.props.width} height={this.props.height}>
          <YAxis
            y={40}
            labels={y.ticks().reverse()}
            start={15}
            end={height}
            strokeColor={strokeColor}
            axisLabelColor={axisLabelColor}
            strokeWidth={strokeWidth}
          />

          <g className="chart" transform={`translate(${margin.left},${margin.top})`}>
            {bars}
            <XAxis
              x={bottom}
              labels={xAxisData}
              start={0}
              end={width}
              strokeColor={strokeColor}
              axisLabelColor={axisLabelColor}
              strokeWidth={strokeWidth}
            />
          </g>
        </svg>
      </div>
    );
  }

}

export default BarChart;