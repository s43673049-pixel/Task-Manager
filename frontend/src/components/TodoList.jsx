import { Check, Trash2, Pencil, CalendarDays } from "lucide-react";


const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {

  const priorityStyles = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600"
  };
  
  return (
   <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">

    <h2 className="text-xl font-bold mb-6">My Tasks</h2>

    {todos.length === 0 ? ( <p className="text-center text-slate-400 py-10">
      No tasks found.
    </p>) : (

    <div className="space-y-4">
      {todos.map((todo) => (
        
        <div key={todo.id}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4"> 
          
          <div className="flex items-center gap-4">
            
            <button onClick={() => onToggle(todo.id)}
             className={`w-6 h-6 shrink-0  rounded-full border flex items-center justify-center 
              ${todo.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-slate-300"
                }`}>
                  {todo.completed && <Check size={14} />}
             </button>

             <div> 
              <h3 className={`font-semibold ${todo.completed ? "line-through text-slate-400": "text-slate-800"}}`}>{todo.title}</h3>

              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  priorityStyles[todo.priority]
                }`}>
                  {todo.priority}
                </span>

                 <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                  {todo.category}
                </span>

                {todo.date && (<span className="flex items-center gap-1 text-xs text-slate-400">
                  <CalendarDays size={13} />
                  {todo.date}
                </span>
                )}
             </div>
          </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => onEdit(todo)} > 
              <Pencil size={18} className="text-blue-500" />
            </button>

            <button onClick={() => onDelete(todo.id)} >
              <Trash2 size={18} className="text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
    )}
  </div>
  );
};

export default TodoList;