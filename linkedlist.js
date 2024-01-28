class Node {
  constructor(data, next = null) {
    this.data = data;
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
    if (!this.head) return;

    let prevNode = null;
    let currentNode = this.head;

    // keep treversing at the end of list
    // at the end of the loop currentNode wil be the last/tail node
    while (currentNode.next) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    prevNode.next = null;
    this.tail = prevNode;
    this.#decrementSize();
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
}

const linkedList = new LinkedList();
linkedList.append("hello");
linkedList.append("hello2");
linkedList.append("hello3");
linkedList.prepend("hi");
linkedList.append("hello4");
linkedList.prepend("hello3");

linkedList.shift();
console.log(linkedList);
