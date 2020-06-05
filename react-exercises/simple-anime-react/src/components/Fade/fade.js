import React from 'react';
import './style.css';

const Fade = (props) => {
  //console.log('before: ', props.cascade);
  const delay = props.duration ? Number(props.delay) : 1000;
  const duration = props.duration ? Number(props.duration) : 3000;
  const method = props.method ? props.method : 'fadeIn';
  const cascade = props.cascade ? props.cascade : false;
  const damping = props.damping ? Number(props.damping) : 0;
  const userClass = props.className;
  const propStyle = props.style ? props.style : {};
  let childAnimationDelay = 0;
  let animationStyle = {
    animation: `${method} ease ${duration}ms Infinite`,
    animationDelay: `${(delay)}ms`
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
              childAnimationDelay += damping;
              animationStyle = {
                animation: `${method} ease ${duration}ms Infinite`,
                animationDelay: `${(delay * childAnimationDelay) + childAnimationDelay}ms`
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

export { Fade };
