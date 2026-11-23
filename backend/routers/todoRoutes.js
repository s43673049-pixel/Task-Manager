const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getTodos, createTodos, updateTodos, deleteTodos, getTodos } = require('../controllers/todoController');

router.use(protect);
router.get('/', getTodos);
router.post('/', createTodos);
router.put('/:id', updateTodos);
router.delete('/:id', deleteTodos);


module.exports = router;