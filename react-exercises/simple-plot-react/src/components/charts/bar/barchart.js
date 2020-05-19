import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    const data = this.props.data;
    this.drawChart(data);
  }

  drawChart(data) {
    const canvasHeight = this.props.height;
    const canvasWidth = this.props.width;
    const scale = this.props.scale;
    const svgCanvas = d3.select(this.refs.canvas)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid black")
    svgCanvas.selectAll("rect")
      .data(data).enter()
      .append("rect")
      .attr("width", this.props.individualBarWidth)
      .attr("height", (datapoint) => datapoint * scale)
      .attr("fill", this.props.fillColor)
      .attr("x", (datapoint, iteration) => iteration * 45)
      .attr("y", (datapoint) => canvasHeight - datapoint * scale)
    svgCanvas.selectAll("text")
      .data(data).enter()
      .append("text")
      .attr("x", (datapoint, i) => i * 45 + 10)
      .attr("y", (datapoint, i) => canvasHeight - datapoint * scale - 10)
      .text(datapoint => datapoint)
  }

  render() {
    return (
      <div ref="canvas"></div>
    )
  }
}

export default BarChart;