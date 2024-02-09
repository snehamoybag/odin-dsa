// Balanced Binary Search Tree
class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
  }

  #removeDuplicates(array) {
    const set = new Set(array); // no duplicates are stored
    const noDuplicatesArr = [...set];
    return noDuplicatesArr;
  }

  #mergeNums(leftArr, rightArr) {
    // merges two sorted array of numbers
    // [1, 2, 7, 9] + [3, 4, 5, 6]
    let leftIndex = 0;
    let rightIndex = 0;

    const mergedArr = [];
    let mergedIndex = 0;

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

    // append left over items from a remaining array
    const isEverythingSortedFromLeftArr = leftIndex === leftArr.length;
    const isEverythingSortedFromRighttArr = rightIndex === rightArr.length;

    if (isEverythingSortedFromLeftArr) {
      mergedArr.push(...rightArr);
    } else if (isEverythingSortedFromRighttArr) {
      mergedArr.push(...leftArr);
    }

    return mergedArr;
  }

  #mergeSort(array) {
    if (array.length === 1) return array; // if it has only 1 item, it is sorted

    const startIndex = 0;
    const endIndex = array.length - 1;
    const middleIndex = Math.floor(startIndex + endIndex / 2);

    // keep dividing into halves and sort them recursively
    const leftArr = this.#mergeSort(array.slice(startIndex, middleIndex)); // excluding middle index
    const rightArr = this.#mergeSort(array.slice(middleIndex, array.length));

    const mergedArr = this.#mergeNums(leftArr, rightArr);
    return mergedArr;
  }

  buildTree(array) {
    const fileteredArray = this.#removeDuplicates(array);
    const sortedArray = this.#mergeSort(fileteredArray);
  }

  root = this.buildTree(this.array);
}
