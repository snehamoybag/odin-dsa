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

  #generateIndiciesHashMap() {
    const map = {};
    let count = 0;
    let currentNode = this.head;

    while (currentNode.next) {
      map[count] = currentNode;

      currentNode = currentNode.next;
      count++;
    }

    return map;
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

  at(index) {
    if (
      isNaN(index) ||
      !Number.isSafeInteger(index) ||
      index < 0 ||
      index >= this.size
    ) {
      return null;
    }

    const indiciesHashMap = this.#generateIndiciesHashMap();
    return indiciesHashMap[index];
  }
}

const linkedList = new LinkedList();
linkedList.append("hello");
linkedList.append("hello2");
linkedList.append("hello3");
linkedList.prepend("hi");
linkedList.append("hello4");
linkedList.prepend("hello3");

console.log(linkedList);
console.log(linkedList.at(-1));
