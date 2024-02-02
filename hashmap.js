class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  #head = null;
  #tail = null;

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  append(key, value) {
    const node = new Node(key, value);
    if (!this.#head) {
      this.#head = node;
      this.#tail = this.#head;
      return;
    }

    this.#tail.next = node;
    this.#tail = node;
  }

  contains(key) {
    if (!this.#head) return false;

    let currentNode = this.#head;
    let isFound = false;

    while (!isFound && currentNode.next) {
      if (currentNode.key === key) isFound = true;
      currentNode = currentNode.next;
    }

    return isFound;
  }

  updateNode(key, value) {
    if (!this.#head) return;

    let currentNode = this.#head;
    while (currentNode.next) {
      if (currentNode.key === key) currentNode.value = value;
    }
  }
}

class HashMap {
  #buckets = [];

  // only for string keys
  #hash(key = "") {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  #LOAD_FACTOR = 0.75; //75%
  #maxCapacity = 16; // i.e given any number modulo by 16 we will get a number between 0 and 15

  get #capacity() {
    let capacity = 0;
    const buckets = this.#buckets;

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i] !== undefined) capacity++;
    }

    return capacity;
  }

  get #isOverLoaded() {
    return this.#capacity >= this.#maxCapacity * this.#LOAD_FACTOR;
  }

  set(key, value = null) {
    if (this.#isOverLoaded) {
      this.#maxCapacity = this.#maxCapacity * 2;
    }

    const buckets = this.#buckets;
    const bucketNum = this.#hash(key) % this.#maxCapacity;
    const doesBucketExist = buckets[bucketNum] !== undefined;

    if (!doesBucketExist) {
      buckets[bucketNum] = new LinkedList();
    }

    const currentBucket = buckets[bucketNum];

    if (currentBucket.contains(key)) {
      currentBucket.updateNode(key, value);
    } else {
      // if key already does not exist it is a different node
      currentBucket.append(key, value);
    }
  }
}

const hashMap = new HashMap();

let string = "hello";
for (let i = 0; i <= 128; i++) {
  hashMap.set(string + i, "bye" + i);
}

console.log(hashMap);
