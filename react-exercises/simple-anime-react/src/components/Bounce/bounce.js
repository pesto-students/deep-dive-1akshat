import React from 'react';
import './style.css';

const Bounce = (props) => {
  return (
    <>
      <div class="bounce">
        {props.children}
      </div>
    </>
  )
}

export default Bounce;