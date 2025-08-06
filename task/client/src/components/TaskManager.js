import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import ThemeToggle from './ThemeToggle';
import ResponsiveContainer from './ResponsiveContainer';

const TaskManager = () => {
  const { loading, error, filteredTasks } = useTaskContext();
  const { isDarkMode, colors } = useTheme();
  const [showForm, setShowForm] = useState(false);

  const currentColors = isDarkMode ? colors.dark : colors.light;

  if (loading) {
    return (
      <div 
        className="flex justify-center items-center h-screen transition-colors duration-300"
        style={{ backgroundColor: currentColors.background.primary }}
      >
        <div 
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: currentColors.primary[500] }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="border px-4 py-3 rounded mb-4 transition-colors duration-300"
        style={{
          backgroundColor: isDarkMode ? '#1e293b' : '#fef2f2',
          borderColor: isDarkMode ? '#475569' : '#fecaca',
          color: isDarkMode ? '#fca5a5' : '#dc2626'
        }}
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer>
      <ThemeToggle />
      
      {/* Header */}
      <header className="text-center mb-8">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 transition-colors duration-300"
          style={{ color: currentColors.text.primary }}
        >
          Task Manager
        </h1>
        <p 
          className="text-base sm:text-lg transition-colors duration-300"
          style={{ color: currentColors.text.secondary }}
        >
          Organize your tasks efficiently
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Header with Add Task Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 
            className="text-xl sm:text-2xl font-semibold transition-colors duration-300"
            style={{ color: currentColors.text.primary }}
          >
            Your Tasks
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg text-sm sm:text-base"
            style={{
              backgroundColor: currentColors.primary[500],
              color: isDarkMode ? '#0f172a' : '#ffffff',
            }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showForm ? 'Cancel' : 'Add Task'}
          </button>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-6">
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        )}

        {/* Filter */}
        <div className="mb-6">
          <TaskFilter />
        </div>

        {/* Task List */}
        <div 
          className="rounded-lg shadow-lg overflow-hidden transition-colors duration-300"
          style={{
            backgroundColor: currentColors.background.secondary,
            border: `1px solid ${currentColors.border.primary}`,
          }}
        >
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <svg 
                className="mx-auto h-8 w-8 sm:h-12 sm:w-12 transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: currentColors.text.tertiary }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 
                className="mt-2 text-sm font-medium transition-colors duration-300"
                style={{ color: currentColors.text.primary }}
              >
                No tasks
              </h3>
              <p 
                className="mt-1 text-sm transition-colors duration-300"
                style={{ color: currentColors.text.secondary }}
              >
                Get started by creating a new task.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: currentColors.primary[500],
                    color: isDarkMode ? '#0f172a' : '#ffffff',
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Task
                </button>
              </div>
            </div>
          ) : (
            <TaskList tasks={filteredTasks} />
          )}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default TaskManager; 