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

  #doLeftRotation(node) {
    node.left = new Node(node.data); // left has to be null since the tree is imbalanced
    node.data = node.right.data;
    node.right.data = node.right.right.data;
    node.right.right = null;
  }

  #doRightRotation(node) {
    node.right = new Node(node.data); // right has to be null since the tree is imbalanced
    node.data = node.left.data;
    node.left.data = node.left.left.data;
    node.left.left = null;
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

  get isBalanced() {
    if (!this.root) return true; // empty tree is balanced
    const imBalanceNodes = [];

    // recursive function to help us trevers tree
    const detective = (node) => {
      if (node.left) detective(node.left);
      if (node.right) detective(node.right);

      const balFactor = node.balanceFactor;
      const isBalanced = balFactor === -1 || balFactor === 0 || balFactor === 1;

      if (!isBalanced) imBalanceNodes.push(node);
    };

    // calling the detective to check all nodes and find imbalanced nodes
    detective(this.root);

    // return the results
    const isTreeBalanced = imBalanceNodes.length === 0;
    return isTreeBalanced;
  }

  rebalance() {
    if (!this.root) return;

    // helper function to help tackle imbalance
    const fixImbalance = (node) => {
      const rootBF = node.balanceFactor;

      // if -2, right subtree is empty. else if 2, left side is empty
      if (rootBF === -2) {
        if (node.left.left) this.#doRightRotation(node);
        else if (node.left.right) this.#doLeftRightRotation(node);
        return;
      }

      if (rootBF === 2) {
        if (node.right.right) this.#doLeftRotation(node);
        else if (node.right.left) this.#doRightLeftRotation(node);
        return;
      }
    };

    // reuursive helper function to help us trevers and fix imbalances
    const inspector = (node) => {
      if (node.left) inspector(node.left);
      if (node.right) inspector(node.right);
      fixImbalance(node);
    };

    // calling the inspector to fix balance
    inspector(this.root);
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    // recursive helper function
    const inserter = (node) => {
      if (value === node.data) return; // dont keep duplicates

      if (value < node.data) {
        if (node.left) inserter(node.left);
        else node.left = newNode;
      }

      if (value > node.data) {
        if (node.right) inserter(node.right);
        else node.right = newNode;
      }
    };

    // calling the inserter
    inserter(this.root);

    // check and handle imbalance (if any) after insertion
    if (!this.isBalanced) this.rebalance();
  }

  #inOrderSuccessor(node) {
    let inOrderSuccessorNode = node.right;
    let inOrderSuccesorParent = node;

    while (inOrderSuccessorNode.left) {
      inOrderSuccesorParent = inOrderSuccessorNode;
      inOrderSuccessorNode = inOrderSuccessorNode.left;
    }

    return {
      node: inOrderSuccessorNode,
      parent: inOrderSuccesorParent,
    };
  }

  #deleteTheNodeWithSingleChild(node, parentNode) {
    const isDeleteNodeInLeft = parentNode.left.data === node.data;

    if (isDeleteNodeInLeft) {
      parentNode.left = node.left || node.right;
    } else {
      parentNode.right = node.left || node.right;
    }
  }

  #deleteTheNodeWithNoChild(node, parentNode) {
    const isDeleteNodeInLeft = parentNode.left.data === node.data;

    if (isDeleteNodeInLeft) parentNode.left = null;
    else parentNode.right = null;
  }

  delete(value) {
    if (!this.root) return;

    // find the node and its parent
    let currentNode = this.root;
    let parentNode = null;
    let deleteNode = null;

    while (currentNode) {
      if (currentNode.data === value) {
        deleteNode = currentNode;
        break;
      }

      if (value < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      }

      if (value > currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
    }

    if (!deleteNode) return; // node not found

    // when node has both child, switch with its in-order successor aka the next biggest node
    if (deleteNode.left && deleteNode.right) {
      const inOrderSuccessor = this.#inOrderSuccessor(deleteNode);
      const inOrderSuccessorNode = inOrderSuccessor.node;
      const inOrderSuccessorParent = inOrderSuccessor.parent;

      // switch data
      const deleteData = deleteNode.data;
      deleteNode.data = inOrderSuccessorNode.data;
      inOrderSuccessorNode.data = deleteData;

      // switch variables
      deleteNode = inOrderSuccessorNode;
      parentNode = inOrderSuccessorParent;
    }

    // when node has single child
    if (deleteNode.left || deleteNode.right) {
      this.#deleteTheNodeWithSingleChild(deleteNode, parentNode);
    } else {
      this.#deleteTheNodeWithNoChild(deleteNode, parentNode);
    }

    // find imbalance and then do rebalance
    if (this.isBalanced) this.rebalance();
  }

  find(value, node = this.root) {
    if (!node) throw new Error(`${value} is not found!`);

    if (node.data === value) return node;
    if (value < node.data) return this.find(value, node.left);
    if (value > node.data) return this.find(value, node.right);
  }

  height(node) {
    const theNode = this.find(node.data);
    return theNode.height;
  }

  depth(node) {
    if (!this.root || !node) {
      throw new Error("node is invalid or the tree is empty");
    }

    const value = node.data;
    let depth = 0;
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.data) break;
      if (value < currentNode.data) currentNode = currentNode.left;
      if (value > currentNode.data) currentNode = currentNode.right;

      depth += 1;
    }

    // if current node is null, node is not found
    if (!currentNode) throw new Error("node not found!");
    return depth;
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

  preOrder(cb = null) {
    if (!this.root) return;

    const preOrderData = [];

    // recursive function to help treverse the tree
    const treverser = (node) => {
      preOrderData.push(node.data);
      if (cb) cb(node);

      if (node.left) treverser(node.left);
      if (node.right) treverser(node.right);
      return;
    };

    // calling the treverser func
    treverser(this.root);

    if (!cb) return preOrderData;
  }

  inOrder(cb = null) {
    if (!this.root) return;

    const inOrderData = [];

    const treverser = (node) => {
      if (node.left) treverser(node.left);

      inOrderData.push(node.data);
      if (cb) cb(node);

      if (node.right) treverser(node.right);
      return;
    };

    treverser(this.root);

    if (!cb) return inOrderData;
  }

  postOrder(cb = null) {
    if (!this.root) return;

    const postOrderData = [];

    const treverser = (node) => {
      if (node.left) treverser(node.left);
      if (node.right) treverser(node.right);

      if (cb) cb(node);
      postOrderData.push(node.data);
      return;
    };

    treverser(this.root);

    if (!cb) return postOrderData;
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
tree.insert(780);
tree.insert(6);
tree.insert(25);
tree.prettyPrint();
