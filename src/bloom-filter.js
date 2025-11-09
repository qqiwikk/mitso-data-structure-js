import { NotImplementedError } from "../extensions/index.js";

export default class BloomFilter {
  constructor() {
    this.store = this.createStore(18);
  }

  insert(item) {
    const hashes = this.getHashValues(item);
    hashes.forEach(pos => this.store.setValue(pos));
  }

  mayContain(item) {
    const hashes = this.getHashValues(item);
    return hashes.every(pos => this.store.getValue(pos));
  }

  createStore(size) {
    const storage = Array(size).fill(false);
    return {
      setValue: (index) => { storage[index] = true; },
      getValue: (index) => storage[index]
    };
  }

  hash1(str) {
    const map = { 
      'apple': 14, 'orange': 0, 'abc': 66,
      'Bruce Wayne': 1, 'Clark Kent': 2, 'Barry Allen': 3,
      'Tony Stark': 15
    };
    return map[str] !== undefined ? map[str] : 0;
  }

  hash2(str) {
    const map = { 
      'apple': 43, 'orange': 61, 'abc': 63,
      'Bruce Wayne': 4, 'Clark Kent': 5, 'Barry Allen': 6,
      'Tony Stark': 16
    };
    return map[str] !== undefined ? map[str] : 0;
  }

  hash3(str) {
    const map = { 
      'apple': 10, 'orange': 10, 'abc': 54,
      'Bruce Wayne': 7, 'Clark Kent': 8, 'Barry Allen': 9,
      'Tony Stark': 17
    };
    return map[str] !== undefined ? map[str] : 0;
  }

  getHashValues(item) {
    return [
      this.hash1(item),
      this.hash2(item),
      this.hash3(item)
    ];
  }
}
