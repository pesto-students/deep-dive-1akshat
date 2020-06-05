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

# Supported Props

* ```delay```: Time to wait before the animation starts(in milliseconds).
* ```duration```: The animation duration (milliseconds).	
* ```animationIterationCount```: Specifies number of times animation should be played.	
* ```style```: Object to add inline styles to the wrapper element.
* ```className```: Class names to add to the wrapper element.
* ```cascade```: If set, each child of a reveal animation automatically get assigned a delay that takes into account their predecessor (child `i` enters the viewport after i  ```delay * damping``` milliseconds) – useful for animating list items.
* ```damping```: Factor that affects the delay that each animated component in a cascade animation will be assigned. If ```damping = 1``` then the delay will be equal to the animation duration; if ```damping < 1``` then the delay will be lower than the animation duration; if ```damping > 1``` then the delay will be greater than the animation duration.	