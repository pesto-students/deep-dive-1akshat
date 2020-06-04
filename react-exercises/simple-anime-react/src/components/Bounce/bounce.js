import React from 'react';
import './style.css';

const stringToBoolean = (string) => {
  return string === 'true';
}

const Bounce = (props) => {
  const delay = props.duration !== undefined ? Number(props.delay) : 1000;
  const duration = props.duration !== undefined ? Number(props.duration) : 3000;
  const cascade = props.cascade !== undefined ? stringToBoolean(props.cascade) : false;
  const damping = props.damping !== undefined ? Number(props.damping) : 1;

  if (cascade === false && damping === 1) {
    throw new Error('Damping needs cascade property to be true.')
  }

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
              childAnimationDelay += damping * 1;
              return (
                <div className="bounce" key={key} style={{
                  animation: `bounce ${duration}ms Infinite`,
                  animationDelay: `${(delay * childAnimationDelay) + childAnimationDelay
                    }ms`
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