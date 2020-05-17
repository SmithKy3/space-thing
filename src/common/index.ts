export const BIO =
  'Hey, yo, this is an unfinished space simulator using overly complicated vector maths to make small circles do big big circles around big circles.';

export const colors = {
  retroRed: '#ff5c67',
  yellow: '#f9dc5c',
  retroGreen: '#93ffed',
  skyBlue: '#7bdff2',
  offWhite: '#ffffe8',
};

// Special array methods I wish existed and decided to implement here
declare global {
  interface Array<T> {
    shuffle(): Array<T>;
    randomEntry(): T;
  }
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

export function getRandomNumber(
  min: number,
  max: number,
  returnRounded = false
): number {
  const randomNumber = Math.random() * (max - min) + min;
  return returnRounded ? Math.round(randomNumber) : randomNumber;
}
