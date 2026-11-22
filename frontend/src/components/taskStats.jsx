const TaskStats = ({total, completed, active}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <div className="text-2xl font-semibold text-gray-800">{total}</div>
        <div className="text-sm text-gray-500">Total</div>
      </div>
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <div className="text-2xl font-semibold text-blue-600">{active}</div>
        <div className="text-sm text-gray-500">Active</div>
      </div>
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <div className="text-2xl font-semibold text-green-600">{completed}</div>
        <div className="text-sm text-gray-500">Completed</div>
      </div>
    </div>
  )
}


export default TaskStats