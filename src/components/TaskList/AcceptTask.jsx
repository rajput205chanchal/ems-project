import React from 'react';

const AcceptTask = ({ data }) => {
  return (
    <div className="p-5 bg-purple-100 rounded-lg shadow-md flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 text-xs font-semibold text-white bg-purple-500 rounded-full">
            {data.category}
          </span>
          <span className="text-xs text-gray-500">{data.date}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800">{data.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{data.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button className="w-full px-2 py-2 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Mark as Completed
        </button>
        <button className="w-full px-2 py-2 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
