const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStatus,
  getTaskStats
} = require('../controllers/taskController');

const router = express.Router();

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

router.route('/status/:status')
  .get(getTasksByStatus);

router.route('/stats/overview')
  .get(getTaskStats);

module.exports = router; 