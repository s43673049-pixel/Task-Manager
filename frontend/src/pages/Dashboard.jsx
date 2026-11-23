import { useMemo, useState } from "react";
import { CheckCircle, Clock, ListTodo, Plus, Search, CalendarDays } from "lucide-react";

import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import TodoList from "../components/ToDoList";

const Dashboard = () => {
  const [todos, setTodos] = useState([
      { id: 1, title: "Complete project proposal", date: "2023-01-01", completed: false, priority: "high", category: "work" },
      { id: 2, title: "Review team feedback", date: "2023-01-02", completed: true, priority: "medium", category: "work" },
      { id: 3, title: "Schedule meeting with stakeholders", date: "2023-01-03", completed: false, priority: "low", category: "personal" },
  ]);

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Personal");
  const [dueDate, setDueDate]  = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (!input.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      title: input.trim(),
      date: dueDate,
      completed: false,
      priority,
      category
    };

    setTodos(prev => [...prev, newTodo]);
    
    setInput("");
    setDueDate("");
    setPriority("Medium");
    setCategory("Personal");
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (todo) => {
    const updatedTitle = prompt("Edit your task: ", todo.title);

    if (updatedTitle?.trim()) {
      setTodos(prev => prev.map((item) =>
          item.id === todo.id ? { ...item, title: updatedTitle} : item
        ));
  }
};

  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      
      const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
      
      const matchesFilter = filter === "All" ||
      (filter === "Pending" && !todo.completed) || 
      (filter === "Completed" && todo.completed);

      return matchesSearch && matchesFilter;
    });
  }, [todos, search, filter]);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* header */}
        <header className="mb-10">
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-2">
              Organize your work and achieve your goals.
            </p>
          {/* <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border">
            <Search className="text-slate-400" size={18} />
            <input placeholder="Search tasks..." className="outline-none" />
          </div> */}
        </header>
           
           {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Tasks"
            count={todos.length}
            icon={<ListTodo />}
            color="bg-violet-100 text-violet-600"
          />

          <StatsCard
            title="Completed"
            count={completed}
            icon={<CheckCircle />}
            color="bg-green-100 text-green-600"
          />

          <StatsCard
            title="Pending"
            count={pending}
            icon={<Clock />}
            color="bg-orange-100 text-orange-600"
          />
        </div>

        {/* add task form */}
        <div className="bg-white p-6 rounded-2xl mb-8 border-slate-100 shadow-sm">
          <h2 className="font-bold text-lg mb-5">Add New Task</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Enter your task..."
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <div className="flex items-center gap-3 border rounded-xl px-4">
              <CalendarDays className="text-slate-400" />
              <input type="date" 
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full py-3 outline-none" />
            </div>

            <select value={priority}
            onChange={e => setPriority(e.target.value)}
            className="border rounded-xl px-4 py-3 outline-none">
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

               <select value={category}
            onChange={e => setCategory(e.target.value)}
            className="border rounded-xl px-4 py-3 outline-none">
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Other">Other</option>
            </select>
          </div>

            <button
              onClick={addTodo}
              className="mt-5 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <Plus size={20} /> Add Task
            </button>
          </div>

          {/* search and filter */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border flex-1">
              <Search size={19} ClassName="text-slate-400" />

              <input value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="outline-none w-full" />
            </div>

            <div className="flex gap-2">
              {["All", "Pending", "Completed"].map((item) => (
                <button key={item}
                oncLick={() => setFilter(item)}
                className={`px-4 py-2 rounded-xl ${filter === item ? "bg-violet-600 text-white" : "bg-white border text-slate-600"}`} >
                  {item}
                </button>
              ))}
            </div>
          </div>

{/* todo list */}
        <TodoList todos={filteredTodos} 
        ontoggle={toggleTodo} 
        onDelete={deleteTodo} 
        onEdit={editTodo} />
      </main>
    </div>
  );
};

export default Dashboard;
