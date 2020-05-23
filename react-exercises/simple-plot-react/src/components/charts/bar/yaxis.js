import React, { Component } from 'react';
import * as d3 from 'd3';


class YAxis extends Component {

  render() {
    let style = {
      stroke: this.props.strokeColor,
      strokeWidth: this.props.strokeWidth
    }

    let textStyle = {
      fontSize: "0.8em",
      fill: this.props.axisLabelColor,
      textAnchor: "end"
    }

    //D3 mathy bits
    let ticks = d3.range(0, this.props.end, (this.props.end / this.props.labels.length))

    let lines = []
    ticks.forEach((tick, index) => {
      lines.push(<line
        style={style}
        y1={tick}
        x1={this.props.y}
        y2={tick}
        x2={this.props.y - 4}
        key={index} />)
    })

    let columnLables = []
    ticks.forEach((tick, index) => {
      columnLables.push(<text
        key={index}
        style={textStyle}
        y={tick + 6}
        x={this.props.y - 6}
        fontFamily="serif">{this.props.labels[index]}</text>)
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