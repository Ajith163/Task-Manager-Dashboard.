import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

const TaskFilter = () => {
  const { filter, setFilter, tasks } = useTaskContext();
  const { isDarkMode, colors } = useTheme();

  const currentColors = isDarkMode ? colors.dark : colors.light;

  const filters = [
    { value: 'All', label: 'All Tasks' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In-Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' }
  ];

  const getTaskCount = (status) => {
    if (status === 'All') {
      return tasks.length;
    }
    return tasks.filter(task => task.status === status).length;
  };

  return (
    <div 
      className="rounded-lg shadow-lg border p-4 transition-colors duration-300"
      style={{
        backgroundColor: currentColors.background.secondary,
        borderColor: currentColors.border.primary,
      }}
    >
      <div className="flex flex-wrap gap-2">
        {filters.map((filterOption) => {
          const isActive = filter === filterOption.value;
          return (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: isActive 
                  ? currentColors.primary[500] 
                  : currentColors.background.tertiary,
                color: isActive 
                  ? (isDarkMode ? '#0f172a' : '#ffffff')
                  : currentColors.text.primary,
              }}
            >
              {filterOption.label}
              <span 
                className="ml-2 px-2 py-0.5 text-xs rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: isActive 
                    ? (isDarkMode ? '#0f172a' : '#ffffff')
                    : currentColors.border.primary,
                  color: isActive 
                    ? currentColors.primary[500]
                    : currentColors.text.secondary,
                }}
              >
                {getTaskCount(filterOption.value)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskFilter; 