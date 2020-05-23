import React, { Component } from 'react';
import * as d3 from 'd3';


class YAxis extends Component {
  render() {
    let style = {
      stroke: "red",
      strokeWidth: "2px"
    }

    let textStyle = {
      fontSize: "0.8em",
      fill: "red",
      textAnchor: "end"
    }

    //D3 mathy bits
    let ticks = d3.range(0, this.props.end, (this.props.end / this.props.labels.length))

    let lines = []
    ticks.forEach((tick, index) => {
      lines.push(<line style={style} y1={tick} x1={this.props.y} y2={tick} x2={this.props.y - 4} />)
    })

    let columnLables = []
    ticks.forEach((tick, index) => {
      columnLables.push(<text style={textStyle} y={tick + 6} x={this.props.y - 6} font-family="serif" >{this.props.labels[index]}</text>)
    })


    return (
      <g>
        <g className="y_labels" transform={`translate(${-5},${17})`}>
          <line x1={this.props.y} y1={this.props.start} y2={this.props.end} x2={this.props.y} style={style} />
        </g>
        <g className="y_labels" transform={`translate(${-5},${51})`}>
          {columnLables}
          {lines}
        </g>
      </g>
    )
  }

}

export default YAxis;