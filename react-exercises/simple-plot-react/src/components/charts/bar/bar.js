import React from 'react';

class Bar extends React.Component {

  render() {
    return (
      <g>
        <rect class="bar"
          style={this.props.style}
          x={this.props.x}
          y={this.props.y + 5}
          width={this.props.width}
          height={this.props.height} />
      </g>
    )
  }

}

export default Bar;