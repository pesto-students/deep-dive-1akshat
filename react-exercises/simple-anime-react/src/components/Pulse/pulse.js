import React from 'react';
import './style.css';

const Pulse = (props) => {
  const delay = props.duration ? Number(props.delay) : 1000;
  const duration = props.duration ? Number(props.duration) : 3000;
  const userClass = props.className;
  const propStyle = props.style ? props.style : {};
    const animationStyle = {
        animation: `pulse ${duration}ms Infinite`,
        animationDelay: `${delay}ms`
    }

  return (
    <>
      <div style={{ ...propStyle, ...animationStyle }} className={`${userClass}`}>
        {props.children}
      </div>
    </>
  )
}

export { Pulse };