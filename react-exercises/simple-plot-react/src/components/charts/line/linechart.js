import React, { Component } from 'react';
import * as d3 from 'd3';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidUpdate() {
    const data = this.props.data.map(el => el.value);
    const labels = this.props.data.map(el => el.label);
    this.drawLineChart(data, labels);
  }

  drawLineChart(data, labels) {
    const canvasHeight = this.props.height;
    const canvasWidth = this.props.width;
    const scale = this.props.scale;
    const svgCanvas = d3.select(this.refs.canvasline)
  }

  render() {
    return (
      <>
        <h1>LINE CHART</h1>
        <div className="canvasline"></div>
      </>
    )
  }

}

export default LineChart;