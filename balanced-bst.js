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

  #filterAndSort(array) {
    const noDuplicates = this.#removeDuplicates(array);
    const sorted = this.#mergeSort(noDuplicates);
    return sorted;
  }

  constructor(array) {
    this.filteredAndSortedInitialInput = this.#filterAndSort(array);
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

  #root = null;
  get root() {
    if (this.#root === null) {
      this.#root = this.#buildTree(this.filteredAndSortedInitialInput);
    }

    return this.#root;
  }

  insert(item) {
    const newNode = new Node(item);

    if (this.root === null) {
      this.root = newNode; // this.root returns this.#root ;)
      return;
    }

    let currentNode = this.root;
    while (true) {
      if (item === currentNode.data) return; // don't keep duplicates

      if (item < currentNode.data && currentNode.left === null) {
        currentNode.left = newNode;
        return;
      } else if (item < currentNode.data && currentNode.left !== null) {
        currentNode = currentNode.left;
      }

      if (item > currentNode.data && currentNode.right === null) {
        currentNode.right = newNode;
        return;
      } else if (item > currentNode.data && currentNode.right !== null) {
        currentNode = currentNode.right;
      }
    }
  }

  prettyPrint(node, prefix = "", isLeft = true) {
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

const balancedBST = new Tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 777,
]);
console.log(balancedBST.root);

balancedBST.prettyPrint(balancedBST.root);
