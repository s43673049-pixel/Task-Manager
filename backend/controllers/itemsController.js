const TodoItem = require("../model/TodoItem");

exports.postTodoItem = async (req, res, next) => {
    try {
        const todoItem = new TodoItem(req.body);
        const item = await todoItem.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

exports.getTodoItems = async (req, res, next) => {
    try {
        const items = await TodoItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

exports.deleteTodoItem = async (req, res, next) => {
    try{ 
        const id = req.params.id;
        const item = await TodoItem.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).json({message: "Todo item not found."});
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

exports.updateTodoItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedItem = await TodoItem.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedItem) {
            return res.status(404).json({message: "Todo item not found."});
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}