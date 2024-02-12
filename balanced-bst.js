// Balanced Binary Search Tree
class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
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

  #fileterAndSort(array) {
    const filteredArray = this.#removeDuplicates(array);
    const sortedArray = this.#mergeSort(filteredArray);
    return sortedArray;
  }

  constructor(array) {
    this.array = this.#fileterAndSort(array);
  }

  get root() {
    return this.buildTree(this.array);
  }

  buildTree(array) {
    // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const midIndex = Math.floor(array.length / 2);

    const root = array[midIndex];
    const rootNode = new Node(root);

    // if array has just 1 item, that item has to be the root node,
    // since there is nothing on its left and right side.
    if (array.length > 1) {
      const leftArr = array.slice(0, midIndex);
      const rightArr = array.slice(midIndex + 1, array.length);

      rootNode.left = this.buildTree(leftArr);
      rootNode.right = this.buildTree(rightArr);
    }

    return rootNode;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const BS_Tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(BS_Tree.root);
