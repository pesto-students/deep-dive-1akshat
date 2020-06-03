# Instructions

Create a simple animation library that have the following things. Expose the API as React Components.

- Bounce
- FadeIn and Out with easing effects
- Slide up to limit and come back to original location
- Pulse

You can make your own API names. You can use either CSS to animate, or JavaScript such as `requestAnimationFrame`. Either is fine.

## Prior Art
- [React Animations](https://www.npmjs.com/package/react-animations)
- [Post](https://popmotion.io/pose/api/)
- [React Transition Groups](https://www.npmjs.com/package/react-transition-group)
- [React Awesome Reveal](https://www.npmjs.com/package/react-awesome-reveal)
- [Framer Motion](https://www.framer.com/motion/)

# Restrictions
- You can use any lib for easing effects. 
- No other library

# Props to support

* ```delay*```: Time to wait before the animation starts(in milliseconds).
* ```duration*```: The animation duration (milliseconds).	
* ```triggerOnce*```: Specifies if the animation should run only once or everytime an element enters/exits/re-enters the viewport.	
* ```style*```: Object to add inline styles to the wrapper element.
* ```cascade```: If set, each child of a reveal animation automatically get assigned a delay that takes into account their predecessor (child `i` enters the viewport after i  ```delay * damping``` milliseconds) – useful for animating list items.	