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
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }

      currentNode = currentNode.next;
    }
  }
}

class HashMap {
  #buckets = [];
  #LOAD_FACTOR = 0.75; //75%
  #maxCapacity = 16; // i.e given any number modulo by 16 we will get a number between 0 and 15

  get #size() {
    let count = 0;

    for (const bucket of this.#buckets) {
      if (!bucket || !bucket.head) continue; // skip to next bucket

      let currentNode = bucket.head;
      while (currentNode) {
        count++;
        currentNode = currentNode.next;
      }
    }

    return count;
  }

  #hash(key) {
    // only for string keys
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  get #isOverLoaded() {
    return this.#size >= this.#maxCapacity * this.#LOAD_FACTOR;
  }

  #addOrUpdateBucket(buckets, key, value) {
    const index = this.#hash(key) % this.#maxCapacity;

    // if linkedList does not already exist in this index, create one
    if (!buckets[index]) {
      buckets[index] = new LinkedList();
    }

    const bucket = buckets[index];
    if (bucket.contains(key)) {
      bucket.update(key, value);
    } else {
      bucket.append(key, value);
    }
  }

  #reset() {
    const newBuckets = [];

    for (const bucket of this.#buckets) {
      if (!bucket || !bucket.head) continue; // skip to next bucket/index

      let currentNode = bucket.head;
      while (currentNode) {
        this.#addOrUpdateBucket(newBuckets, currentNode.key, currentNode.value);
        currentNode = currentNode.next;
      }
    }

    this.#buckets = newBuckets;
  }

  set(key, value = null) {
    if (this.#isOverLoaded) {
      this.#maxCapacity *= 2; // douvle the capacity
      this.#reset();
    }
    this.#addOrUpdateBucket(this.#buckets, key, value);
  }
}

const hashMap = new HashMap();

for (let i = 0; i <= 100; i++) {
  const key = "hello " + i;
  hashMap.set(key, "bye");
}

console.log(hashMap);
