import React, { useState, useMemo } from 'react';
import Header from '../others/Header';
import TaskListNumber from '../others/TaskListNumber';
import TaskList from '../TaskList/TaskList';
import EmployeeProfile from '../Profile/EmployeeProfile';
import EnhancedTaskCard from '../TaskList/EnhancedTaskCard';
import SearchAndFilter from '../others/SearchAndFilter';
import { useNotification } from '../../context/NotificationProvider';
import { FiCalendar, FiClock, FiTrendingUp } from 'react-icons/fi';

const EmployeeDashboard = (props) => {
  const [activeView, setActiveView] = useState('dashboard');
  const { addNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const handleNavigation = (view) => {
    setActiveView(view);
    addNotification(`Switched to ${view} view`, 'info');
  };

  const clearFilters = () => {
    setFilters({});
  };

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    if (!props.data?.tasks) return [];

    return props.data.tasks.filter(task => {
      const matchesSearch = !searchQuery ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = !filters.status || filters.status === 'all' ||
        (filters.status === 'new' && task.newTask) ||
        (filters.status === 'active' && task.active) ||
        (filters.status === 'completed' && task.completed) ||
        (filters.status === 'failed' && task.failed);

      const matchesPriority = !filters.priority || filters.priority === 'all' ||
        task.priority === filters.priority;

      const matchesCategory = !filters.category || filters.category === 'all' ||
        task.category === filters.category;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [props.data?.tasks, searchQuery, filters]);

  const categories = useMemo(() => {
    if (!props.data?.tasks) return [];
    return [...new Set(props.data.tasks.map(task => task.category))];
  }, [props.data?.tasks]);

  const renderEnhancedTaskList = () => {
    if (!filteredTasks.length) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery || Object.values(filters).some(f => f && f !== 'all')
              ? 'No tasks match your current filters.'
              : 'No tasks assigned yet.'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {filteredTasks.map((task, index) => (
          <EnhancedTaskCard
            key={`task-${task.taskNumber || task.taskTitle || index}-${index}`}
            task={task}
            employeeData={props.data}
          />
        ))}
      </div>
    );
  };

  const renderTaskAnalytics = () => {
    const taskSummary = props.data?.taskSummary || {};
    const totalTasks = props.data?.taskCount || 0;
    const completionRate = totalTasks > 0 ? ((taskSummary.completed || 0) / totalTasks * 100).toFixed(1) : 0;

    // Calculate total time spent (if available)
    const totalTimeSpent = props.data?.tasks?.reduce((sum, task) => sum + (task.timeSpent || 0), 0) || 0;
    const avgTimePerTask = totalTasks > 0 ? (totalTimeSpent / totalTasks).toFixed(1) : 0;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              🎯 Completion Rate
            </h3>
            <FiTrendingUp className="text-green-200 text-3xl" />
          </div>
          <div className="text-4xl font-bold mb-2">
            {completionRate}%
          </div>
          <p className="text-green-100">
            {taskSummary.completed || 0} of {totalTasks} tasks completed
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              ⏱️ Time Tracking
            </h3>
            <FiClock className="text-blue-200 text-3xl" />
          </div>
          <div className="text-4xl font-bold mb-2">
            {Math.floor(totalTimeSpent / 60)}h {totalTimeSpent % 60}m
          </div>
          <p className="text-blue-100">
            Avg: {Math.floor(avgTimePerTask / 60)}h {Math.round(avgTimePerTask % 60)}m per task
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              📅 This Week
            </h3>
            <FiCalendar className="text-purple-200 text-3xl" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-purple-100">🔄 Active:</span>
              <span className="font-bold text-xl">{taskSummary.active || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-100">✨ New:</span>
              <span className="font-bold text-xl">{taskSummary.newTask || 0}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return <EmployeeProfile data={props.data} />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              📈 Your Performance Analytics
            </h2>
            {renderTaskAnalytics()}
          </div>
        );
      default:
        return (
          <>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                📊 Task Overview
              </h2>
              <TaskListNumber data={props.data} />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  📋 Your Tasks
                </h2>
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {filteredTasks.length} of {props.data?.tasks?.length || 0} tasks
                </span>
              </div>

              <SearchAndFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filters={filters}
                setFilters={setFilters}
                onClearFilters={clearFilters}
                filterOptions={{
                  status: true,
                  priority: true,
                  category: true,
                  categories: categories,
                  dateRange: true
                }}
              />

              {renderEnhancedTaskList()}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-900 p-4 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header
          changeUser={props.changeUser}
          data={props.data}
          onNavigate={handleNavigation}
        />

        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

