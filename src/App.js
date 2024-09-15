import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import {Hero} from './Hero/Hero';


function App() {
  return (
<div className="App">
      <PathfindingVisualizer></PathfindingVisualizer>
    </div>
  );
}

export default App;
