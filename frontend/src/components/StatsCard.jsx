const StatsCard = ({ title, count, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center">
        
        <div>
          <p className="text-slate-500 text-sm">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{count}</h2>
        </div>

        <div className={`p-4 rounded-xl ${color}`}>{icon}</div>
      </div>
    </div>
      
  )
}


export default StatsCard;