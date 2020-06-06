import React from 'react';
import './style.css';

const Pulse = (props) => {
  const delay = props.duration ? Number(props.delay) : 1000;
  const duration = props.duration ? Number(props.duration) : 3000;
  const cascade = props.cascade ? props.cascade : false;
  const damping = props.damping ? Number(props.damping) : 0;
  const animationIterationCount = props.animationIterationCount ? props.animationIterationCount : '1';
  const userClass = props.className;
  const propStyle = props.style ? props.style : {};
  let animationStyle = {
    animation: `pulse ${duration}ms Infinite`,
    animationDelay: `${delay}ms`
  }
  const children = Array.isArray(props.children) ? props.children : React.Children.toArray(props.children);

  return (
    <>
      {!cascade ?
        <div style={{ ...propStyle, ...animationStyle }} className={`${userClass}`}>
          {props.children}
        </div>
        :
        <div>
          {
            children.map((child, key) => {
              animationStyle = {
                animation: `pulse ${duration}ms Infinite`,
                animationDelay: `${key * duration * damping}ms`,
                animationIterationCount: `${animationIterationCount}`
              }
              return (
                <div key={key} style={{ ...propStyle, ...animationStyle }} className={`${userClass}`}>
                  {child}
                </div>
              )
            })
          }
        </div>
      }



    </>
  )
}

export { Pulse };