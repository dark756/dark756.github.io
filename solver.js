onmessage = function (e) {
  const puzzle = e.data.puzzle;

  // Check if puzzle is solvable
  function isSolvable(puzzle) {
    let invCount = 0;
    for (let i = 0; i < 15; i++) {
      for (let j = i + 1; j < 16; j++) {
        if (puzzle[i] && puzzle[j] && puzzle[i] > puzzle[j]) invCount++;
      }
    }
    const rowFromBottom = 3 - Math.floor(puzzle.indexOf(0) / 4);
    return (invCount + rowFromBottom) % 2 === 0;
  }

  if (!isSolvable(puzzle)) {
    postMessage({ solution: null, rejectedMoves: [] }); // Puzzle not solvable
    return;
  }

  // The solving function (Branch and Bound) here
  function branchAndBound(start) {
    const MAX_DEPTH = 50; // limit search depth

    class PriorityQueue {
      constructor() {
        this.data = [];
      }
      enqueue(item, priority) {
        this.data.push({ item, priority });
        this.data.sort((a, b) => a.priority - b.priority);
      }
      dequeue() {
        return this.data.shift().item;
      }
      isEmpty() {
        return this.data.length === 0;
      }
    }

    const visited = new Set();
    const queue = new PriorityQueue();
    queue.enqueue([start, [], 0], manhattanDistance(start));
    const rejectedMoves = []; // Store rejected moves for display

    const dirs = [
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    while (!queue.isEmpty()) {
      const [curr, path, cost] = queue.dequeue();
      const key = curr.join(",");
      if (visited.has(key)) continue;
      visited.add(key);

      if (isGoal(curr)) return { solution: [...path, curr], rejectedMoves };

      if (cost >= MAX_DEPTH) continue; // depth limit added

      const zeroIdx = curr.indexOf(0);
      const r = Math.floor(zeroIdx / 4);
      const c = zeroIdx % 4;

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < 4 && nc >= 0 && nc < 4) {
          const ni = nr * 4 + nc;
          const newState = curr.slice();
          [newState[zeroIdx], newState[ni]] = [newState[ni], newState[zeroIdx]];
          const newCost = cost + 1;
          const priority = newCost + manhattanDistance(newState);
          
          if (visited.has(newState.join(","))) {
            rejectedMoves.push({ state: newState, reason: "Already visited" });
            continue;
          }

          if (priority >= manhattanDistance(curr)) {
            rejectedMoves.push({ state: newState, reason: "Higher cost" });
            continue;
          }

          queue.enqueue([newState, [...path, curr], newCost], priority);
        }
      }
    }

    return { solution: null, rejectedMoves }; // If no solution is found
  }

  function manhattanDistance(state) {
    let dist = 0;
    for (let i = 0; i < 16; i++) {
      if (state[i] !== 0) {
        const goalRow = Math.floor((state[i] - 1) / 4);
        const goalCol = (state[i] - 1) % 4;
        const currRow = Math.floor(i / 4);
        const currCol = i % 4;
        dist += Math.abs(goalRow - currRow) + Math.abs(goalCol - currCol);
      }
    }
    return dist;
  }

  function isGoal(state) {
    for (let i = 0; i < 15; i++) {
      if (state[i] !== i + 1) return false;
    }
    return state[15] === 0;
  }

  // Solving the puzzle
  const { solution, rejectedMoves } = branchAndBound(puzzle);
  postMessage({ solution, rejectedMoves }); // Send the solution and rejected moves back to main thread
};
