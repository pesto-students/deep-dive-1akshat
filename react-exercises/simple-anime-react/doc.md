### React Animation Library
[![ForTheBadge built-by-developers](http://ForTheBadge.com/images/badges/built-by-developers.svg)](https://GitHub.com/1akshat/) [![ForTheBadge uses-js](http://ForTheBadge.com/images/badges/uses-js.svg)](http://ForTheBadge.com) [![ForTheBadge uses-css](http://ForTheBadge.com/images/badges/uses-css.svg)](http://ForTheBadge.com)

[![GitHub version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=gh&type=6&v=1.0.1&x2=0)](https://badge.fury.io/gh/conventional-changelog%2Fstandard-version) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) [![GitHub issues](https://img.shields.io/github/issues/Naereen/StrapDown.js.svg)](https://github.com/pesto-students/deep-dive-1akshat/issues/)

---

### Quick Start

import effects from the library to your React Component, for example the ```Bounce``` effect:

```import { Bounce } from './lib';```

Then simply wrap the components you want to animate:

```html
<Bounce>
  <p>I will bounce.</p>
  <p>I will bounce too.</p>
</Bounce>
```

### Supported Effects

The effects which are currently supported are ```Bounce```, ```Fade```, ```Pulse``` and ```Slide```.

You can pass the following properties to the animation components to customize the behavior:


| Property        | Description           | Values  | Default |
| -------------   |:-------------:        | -----:  | ------: | 
| delay    | Time to wait before the animation starts(in milliseconds). | ```number``` value | ```0```
| duration      | The animation duration (milliseconds).	      |  ```number``` value | ```1000```
| animationIterationCount | Number of times animation should be played.      |    ```number``` value | ```Infinity```  |
| style | Object to add inline styles to the wrapper element.      |    ```object``` value | ```{}```  |
| className | Class names to add to the wrapper element.	      |    ```string``` value | ```""```  |
| cascade | If set, each child of a reveal animation automatically get assigned a delay that takes into account their predecessor child -  useful for animating list items.	      |    ```true``` or ```false``` | ```false```  | 
| damping | Factor that affects the delay that each animated component in a cascade animation will be assigned.	      |    ```number``` value | ```0.5``` (meaning that the delay will be half of the animation duration)  | 


### Example

```html
<Bounce cascade={true} damping={2} duration={2000}>
  <p>I will bounce.</p>
  <p>I will bounce too.</p>
</Bounce>
```


