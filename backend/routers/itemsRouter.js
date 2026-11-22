const express = require('express');
const itemsRouter = express.Router();
const itemsController = require('../controllers/itemsController');

itemsRouter.post('/todo', itemsController.postTodoItem);
itemsRouter.get('/todo', itemsController.getTodoItems);
itemsRouter.delete('/todo/:id', itemsController.deleteTodoItem);
itemsRouter.put('/todo/:id', itemsController.updateTodoItem);

module.exports = itemsRouter;