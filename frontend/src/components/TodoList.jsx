import { Check, Trash2, Pencil } from "lucide-react";


const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  
  return (
   <div className="bg-white rounded-2xl p-6 border border-slate-100">

    <h2 className="text-xl font-bold mb-6">Recent Tasks</h2>

    <div className="space-y-4">
     
      {todos.map((todo) => (
        
        <div key={todo.id}
          className="flex items-center justify-between border-b border-slate-100 pb-4"> 
          
          <div className="flex items-center gap-4">
            
            <button onClick={() => onToggle(todo.id)}
             className={`w-6 h-6 rounded-full border flex items-center justify-center 
              ${todo.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-slate-300"
                }`}>
                  {todo.completed && <Check size={14} />}
             </button>

             <div> 
              <h3 className={`font-semibold ${todo.completed ? "line-through text-slate-400": "text-slate-800"}}`}>{todo.text}</h3>
              <p className="text-sm text-slate-400">{todo.date}</p>
             </div>
          </div>

          <div className="flex gap-3">
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
   </div>
  );
};

export default TodoList;