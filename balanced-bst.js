// Balanced Binary Search Tree
class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  get #leftHeight() {
    return this.left ? this.left.height + 1 : 0; // including the left node
  }

  get #rightHeight() {
    return this.right ? this.right.height + 1 : 0; // including the right node
  }

  get height() {
    return Math.max(this.#leftHeight, this.#rightHeight);
  }

  get balanceFactor() {
    return this.#rightHeight - this.#leftHeight;
  }
}

class Tree {
  #removeDuplicates(array) {
    const set = new Set(array); // no duplicates are stored
    const noDuplicatesArr = [...set];
    return noDuplicatesArr;
  }

  #merge(leftArr, rightArr) {
    // [1, 3, 5, 7, 8, 10 ] + [0, 2, 4, 6, 9]
    const mergedArr = [];
    let mergedIndex = 0;

    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] <= rightArr[rightIndex]) {
        mergedArr[mergedIndex] = leftArr[leftIndex];
        leftIndex++;
      } else {
        mergedArr[mergedIndex] = rightArr[rightIndex];
        rightIndex++;
      }

      mergedIndex++;
    }

    // add  remaining  (if any) items from to leftArr
    while (leftIndex < leftArr.length) {
      mergedArr[mergedIndex] = leftArr[leftIndex];
      leftIndex++;
      mergedIndex++;
    }

    // add remaining (if any) items from to leftArr
    while (rightIndex < rightArr.length) {
      mergedArr[mergedIndex] = rightArr[rightIndex];
      rightIndex++;
      mergedIndex++;
    }

    return mergedArr;
  }

  #mergeSort(array) {
    if (array.length <= 1) return array; // can not be sorted further

    // split arr in half, and sort 2 halves recursively
    const midIndex = Math.floor(array.length / 2);

    const leftArr = this.#mergeSort(array.slice(0, midIndex));
    const rightArr = this.#mergeSort(array.slice(midIndex, array.length));

    // merge the two sorted arrays into a single sorted array
    const mergedArray = this.#merge(leftArr, rightArr);
    return mergedArray;
  }

  #filterAndSort(array) {
    const noDuplicates = this.#removeDuplicates(array);
    const sorted = this.#mergeSort(noDuplicates);
    return sorted;
  }

  #buildTree(array) {
    // [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
    const midIndex = Math.floor(array.length / 2);

    const rootItem = array[midIndex];
    const rootNode = rootItem !== undefined ? new Node(rootItem) : null;

    // if array has just 1 item, that item has to be the root node,
    // since there is nothing on its left and right side.
    if (array.length > 1) {
      const leftArr = array.slice(0, midIndex);
      const rightArr = array.slice(midIndex + 1, array.length);

      rootNode.left = this.#buildTree(leftArr);
      rootNode.right = this.#buildTree(rightArr);
    }

    return rootNode;
  }

  constructor(array) {
    this.root = this.#buildTree(this.#filterAndSort(array));
  }

  #doRightRotation(node) {
    node.right = new Node(node.data); // right has to be null since the tree is imbalanced
    node.data = node.left.data;
    node.left.data = node.left.left.data;
    node.left.left = null;
  }

  #doLeftRotation(node) {
    node.left = new Node(node.data); // left has to be null since the tree is imbalanced
    node.data = node.right.data;
    node.right.data = node.right.right.data;
    node.right.right = null;
  }

  #doLeftRightRotation(node) {
    node.right = new Node(node.data);
    node.data = node.left.right.data;
    node.left.right = null;
  }

  #doRightLeftRotation(node) {
    node.left = new Node(node.data);
    node.data = node.right.left.data;
    node.right.left = null;
  }

  #isImbalanced(node) {
    const balanceFactor = node.balanceFactor;
    const isImbalanced = balanceFactor < -1 || balanceFactor > 1;
    return isImbalanced;
  }

  #rebalance(node) {
    const rootBF = node.balanceFactor;
    const leftBF = node.left ? node.left.balanceFactor : 0;
    const rightBF = node.right ? node.right.balanceFactor : 0;

    // if -2, left side is imbalanced. else if 2, right side is imbalanced

    if (rootBF === -2 && leftBF === -1) {
      this.#doRightRotation(node);
      return;
    }

    if (rootBF === 2 && rightBF === 1) {
      this.#doLeftRotation(node);
      return;
    }

    if (rootBF === -2 && leftBF === 1) {
      this.#doLeftRightRotation(node);
      return;
    }

    if (rootBF === 2 && rightBF === -1) {
      this.#doRightLeftRotation(node);
      return;
    }
  }

  insert(item) {
    const newNode = new Node(item);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    // recursive helper function
    const inserter = (node) => {
      if (item === node.data) return; // dont keep duplicates

      if (item < node.data) {
        if (node.left) inserter(node.left);
        else node.left = newNode;
      }

      if (item > node.data) {
        if (node.right) inserter(node.right);
        else node.right = newNode;
      }

      // check and handle imbalance (if any) after insertion
      if (this.#isImbalanced(node)) this.#rebalance(node);
      return;
    };

    // calling the inserter
    inserter(this.root);
  }

  levelOrder(cb = null) {
    if (!this.root) return;
    const levelOrderData = [];

    const discoverdNodes = [];
    discoverdNodes.push(this.root);

    while (discoverdNodes.length > 0) {
      const firstItem = discoverdNodes[0];
      levelOrderData.push(firstItem.data);
      if (cb) cb(firstItem);

      if (firstItem.left) discoverdNodes.push(firstItem.left);
      if (firstItem.right) discoverdNodes.push(firstItem.right);

      discoverdNodes.shift();
    }

    if (!cb) return levelOrderData;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 777]);
tree.insert(779);
tree.insert(778);
tree.insert(24);
tree.insert(6000);
tree.insert(6005);
tree.prettyPrint();
console.log(tree.levelOrder());
