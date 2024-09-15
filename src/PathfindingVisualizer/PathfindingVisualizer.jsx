import React, { Component } from 'react';
import  Node  from './Node/Node';
import { Button } from 'react-bootstrap'

import "./PathfindingVisualizer.css"
import {dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';

const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 20;
const FINISH_NODE_COL = 10;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    // this method is after the component mounts
    componentDidMount() {
        const grid = getInitialGrid();
        this.setState( {grid} );
    }

    // now we make the functions that handle the actions
    // when user wants to click a node to "activate it"
    handleMouseDown(row, col) {
        const newGrid = gridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    // when user wants to select a node while the mouseIsPressed to ensure that nodes can be dragged and selected
    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
            const newGrid = gridWithWallToggled(this.state.grid, row, col);
            this.setState({grid: newGrid});
        
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    //next three functions that we make are going to be related to the processing of the Dijkstra's algorithm
    animateDijkstra(visitedNodes, shortestPath) {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                // if we are at the last node or at the end
                // animate the whole path out now
                setTimeout(() => {
                    //Debugging statement 2
                    this.animatePath(shortestPath);
                    console.log("Path animation")
                }, 10 * i);
                return;
            }
            /* 
            else, by changing the className of the node to the className divtag, 
            of a visited node, we will ensure that the color of this node has changed to 
            that of a visited node, thus indicating that in the animation it is displayed 
            as a visited node.
            */
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
            }, 10 * i);
        }
    }

    // this will animate the shortest path, which is going to be the resultant path
    animatePath(shortestPath) {
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
                const node = shortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 50 * i);
        }
    }
    // the triggering method
      visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodes = dijkstra(grid, startNode, finishNode);
        const shortestPath = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodes, shortestPath);
    }
    render() 
    {
        const {grid, mouseIsPressed} = this.state;
        return (
         <>
         <Button
         variant = 'danger'
         onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra
         </Button>
    
         <div className= "grid">
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx}>
                        {row.map((node,nodeIdx) => {
                            const {row, col, isFinish, isStart, isWall} = node;
                            return (
                                <Node
                                key = {nodeIdx}
                                col={col}
                                isFinish={isFinish}
                                isStart={isStart}
                                isWall={isWall}
                                mouseIsPressed={mouseIsPressed}
                                onMouseDown={(row,col) => this.handleMouseDown(row, col)}
                                onMouseEnter={(row,col) => this.handleMouseEnter(row,col)}
                                onMouseUp={() => this.handleMouseUp()}
                                row={row}
                                >
                                </Node>
                            );
                        })}
                    </div>
                );
            })}
         </div>
         
         </>
        );

    }

}

// Helper methods written first
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 50; row++) {
        const currentRow = []; 
        for (let col = 0; col < 22; col++) {
           currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
 };

 // Creates a node with given attributes
 const createNode = (row, col) => {
    return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    };
 };

 //Grid with wall toggled
 const gridWithWallToggled = (grid, row, col) => {

    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
 };