import React from 'react';

const FailedTask = ({ data }) => {
  return (
    <div className="p-5 bg-red-100 rounded-lg shadow-md flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
            {data.category}
          </span>
          <span className="text-xs text-gray-500">{data.date}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800">{data.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{data.description}</p>
      </div>
      <div className="mt-4">
        <button className="w-full px-4 py-2 text-xs font-medium text-white bg-red-600 rounded-md cursor-not-allowed">
          Failed
        </button>
      </div>
    </div>
  );
};

export default FailedTask;
