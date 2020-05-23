import React, { Component } from 'react';
import * as d3 from 'd3';

class XAxis extends Component {


  render() {
    let style = {
      stroke: this.props.strokeColor,
      strokeWidth: this.props.strokeWidth
    }

    let step = (this.props.start + this.props.end / this.props.labels.length);
    //D3 mathy bits   
    let ticks = d3.range(this.props.start, this.props.end, step);

    let lines = [];
    ticks.forEach((tick, index) => {
      lines.push(
        <line
          key={index}
          style={style}
          x1={tick + 10}
          y1={this.props.x}
          x2={tick + 10}
          y2={this.props.x + 4} />)
    })

    let columnLables = []
    ticks.forEach((tick, index) => {
      columnLables.push(
        <text
          key={index}
          style={{ fill: "steelblue" }}
          x={tick + 5}
          y={this.props.x + 20}
          fontFamily="Verdana"
          fontSize="10">{this.props.labels[index]}
        </text>)
    })


    return (
      <g>
        <line x1={this.props.start} y1={this.props.x} x2={this.props.end} y2={this.props.x} style={style} />
        {columnLables}
        {lines}
      </g>
    )
  }

}

export default XAxis;