/*
There is a ball in a maze with empty spaces and walls. The ball can go through empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the ball's start position, the destination and the maze, 
find the shortest distance for the ball to stop at the destination. 
The distance is defined by the number of empty spaces traveled by the ball from the start position (excluded) 
to the destination (included). If the ball cannot stop at the destination, return -1.
The maze is represented by a binary 2D array. 1 means the wall and 0 means the empty space. 
You may assume that the borders of the maze are all walls. The start and destination coordinates 
are represented by row and column indexes.
Example 1  Input 1: a maze represented by a 2D array
0 0 1 0 0
0 0 0 0 0
0 0 0 1 0
1 1 0 1 1
0 0 0 0 0
Input 2: start coordinate (rowStart, colStart) = (0, 4)
Input 3: destination coordinate (rowDest, colDest) = (4, 4)
Output: 12
Explanation: One shortest way is : left -> down -> left -> down -> right -> down -> right. The total distance is 1 + 1 + 3 + 1 + 2 + 2 + 2 = 12.

Example 2  Input 1: a maze represented by a 2D array
0 0 1 0 0
0 0 0 0 0
0 0 0 1 0
1 1 0 1 1
0 0 0 0 0
Input 2: start coordinate (rowStart, colStart) = (0, 4)
Input 3: destination coordinate (rowDest, colDest) = (3, 2)
Output: -1  Explanation: There is no way for the ball to stop at the destination.
*/

/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
  similar with maze I, just add the distance to the node
  fon't return even if you find destination, could be a smaller dist in future.
 */
var shortestDistance = function(maze, start, destination) {
    var st = [],  visited = [], dir = [[0, 1], [0, -1], [-1, 0], [1, 0]];
    for(var i=0; i<maze.length; i++) {
        visited[i] = [];
        for(var j=0; j<maze[0].length; j++) {
            visited[i][j] = null;
        }
    }
    
    visited[start[0]][start[1]] = 0;
    st.push(start);
    while(st.length > 0) {
        var cur = st.shift();
        for(var i=0; i<4; i++) {
            var x = cur[0];
            var y = cur[1];
            var dist = visited[cur[0]][cur[1]];
            while(x+ dir[i][0]>=0 &&
                  y+dir[i][1]>=0 &&
                  x+ dir[i][0]<maze.length &&
                  y+ dir[i][1]<maze[0].length &&
                  maze[x+ dir[i][0]][y+ dir[i][1]] === 0) {
                 dist ++;
                 x += dir[i][0];
                 y += dir[i][1];
            }
            if(visited[x][y] === null) {
                visited[x][y] = dist;
                st.push([x, y]);
            } else {
                if(visited[x][y] > dist) {
                    visited[x][y] = dist;
                    st.push([x, y]);
                }
            }
        }
    }
    return visited[destination[0]][destination[1]] ? visited[destination[0]][destination[1]] : -1;
};
