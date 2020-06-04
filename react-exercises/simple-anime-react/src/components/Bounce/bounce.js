import React from 'react';
import './style.css';

const Bounce = (props) => {
  const delay = props.duration !== undefined ? props.delay : 1000;
  const duration = props.duration !== undefined ? props.duration : 3000;

  return (
    <>
      <div className="bounce" style={{
        animation: `bounce ${duration}ms`,
        animationDelay: `${delay}ms`
      }}>
        {props.children}
      </div>
    </>
  )
}

export { Bounce };