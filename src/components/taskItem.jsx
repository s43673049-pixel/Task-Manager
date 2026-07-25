import { Trash2, Circle, CheckCircle2 } from "lucide-react";

// task to do 
const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="group flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 text-gray-400 hover:text-blue-500 transition-colors"
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed ? (
          <CheckCircle2 className="size-6 text-blue-500" />
        ) : (
          <Circle className="size-6" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`truncate ${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.todoText}
        </p>
        {task.todoDate && (
          <p className="text-sm text-gray-500 truncate">{task.todoDate}</p>
        )}
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
        aria-label="Delete task"
      >
        <Trash2 className="size-5" />
      </button>
    </div>
  );
};

export default TaskItem;
