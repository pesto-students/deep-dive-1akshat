import React from 'react';
import './style.css';

const Pulse = (props) => {
  const delay = props.duration !== undefined ? Number(props.delay) : 1000;
  const duration = props.duration !== undefined ? Number(props.duration) : 3000;

  return (
    <>
      <div style={{
        animation: `pulse ${duration}ms infinite`,
        animationDelay: `${delay}ms`
      }}>
        {props.children}
      </div>
    </>
  )
}

export { Pulse };