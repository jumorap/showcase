# Juan Camilo Mora Pulido

## WHOAMI

Hello, my name is Juan, and I'm a software developer from Colombia. I'm a passionate individual who loves all things technology. As someone who is always seeking new knowledge and challenges, I find myself constantly learning and growing in my field.

When I'm not working on coding projects, I enjoy spending my free time exploring my other interests. I'm a big fan of the cinema and enjoy immersing myself in different genres of film. Reading is also a big hobby of mine, and I'm always looking for new books to dive into.

As an avid learner, I'm always looking for opportunities to expand my knowledge and meet new people. Whether it's through networking events or online communities, I'm always eager to connect with like-minded individuals and exchange ideas.

Overall, I'm a driven and enthusiastic individual who is always looking for new opportunities to grow both personally and professionally.

## Demo of John Conway's Game of Life

You can play! Just click on the cells to make them alive or dead.

{{< p5-iframe sketch="/showcase/sketches/gameOfLife.js" width="724" height="724" >}}

Conway's Game of Life is a classic cellular automaton that consists of a two-dimensional grid of cells, each of which is in one of two states, alive or dead. The game is based on four simple rules that dictate whether a cell will live, die, or remain unchanged in the next generation, depending on the states of its neighbors.

The rules are:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation. 
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. 

The game has no players, as it runs on its own, with the initial state of the grid determining the course of the game. It is a fascinating example of emergent behavior, as complex patterns and structures can arise from simple rules.

I love Conway's Game of Life because it is a perfect example of how simplicity can give rise to complexity, and how something as simple as a few rules can create beautiful and intricate patterns. It is also a great way to explore the power of computation and simulation, and how computers can be used to model and understand complex systems.

One interesting aspect of the game is that the terrain is toroidal, meaning that the grid wraps around at the edges, so that the cells on the right edge are considered neighbors of the cells on the left edge, and the cells on the bottom edge are considered neighbors of the cells on the top edge. This creates interesting patterns and behaviors, as cells that move out of one edge of the grid reappear on the other side.