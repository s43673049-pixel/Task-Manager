import {LayoutDashboard, CheckSquare, Clock, Star, LogOut, ListTodo,  Settings} from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-gray-950 text-white p-6">
        <div className="flex items-center gap-3 mb-12">
            <div className='bg-violet-600 p-2 rounded-xl'>
                <ListTodo size={24} />
            </div>
            <h1 className="text-2xl font-bold">TaskFlow</h1>
        </div>
        <p className="text-slate-500 text-xs mb-4">Menu</p>

        <nav className='space-y-2'>
            <a className="flex items-center gap-3 p-3 rounded-xl bg-violet-600 ">
                <LayoutDashboard size={20} />
                Dashboard
            </a>

             <a className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl">
                <CheckSquare size={20} />
                My Tasks
            </a>

             <a className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl">
                <Clock size={20} />
                Pending
            </a>

             <a className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl">
                <Star size={20} />
                Important
            </a>
        </nav>
        
        <div className="absolute bottom-6 space-y-3">
            <div className="flex items-center gap-3 p-3 text-slate-400">
                <Settings size={20} />
                Settings
            </div>
             <div className="flex items-center gap-3 p-3 text-slate-400">
                <LogOut size={20} />
                LogOut
            </div>
        </div>
    </aside>
    )
}

export default Sidebar;