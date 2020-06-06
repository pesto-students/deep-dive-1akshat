import React from 'react';
import './style.css';

const Slide = (props) => {
  const delay = props.duration ? Number(props.delay) : 1000;
  const duration = props.duration ? Number(props.duration) : 3000;
  const userClass = props.className;
  const method = props.method ? props.method : 'up';
  const propStyle = props.style ? props.style : {};

  return (
    <>
      <div className="transition">
        {props.children}
      </div>
    </>
  )
}

export { Slide };