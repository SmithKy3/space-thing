import { notDeepEqual } from 'assert';

export const colors = {
  retroRed: '#ff5c67',
  yellow: '#f9dc5c',
  retroGreen: '#93ffed',
  skyBlue: '#7bdff2',
  offWhite: '#ffffe8',
};

export const WELCOME_TEXT = `Hey, so welcome to my space... simulator? thing? Anyway, it's a small
page using HTML5 canvas to draw stars and their satellites, calculating positions each frame using JavaScript.
At the moment, it's in more of a demo state and the UI is limited, as I have more work to do.
Feel free to read about my inspiration and planned updates below or click the fancily animated button to take
a look for yourself.`;

export const INSPO_TEXT = `So, I started my first developer job in August of last year and,
without going into too much detail, the main project involves heavy use of HTML5 canvas and
a 3D coordinate system which relies on a lot of vector maths. One day I was working on a rotation
issue and, for some reason, this idea popped into my head; 'surely using this maths and some extra
physics bits and bobs, modelling orbits with gravity is quite doable' (spoiler alert, not as easy as I first thought).
And then COVID-19 happened and I found myself with a whole ton of free time. Sooooo, here we are. I haven't implemented gravity yet
as it turns out that mapping an object in 3D space which is rotating around some arbitrary axis required a bit more revision
than I anticipated. While I have an idea of how to get started on it, I want to have a think about how much/what UI I want to include
so that I can refactor if need be, before I get to work implementing that. Also, as with every developer, I have a few other endeavours
I want to sink some time into. But anyway, thanks for looking, feel free to view the source code `;

export const TODO_LIST = [
  `Fix drawing of static objects; All bodies have the ability to move but if they're not, they don't really need to be re-drawn every frame.
  Same with orbit paths. I'm thinking a second canvas layer but that introduces problems with the z-index. Hmmm....`,
  `Fix orbit path calculation: It works but I'm not happy with the algorithm for it, feel like I'm missing some knowhow here.
(engine/Orbit.ts/calculatePath() if you're interested or are experienced in calculating 3D ellipses)`,
  `Solidify UI options and add method for adding/removing new solar systems`,
  `Implement bounding box (or something else?) for each body on the screen so they can be selected`,
  `Implement gravity and decide on what to do if two bodies collide`,
];

// Special array methods I wish existed and decided to implement here
declare global {
  interface Array<T> {
    shuffle(): Array<T>;
    randomEntry(): T;
  }
}

export function getRandomNumber(
  min: number,
  max: number,
  returnRounded = false
): number {
  const randomNumber = Math.random() * (max - min) + min;
  return returnRounded ? Math.round(randomNumber) : randomNumber;
}

Array.prototype.shuffle = function () {
  // Shuffling method for all arrays using the Fisher-Yates algorithm
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(getRandomNumber(0, i));
    const x = this[i];
    this[i] = this[j];
    this[j] = x;
  }

  return this;
};
Array.prototype.randomEntry = function () {
  const i = Math.round(Math.random() * (this.length - 1));
  return [...this].shuffle()[i];
};
