const Todo = require("../model/Todo");
// get
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({
            user: req.user._id
        }).sort({ createdAt: -1});
        res.json(todos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// create
exports.createTodos = async (req, res) => {
    try {
        const { title, description, priority, category, dueDate } = req.body;

        if(!title || !title.trim()) {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const todo = await Todo.create({  title, description, priority, category, dueDate: dueDate || null, user: req.user._id
        });

        res.status(201).json(todo);
    } catch (error){
        res.status(201).json({
            message: "error.message"
        });
    }
};
// post
exports.postTodos = async (req, res, next) => {
    try {
        const todoItem = new TodoItem(req.body);
        const item = await todoItem.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
// delete
exports.deleteTodos = async (req, res) => {
    try{ 
        const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
        if (!todo) {
            return res.status(404).json({message: "Todo not found."});
        }
        res.json({
            message: "Todo Deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
// update
exports.updateTodos = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if(!todo) {
            return res.status(404).json({
                message: "Todo not Found"
            });
        }
       const allowedFields = [ "title", "description", "completed", "priority", "category", "dueDate"];

       allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            todo[field] = req.body[field];
        }
       });

       await todo.save();
       res.json(todo);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};