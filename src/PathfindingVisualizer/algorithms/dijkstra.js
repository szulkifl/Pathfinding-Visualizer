// Now we code the whole of the Dijksta's algorithm
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while(!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // If the closest node we are at is a wall
        if (closestNode.isWall) continue;
        // If closest node is at infinity we have come across a halt
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        // else
        // we have now visited the closest node as we have removed it from unvisitednode
        closestNode.isVisited = true;
        // so we add the node to the array after assigning it visited status
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        // If we have not found the end and we still have to go on
        // update the unvisited neighbors of this current node
        updateUnvisitedNeighbors(closestNode, grid);
    }

}

// first make the helper function
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }

}

function getUnvisitedNeighbors(node, grid ) {
    const neighbors = [];
    const {row, col} = node;
    if (row > 0) neighbors.push(grid[row-1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col-1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

// for every row of the grid
// take every node of each row 
// and push it into the new array of nodes
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
    return nodes;
}

/*
the purpose of this function is to backtrack from the finish node 
every node has a previous node, property which tells us, what node
this current node came from, and we can use this property to backtrack.
Think of this as having access to that hash-table of results in the dijkstra's alg
and you basically use the key.previous property to just access which node each of 
the visited nodes came from so that you can back-track to the source eventually
 */
export function getNodesInShortestPathOrder(finishNode) {
   const shortestPathOrder = [];
   let currentNode = finishNode;
   while(currentNode !== null) {
    shortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
   }
   // Debugging statement
   console.log("Shortest Path Function is happening")
   return shortestPathOrder;
}