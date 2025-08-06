import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

const TaskForm = ({ task = null, onClose }) => {
  const { addTask, updateTask } = useTaskContext();
  const { isDarkMode, colors } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });
  const [loading, setLoading] = useState(false);

  const currentColors = isDarkMode ? colors.dark : colors.light;

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (task) {
        await updateTask(task._id, formData);
      } else {
        await addTask(formData);
        setFormData({ title: '', description: '', status: 'Pending' });
      }
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="rounded-lg shadow-lg p-4 sm:p-6 border transition-colors duration-300"
      style={{
        backgroundColor: currentColors.background.secondary,
        borderColor: currentColors.border.primary,
      }}
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 
          className="text-lg sm:text-xl font-semibold transition-colors duration-300"
          style={{ color: currentColors.text.primary }}
        >
          {task ? 'Edit Task' : 'Add New Task'}
        </h3>
        <button
          onClick={onClose}
          className="transition-colors duration-200 hover:scale-110 p-1"
          style={{ color: currentColors.text.secondary }}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label 
            htmlFor="title" 
            className="block text-sm font-medium mb-1 transition-colors duration-300"
            style={{ color: currentColors.text.primary }}
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: currentColors.background.primary,
              borderColor: currentColors.border.primary,
              color: currentColors.text.primary,
              border: `1px solid ${currentColors.border.primary}`,
            }}
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="description" 
            className="block text-sm font-medium mb-1 transition-colors duration-300"
            style={{ color: currentColors.text.primary }}
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: currentColors.background.primary,
              borderColor: currentColors.border.primary,
              color: currentColors.text.primary,
              border: `1px solid ${currentColors.border.primary}`,
            }}
            placeholder="Enter task description"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="status" 
            className="block text-sm font-medium mb-1 transition-colors duration-300"
            style={{ color: currentColors.text.primary }}
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: currentColors.background.primary,
              borderColor: currentColors.border.primary,
              color: currentColors.text.primary,
              border: `1px solid ${currentColors.border.primary}`,
            }}
          >
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: currentColors.background.tertiary,
              color: currentColors.text.primary,
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            style={{
              backgroundColor: currentColors.primary[500],
              color: isDarkMode ? '#0f172a' : '#ffffff',
            }}
          >
            {loading ? (
              <>
                <div 
                  className="animate-spin rounded-full h-4 w-4 border-b-2"
                  style={{ borderColor: isDarkMode ? '#0f172a' : '#ffffff' }}
                ></div>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {task ? 'Update Task' : 'Add Task'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm; 