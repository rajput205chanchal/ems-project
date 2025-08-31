import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNotification } from '../../context/NotificationProvider';
import { FiClock, FiFlag, FiMessageSquare, FiUser, FiCalendar } from 'react-icons/fi';
import { format, isAfter, isBefore, addDays } from 'date-fns';

const EnhancedTaskCard = ({ task, employeeData, onTaskUpdate }) => {
    const [userData, setUserData] = useContext(AuthContext);
    const { addNotification } = useNotification();
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [timeSpent, setTimeSpent] = useState(task.timeSpent || 0);
    const [isTimeTracking, setIsTimeTracking] = useState(false);
    const [startTime, setStartTime] = useState(null);

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-600 bg-red-100 border border-red-200';
            case 'medium':
                return 'text-yellow-600 bg-yellow-100 border border-yellow-200';
            case 'low':
                return 'text-green-600 bg-green-100 border border-green-200';
            default:
                return 'text-gray-600 bg-gray-100 border border-gray-200';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-500 bg-red-100 dark:bg-red-900';
            case 'medium':
                return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
            case 'low':
                return 'text-green-500 bg-green-100 dark:bg-green-900';
            default:
                return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
            default:
                return '⚪';
        }
    };

    const formatSafeDateTime = (dateValue) => {
    if (!dateValue) return 'No date';
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return 'Invalid date';
      return format(date, 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatSafeDate = (dateValue) => {
    if (!dateValue) return 'No date';
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return 'Invalid date';
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getDueDateStatus = (dueDate) => {
        if (!dueDate) return null;

        const today = new Date();
        const due = new Date(dueDate);

        if (isBefore(due, today)) {
            return { status: 'overdue', color: 'text-red-600', text: 'Overdue' };
        } else if (isBefore(due, addDays(today, 3))) {
            return { status: 'due-soon', color: 'text-yellow-600', text: 'Due Soon' };
        }
        return { status: 'on-time', color: 'text-green-600', text: 'On Time' };
    };

    const handleStatusUpdate = (newStatus) => {
        const updatedEmployees = userData.employees.map(emp => {
            if (emp.id === employeeData.id) {
                const updatedTasks = emp.tasks.map(t => {
                    if (t.taskNumber === task.taskNumber) {
                        const updatedTask = {
                            ...t,
                            active: newStatus === 'active',
                            completed: newStatus === 'completed',
                            failed: newStatus === 'failed',
                            newTask: newStatus === 'new',
                            timeSpent,
                            lastUpdated: new Date().toISOString()
                        };
                        return updatedTask;
                    }
                    return t;
                });

                // Update task summary
                const taskSummary = {
                    newTask: updatedTasks.filter(t => t.newTask).length,
                    active: updatedTasks.filter(t => t.active).length,
                    completed: updatedTasks.filter(t => t.completed).length,
                    failed: updatedTasks.filter(t => t.failed).length,
                };

                return {
                    ...emp,
                    tasks: updatedTasks,
                    taskSummary
                };
            }
            return emp;
        });

        setUserData({ ...userData, employees: updatedEmployees });
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        addNotification(`Task status updated to ${newStatus}`, 'success');

        if (onTaskUpdate) onTaskUpdate();
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now(),
            text: newComment,
            author: employeeData.firstname,
            timestamp: new Date().toISOString()
        };

        const updatedEmployees = userData.employees.map(emp => {
            if (emp.id === employeeData.id) {
                const updatedTasks = emp.tasks.map(t => {
                    if (t.taskNumber === task.taskNumber) {
                        return {
                            ...t,
                            comments: [...(t.comments || []), comment]
                        };
                    }
                    return t;
                });
                return { ...emp, tasks: updatedTasks };
            }
            return emp;
        });

        setUserData({ ...userData, employees: updatedEmployees });
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        setNewComment('');
        addNotification('Comment added successfully', 'success');
    };

    const handleTimeTracking = () => {
        if (!isTimeTracking) {
            setStartTime(Date.now());
            setIsTimeTracking(true);
            addNotification('Time tracking started', 'info');
        } else {
            const endTime = Date.now();
            const sessionTime = Math.floor((endTime - startTime) / 1000 / 60); // minutes
            const newTimeSpent = timeSpent + sessionTime;
            setTimeSpent(newTimeSpent);
            setIsTimeTracking(false);

            // Update in database
            handleTimeUpdate(newTimeSpent);
            addNotification(`Time tracked: ${sessionTime} minutes`, 'success');
        }
    };

    const handleTimeUpdate = (newTime) => {
        const updatedEmployees = userData.employees.map(emp => {
            if (emp.id === employeeData.id) {
                const updatedTasks = emp.tasks.map(t => {
                    if (t.taskNumber === task.taskNumber) {
                        return { ...t, timeSpent: newTime };
                    }
                    return t;
                });
                return { ...emp, tasks: updatedTasks };
            }
            return emp;
        });

        setUserData({ ...userData, employees: updatedEmployees });
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    const dueDateStatus = getDueDateStatus(task.dueDate);

    return (
        <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-blue-500 hover:shadow-2xl transition-all transform hover:scale-[1.02]">
            {/* Task Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                            {task.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(task.priority)}`}>
                            {getPriorityIcon(task.priority)} {task.priority || 'Normal'}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                        {task.description}
                    </p>

                    {/* Task Meta Information */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <FiCalendar size={14} />
                            <span>📅 Created: {formatSafeDate(task.createdDate || task.date || new Date().toISOString())}</span>
                        </div>
                        {task.dueDate && (
                            <div className="flex items-center gap-1">
                                <FiClock size={14} />
                                <span className={dueDateStatus?.color}>
                                    ⏰ Due: {formatSafeDate(task.dueDate)} ({dueDateStatus?.text})
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <FiFlag size={14} />
                            <span>🏷️ {task.category}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Time Tracking */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FiClock className="text-blue-600" />
                        <span className="text-sm font-bold text-gray-700">
                            ⏱️ Time Spent: {Math.floor(timeSpent / 60)}h {timeSpent % 60}m
                        </span>
                    </div>
                    <button
                        onClick={handleTimeTracking}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105 ${isTimeTracking
                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                            }`}
                    >
                        {isTimeTracking ? '⏹️ Stop Tracking' : '▶️ Start Tracking'}
                    </button>
                </div>
            </div>

            {/* Task Actions */}
            <div className="flex flex-wrap gap-3 mb-4">
                {task.newTask && (
                    <button
                        onClick={() => handleStatusUpdate('active')}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                        ✅ Accept Task
                    </button>
                )}
                {task.active && (
                    <>
                        <button
                            onClick={() => handleStatusUpdate('completed')}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                        >
                            🎉 Mark Complete
                        </button>
                        <button
                            onClick={() => handleStatusUpdate('failed')}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-bold hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
                        >
                            ❌ Mark Failed
                        </button>
                    </>
                )}
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-4">
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 mb-3"
                >
                    <FiMessageSquare size={16} />
                    Comments ({task.comments?.length || 0})
                </button>

                {showComments && (
                    <div className="space-y-3">
                        {/* Existing Comments */}
                        {task.comments?.map((comment) => (
                            <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <FiUser size={14} className="text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {comment.author}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {formatSafeDateTime(comment.timestamp)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {comment.text}
                                </p>
                            </div>
                        ))}

                        {/* Add New Comment */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                            />
                            <button
                                onClick={handleAddComment}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedTaskCard;
