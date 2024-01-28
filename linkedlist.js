class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  #incrementSize() {
    if (this.size === undefined) this.size = 0;
    this.size += 1;
  }

  #decrementSize() {
    if (this.size === undefined) this.size = 0;
    this.size -= 1;
  }

  prepend(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.#incrementSize();
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node; // append node
      this.tail = node; // update tail to be the latest last node
    }

    this.#incrementSize();
  }

  pop() {
    /* BUG! */
    /* method broken */
    if (!this.head) return;

    this.tail = null;
    this.#decrementSize();

    // find and set new tail
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    this.tail = currentNode;
  }

  shift() {
    if (!this.head) return;

    if (!this.head.next) {
      this.head = null;
    } else {
      this.head = this.head.next;
    }

    this.#decrementSize();
  }

  at(index) {
    if (
      isNaN(index) ||
      !Number.isSafeInteger(index) ||
      index < 0 ||
      index >= this.size
    ) {
      return null;
    }

    let node = this.head;
    if (index === 0) return node;

    let currentIndex = 1;
    while (currentIndex <= index) {
      node = node.next;
      currentIndex += 1;
    }

    return node;
  }

  find(value) {
    if (!this.head) return null;

    let foundIndex = null;
    let currentIndex = 0;
    let currentNode = this.head;

    while (foundIndex === null && currentNode.next) {
      if (currentNode.value === value) foundIndex = currentIndex;
      currentNode = currentNode.next;
      currentIndex++;
    }

    return foundIndex;
  }

  contains(value) {
    if (!this.head) return false;
    if (this.head.value === value || this.tail.value === value) return true;

    let currentNode = this.head;
    let isFound = false;

    while (!isFound && currentNode.next) {
      isFound = currentNode.value === value;
      currentNode = currentNode.next;
    }

    return isFound;
  }
}

const linkedList = new LinkedList();
linkedList.append("hello");
linkedList.append("hello2");
linkedList.append("hello3");
linkedList.prepend("hi");
linkedList.append("hello4");
linkedList.prepend("hello5");

console.log(linkedList);
console.log(linkedList.tail);
linkedList.pop();
console.log(linkedList.tail);
