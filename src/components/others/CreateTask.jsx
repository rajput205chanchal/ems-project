import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');

    const submitHandler = (e) => {
      e.preventDefault();

      if (!taskTitle || !taskDescription || !taskDate || !assignTo || !category || !priority) {
        alert('Please fill in all fields.');
        return;
      }

      const newTask = {
        taskTitle,
        title: taskTitle,
        taskDescription,
        description: taskDescription,
        taskDate,
        dueDate: taskDate,
        category,
        priority,
        active: false,
        NewTask: true,
        newTask: true,
        Failed: false,
        failed: false,
        Completed: false,
        completed: false,
        createdDate: new Date().toISOString(),
        date: new Date().toISOString(),
        taskNumber: Date.now(), // Unique task number
        timeSpent: 0,
        comments: []
      };

      if (!userData || !userData.employees) {
        alert('No employee data available.');
        return;
      }

      const updatedEmployees = userData.employees.map((user) => {
        if (user.firstname === assignTo) {
          return {
            ...user,
            tasks: [...(user.tasks || []), newTask],
            taskCount: (user.taskCount || 0) + 1,
            taskSummary: {
              ...user.taskSummary,
              newTask: (user.taskSummary?.newTask || 0) + 1,
            },
          };
        }
        return user;
      });

      const updatedUserData = {
        ...userData,
        employees: updatedEmployees,
      };

      setUserData(updatedUserData);

      // Reset form fields
      setTaskTitle('');
      setTaskDate('');
      setCategory('');
      setTaskDescription('');
      setAssignTo('');
      setPriority('medium');
  };

  return (
    <div className="rounded-lg">
      <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-4">
          <div>
            <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              placeholder="e.g., Design a new UI"
              required
            />
          </div>
          <div>
            <label htmlFor="taskDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              id="taskDate"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="date"
              required
            />
          </div>
          <div>
            <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700">
              👤 Assign To Employee
            </label>
            <select
              id="assignTo"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select an employee...</option>
              {userData?.employees?.map((employee, index) => (
                <option key={index} value={employee.firstname}>
                  {employee.firstname} ({employee.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              placeholder="e.g., Development, Design"
              required
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              🚩 Priority Level
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div>
            <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full h-40 px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Provide a detailed description of the task."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;

