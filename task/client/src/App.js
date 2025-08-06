import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import TaskManager from './components/TaskManager';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <TaskManager />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
