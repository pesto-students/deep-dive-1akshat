import React from 'react';
import './style.css';

const Fade = (props) => {
    const delay = props.duration !== undefined ? Number(props.delay) : 1000;
    const duration = props.duration !== undefined ? Number(props.duration) : 3000;
    const method = props.method ? props.method : 'fadeIn';

    return (
        <>
            <div style={{
                animation: `${method} ease ${duration}ms`,
                animationDelay: `${delay}ms`
            }}>
                {props.children}
            </div>
        </>
    )
}

export { Fade };