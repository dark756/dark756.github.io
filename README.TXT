# 15-Puzzle Branch and Bound Visualizer - User Guide

## Overview
This interactive web application demonstrates the working of the **Branch and Bound algorithm** applied to the classic **15-puzzle problem**. The visualizer allows users to:
- Randomly shuffle the puzzle within a user-defined depth
- Solve the puzzle using the Branch and Bound approach
- Step through each move made by the solver
- View rejected branches and their calculated bound values (`f`)

## Components
### Puzzle Grid
Displays the current state of the 4x4 puzzle. Each tile is numbered from 1 to 15, with one empty slot (0) to allow movements.

### Controls
- **Shuffle**: Randomizes the puzzle starting from the solved state using a number of moves equal to the selected shuffle depth.
- **Solve**: Executes the Branch and Bound algorithm and displays each step of the solution.
- **Shuffle Depth Slider**: Allows the user to set the shuffle depth (number of moves to randomize the puzzle). Minimum is 3 and maximum is 20. Higher values may take longer to solve and visualize.

## Step-by-Step Visualization
For each step in the solver's path:
- The grid state is displayed.
- An **arrow** in the empty tile shows the direction of the next move.
- The **step label** shows the current step number and the **bound value `f = g + h`**, where:
  - `g` = steps taken so far
  - `h` = estimated cost to reach goal (Manhattan distance)
  - `f` = total cost estimate

### Rejected Branches
- To the right of each step, you will see small grid previews of **rejected branches**.
- Each rejected branch includes its own **bound value `f`**, used by the algorithm to determine priority.
- These are states that could have been chosen but were not selected as the best move.

## How Branch and Bound Works in This Visualizer
1. Starting from the shuffled state, all valid moves are evaluated.
2. For each new state, `f = g + h` is calculated.
3. The state with the lowest `f` is chosen to explore next.
4. This process continues until the goal state is reached.
5. Rejected moves are shown for learning purposes.

## Tips
- Use lower shuffle depths (under 10) for quicker visual feedback.
- Use this tool to understand how heuristic evaluation (`f`) influences the solving path.
- Observe how the algorithm avoids inefficient paths by comparing `f` values.

## Known Limitations
- Solving times increase with puzzle complexity.
- UI may become cluttered with too many steps or rejections.
- Currently only supports a single solving strategy (Branch and Bound with Manhattan heuristic).

## Future Improvements (Ideas)
- Add toggle to show `g` and `h` values individually.
- Animate transitions between steps.
- Add alternative algorithms for comparison (e.g., A*, IDA*).

---
Enjoy exploring the 15-puzzle with Branch and Bound!

