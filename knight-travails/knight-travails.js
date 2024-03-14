const getBoard = function() {
  const board = [];

  for (let r = 0; r < 8; r++) {
    board[r] = [];

    for (let c = 0; c < 8; c++) {
      board[r].push({
        prevKnightStops: [],
      });
    }
  }

  return board;
};

class Knight {
  constructor(board) {
    this.board = board;
  }

  #moves = {
    // move name: [r, c]
    forwardRight: [-2, 1],
    rightForward: [-1, 2],
    rightBackward: [1, 2],
    backwardRight: [2, 1],
    backwardLeft: [2, -1],
    leftBackward: [1, -2],
    leftForward: [-1, -2],
    forwardLeft: [-2, -1],
  };

  #isMoveInbound(r, c) {
    if (r < 0 || r >= this.board.length) return false;
    if (c < 0 || c >= this.board[r].length) return false;

    return true;
  }

  #isSquareAlreadyVisited(visitedSet, r, c) {
    return visitedSet.has(String([r, c]));
  }

  #doMove(visitedSet, currentPos, newPos) {
    const [new_r, new_c] = newPos;
    if (!this.#isMoveInbound(new_r, new_c)) return [];
    if (this.#isSquareAlreadyVisited(visitedSet, new_r, new_c)) return [];

    visitedSet.add(String(newPos));

    const [current_r, current_c] = currentPos;
    const currentSquare = this.board[current_r][current_c];

    const newSquare = this.board[new_r][new_c];

    newSquare.prevKnightStops.push(
      ...currentSquare.prevKnightStops,
      currentPos,
    );

    return newPos;
  }

  doMoves(visitedSet, currentPos) {
    const [current_r, current_c] = currentPos;
    const allMoveValues = Object.values(this.#moves);
    const sucecssfulMoves = [];

    allMoveValues.forEach((value) => {
      const [move_r, move_c] = value;
      const new_r = current_r + move_r;
      const new_c = current_c + move_c;
      const newPos = [new_r, new_c];

      const move = this.#doMove(visitedSet, currentPos, newPos);
      if (move.length > 0) sucecssfulMoves.push(move);
    });

    return sucecssfulMoves;
  }
}

const knightMoves = function(start, destination) {
  const board = getBoard();
  const knight = new Knight(board);
  const [dest_r, dest_c] = destination;

  const visitedSquares = new Set(); // for faster lookup
  const queue = [start];

  while (queue.length > 0) {
    const currentPosition = queue.shift();
    const [current_r, current_c] = currentPosition;

    if (current_r === dest_r && current_c === dest_c) break;

    const successfulMovePos = knight.doMoves(visitedSquares, currentPosition);
    queue.push(...successfulMovePos);
  }

  const destinationSquare = board[dest_r][dest_c];
  console.log([...destinationSquare.prevKnightStops, destination]);
};

knightMoves([0, 0], [7, 7]);
