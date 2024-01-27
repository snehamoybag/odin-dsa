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
      this.tail.next = node;
      this.tail = node;
    }

    this.#incrementSize();
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
console.log(linkedList.head);
console.log(linkedList.tail);
console.log(linkedList.size);
