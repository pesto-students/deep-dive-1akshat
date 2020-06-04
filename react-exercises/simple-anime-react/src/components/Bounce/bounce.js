import React from 'react';
import './style.css';

const Bounce = (props) => {
  const delay = props.duration !== undefined ? Number(props.delay) : 1000;
  const duration = props.duration !== undefined ? Number(props.duration) : 3000;
  const cascade = props.cascade !== undefined ? props.cascade : false;
  let childAnimationDelay = 0;

  return (
    <>
      {cascade === false ?
        <div className="bounce" style={{
          animation: `bounce ${duration}ms Infinite`,
          animationDelay: `${delay}ms`
        }}>
          {props.children}
        </div>
        :
        <div>
          {
            props.children.map((child, key) => {
              // 2000 is hardcoded for now
              childAnimationDelay += 2000;
              return (
                <div className="bounce" key={key} style={{
                  animation: `bounce ${duration + childAnimationDelay}ms Infinite`,
                  animationDelay: `${delay}ms`
                }}>
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