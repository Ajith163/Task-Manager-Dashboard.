import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import TaskForm from './TaskForm';

const TaskList = ({ tasks }) => {
  const { deleteTask } = useTaskContext();
  const { isDarkMode, colors } = useTheme();
  const [editingTask, setEditingTask] = useState(null);

  const currentColors = isDarkMode ? colors.dark : colors.light;

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    const statusColors = currentColors.status;
    switch (status) {
      case 'Pending':
        return {
          backgroundColor: statusColors.pending,
          color: statusColors.pendingText
        };
      case 'In-Progress':
        return {
          backgroundColor: statusColors.inProgress,
          color: statusColors.inProgressText
        };
      case 'Completed':
        return {
          backgroundColor: statusColors.completed,
          color: statusColors.completedText
        };
      default:
        return {
          backgroundColor: currentColors.background.tertiary,
          color: currentColors.text.secondary
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // If it's today, show time only
    if (diffDays === 1) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // If it's within a week, show day and time
    if (diffDays <= 7) {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Otherwise show full date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div 
            className="rounded-lg w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-300 shadow-2xl"
            style={{ backgroundColor: currentColors.background.secondary }}
          >
            <TaskForm 
              task={editingTask} 
              onClose={() => setEditingTask(null)} 
            />
          </div>
        </div>
      )}

      <div 
        className="divide-y transition-colors duration-300"
        style={{ borderColor: currentColors.border.primary }}
      >
        {tasks.map((task) => (
          <div 
            key={task._id} 
            className="p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02]"
            style={{ 
              backgroundColor: currentColors.background.secondary,
              borderBottom: `1px solid ${currentColors.border.primary}`
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h3 
                    className="text-base sm:text-lg font-medium truncate transition-colors duration-300"
                    style={{ color: currentColors.text.primary }}
                  >
                    {task.title}
                  </h3>
                  <span 
                    className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium transition-colors duration-300 w-fit"
                    style={getStatusColor(task.status)}
                  >
                    {task.status}
                  </span>
                </div>
                
                <p 
                  className="mb-2 sm:mb-3 line-clamp-2 transition-colors duration-300 text-sm sm:text-base"
                  style={{ color: currentColors.text.secondary }}
                >
                  {task.description}
                </p>
                
                <div 
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors duration-300"
                  style={{ color: currentColors.text.tertiary }}
                >
                  <div className="flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Created: {formatDate(task.createdAt)}</span>
                  </div>
                  {task.updatedAt !== task.createdAt && (
                    <>
                      <span className="hidden sm:inline mx-2">•</span>
                      <div className="flex items-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Updated: {formatDate(task.updatedAt)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-end sm:justify-start gap-1 sm:gap-2">
                <button
                  onClick={() => setEditingTask(task)}
                  className="p-1.5 sm:p-2 transition-all duration-200 hover:scale-110 rounded"
                  style={{ color: currentColors.text.tertiary }}
                  title="Edit task"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-1.5 sm:p-2 transition-all duration-200 hover:scale-110 rounded"
                  style={{ color: currentColors.text.tertiary }}
                  title="Delete task"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList; 