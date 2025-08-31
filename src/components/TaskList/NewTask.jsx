import React from 'react';

const NewTask = ({ data }) => {
  return (
    <div className="p-5 bg-blue-100 rounded-lg shadow-md flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
            {data.category}
          </span>
          <span className="text-xs text-gray-500">{data.date}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800">{data.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{data.description}</p>
      </div>
      <div className="mt-4">
        <button className="w-full px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
