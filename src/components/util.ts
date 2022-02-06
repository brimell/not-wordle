import dictionary from "../Wordlist/dictionary.json";

export const dictionarySet: Set<string> = new Set(dictionary);

function mulberry32(a: number) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFunc() {
  return Number(sessionStorage.getItem("seed")) || false;
}

export const seed = seedFunc();

if (localStorage.getItem("todays_last_played") === new Date().toISOString().replace(/-/g, "").slice(0, 8)) {
  var todaysDisabled = true;
}
const makeRandom = () => (seed ? (todaysDisabled ? () => Math.random() : mulberry32(seed)) : () => Math.random());
let random = makeRandom();

export function resetRng(): void {
  random = makeRandom();
}

export function pick<T>(array: Array<T>): T {
  return array[Math.floor(array.length * random())];
}
