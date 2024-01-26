class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  #getTail() {
    let currentNode = this.head;
    if (!currentNode) return currentNode;

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    const tail = currentNode;
    return tail;
  }

  #getNode(value) {
    return new Node(value);
  }

  append(value) {
    if (!this.head) {
      this.head = this.#getNode(value);
      return;
    }

    const tail = this.#getTail();
    tail.next = this.#getNode(value);
  }

  prepend(value) {
    const node = this.#getNode(value);
    node.next = this.head;
    this.head = node;
  }
}

const linkedList = new LinkedList();
linkedList.append("hello");
linkedList.append("hello2");
linkedList.append("hello3");
linkedList.append("hello4");

console.log(linkedList);
