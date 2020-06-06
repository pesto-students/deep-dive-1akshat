import React from 'react';
import './style.css';

const Bounce = (props) => {
  const delay = props.duration ? Number(props.delay) : 1000;
  const duration = props.duration ? Number(props.duration) : 3000;
  const cascade = props.cascade ? props.cascade : false;
  const damping = props.damping ? Number(props.damping) : 0.5;
  const animationIterationCount = props.animationIterationCount ? props.animationIterationCount : '1';
  const customStyle = props.style ? props.style : {};
  const noCascadeStyle = {
    animation: `bounce ${duration}ms`,
    animationDelay: `${delay}ms`,
    animationIterationCount: `${animationIterationCount}`,
    animationTimingFunction: 'ease'
  }
  const children = Array.isArray(props.children) ? props.children : React.Children.toArray(props.children);

  return (
    <>
      {!cascade ?
        <div style={{ ...customStyle, ...noCascadeStyle }}>
          {props.children}
        </div>
        :
        <div>
          {
            children.map((child, key) => {
              const cascadeStyle = {
                animation: `bounce ${duration}ms`,
                animationDelay: `${(key * damping * duration)}ms`,
                animationIterationCount: `${animationIterationCount}`,
              }
              return (
                <div className="bounce" key={key} style={{ ...customStyle, ...cascadeStyle }}>
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

export { Bounce };