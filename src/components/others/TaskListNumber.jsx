import React from "react";

const TaskListNumber = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <div className="p-6 rounded-lg shadow-md bg-blue-100 text-blue-800">
        <h2 className="text-4xl font-bold">{data.taskSummary.newTask}</h2>
        <h3 className="text-lg font-semibold mt-2">New Tasks</h3>
      </div>

      <div className="p-6 rounded-lg shadow-md bg-green-100 text-green-800">
        <h2 className="text-4xl font-bold">{data.taskSummary.completed}</h2>
        <h3 className="text-lg font-semibold mt-2">Completed Tasks</h3>
      </div>

      <div className="p-6 rounded-lg shadow-md bg-purple-100 text-purple-800">
        <h2 className="text-4xl font-bold">{data.taskSummary.active}</h2>
        <h3 className="text-lg font-semibold mt-2">Active Tasks</h3>
      </div>

      <div className="p-6 rounded-lg shadow-md bg-red-100 text-red-800">
        <h2 className="text-4xl font-bold">{data.taskSummary.failed}</h2>
        <h3 className="text-lg font-semibold mt-2">Failed Tasks</h3>
      </div>
    </div>
  );
};

export default TaskListNumber;

