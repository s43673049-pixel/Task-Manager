const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    category: {
        type: String,
        enum: ["Personal", "Work", "Study", "Other"],
        default: "Personal"
    },
    dueDate: {
        type: Date,
        default: null,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);