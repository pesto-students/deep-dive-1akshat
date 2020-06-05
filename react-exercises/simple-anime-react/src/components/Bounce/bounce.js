import React from 'react';
import './style.css';

const Bounce = (props) => {
  const delay = props.duration ? Number(props.delay) : 1000;
  const duration = props.duration ? Number(props.duration) : 3000;
  const cascade = props.cascade ? props.cascade : false;
  const damping = props.damping ? Number(props.damping) : 0;
  const customStyle = props.style ? props.style : {};

  if (!cascade && damping === 1) {
    throw new Error('Damping needs cascade property to be true.')
  }

  let childAnimationDelay = 0;

  const noCascadeStyle = {
    animation: `bounce ${duration}ms Infinite`,
    animationDelay: `${delay}ms`
  }

  return (
    <>
      {!cascade ?
        <div style={{ ...customStyle, ...noCascadeStyle }}>
          {props.children}
        </div>
        :
        <div>
          {
            props.children.map((child, key) => {
              childAnimationDelay += damping;
              const cascadeStyle = {
                animation: `bounce ${duration}ms Infinite`,
                animationDelay: `${(delay * childAnimationDelay) + childAnimationDelay
                  }ms`
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