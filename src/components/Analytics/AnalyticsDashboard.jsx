import React, { useContext, useMemo } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { FiUsers, FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';

const AnalyticsDashboard = () => {
    const [userData] = useContext(AuthContext);

    const analyticsData = useMemo(() => {
        if (!userData?.employees) return null;

        const employees = userData.employees;

        // Calculate overall statistics
        const totalEmployees = employees.length;
        const totalTasks = employees.reduce((sum, emp) => sum + (emp.taskCount || 0), 0);
        const completedTasks = employees.reduce((sum, emp) => sum + (emp.taskSummary?.completed || 0), 0);
        const activeTasks = employees.reduce((sum, emp) => sum + (emp.taskSummary?.active || 0), 0);
        const failedTasks = employees.reduce((sum, emp) => sum + (emp.taskSummary?.failed || 0), 0);
        const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

        // Employee performance data
        const employeePerformance = employees.map(emp => ({
            name: emp.firstname,
            completed: emp.taskSummary?.completed || 0,
            active: emp.taskSummary?.active || 0,
            failed: emp.taskSummary?.failed || 0,
            total: emp.taskCount || 0,
            completionRate: emp.taskCount > 0 ? ((emp.taskSummary?.completed || 0) / emp.taskCount * 100).toFixed(1) : 0
        }));

        // Department wise data
        const departmentData = employees.reduce((acc, emp) => {
            const dept = emp.department || 'Unassigned';
            if (!acc[dept]) {
                acc[dept] = { name: dept, employees: 0, tasks: 0, completed: 0 };
            }
            acc[dept].employees++;
            acc[dept].tasks += emp.taskCount || 0;
            acc[dept].completed += emp.taskSummary?.completed || 0;
            return acc;
        }, {});

        const departmentArray = Object.values(departmentData);

        // Task status distribution
        const taskDistribution = [
            { name: 'Completed', value: completedTasks, color: '#10B981' },
            { name: 'Active', value: activeTasks, color: '#3B82F6' },
            { name: 'Failed', value: failedTasks, color: '#EF4444' },
            { name: 'New', value: employees.reduce((sum, emp) => sum + (emp.taskSummary?.newTask || 0), 0), color: '#F59E0B' }
        ];

        return {
            overview: {
                totalEmployees,
                totalTasks,
                completedTasks,
                activeTasks,
                failedTasks,
                completionRate
            },
            employeePerformance,
            departmentData: departmentArray,
            taskDistribution
        };
    }, [userData]);

    if (!analyticsData) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <p className="text-gray-500 dark:text-gray-400">Loading analytics data...</p>
            </div>
        );
    }

    const { overview, employeePerformance, departmentData, taskDistribution } = analyticsData;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-purple-700">👥 Total Employees</p>
                            <p className="text-3xl font-bold text-purple-800">{overview.totalEmployees}</p>
                        </div>
                        <FiUsers className="text-purple-500 text-4xl" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-green-700">✅ Completed Tasks</p>
                            <p className="text-3xl font-bold text-green-800">{overview.completedTasks}</p>
                        </div>
                        <FiCheckCircle className="text-green-500 text-4xl" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-blue-700">🔄 Active Tasks</p>
                            <p className="text-3xl font-bold text-blue-800">{overview.activeTasks}</p>
                        </div>
                        <FiClock className="text-blue-500 text-4xl" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-xl p-6 border border-yellow-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-yellow-700">📊 Completion Rate</p>
                            <p className="text-3xl font-bold text-yellow-800">{overview.completionRate}%</p>
                        </div>
                        <FiAlertTriangle className="text-yellow-500 text-4xl" />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Employee Performance Chart */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
                        📊 Employee Performance
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={employeePerformance}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
                            <XAxis dataKey="name" tick={{ fill: '#1E40AF', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#1E40AF', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#F8FAFC',
                                    border: '2px solid #3B82F6',
                                    borderRadius: '8px',
                                    color: '#1E40AF'
                                }}
                            />
                            <Legend wrapperStyle={{ color: '#1E40AF' }} />
                            <Bar dataKey="completed" fill="#10B981" name="Completed" />
                            <Bar dataKey="active" fill="#3B82F6" name="Active" />
                            <Bar dataKey="failed" fill="#EF4444" name="Failed" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl shadow-xl p-6 border border-purple-200">
                    <h3 className="text-xl font-bold text-purple-800 mb-6 flex items-center gap-2">
                        🥧 Task Status Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={taskDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {taskDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#FDF2F8',
                                    border: '2px solid #EC4899',
                                    borderRadius: '8px',
                                    color: '#BE185D'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                    🏢 Department Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                        <XAxis dataKey="name" tick={{ fill: '#065F46', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#065F46', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#F0FDF4',
                                border: '2px solid #10B981',
                                borderRadius: '8px',
                                color: '#065F46'
                            }}
                        />
                        <Legend wrapperStyle={{ color: '#065F46' }} />
                        <Bar dataKey="employees" fill="#8B5CF6" name="Employees" />
                        <Bar dataKey="tasks" fill="#F59E0B" name="Total Tasks" />
                        <Bar dataKey="completed" fill="#10B981" name="Completed Tasks" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Employee Performance Table */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl shadow-xl p-6 border border-indigo-200">
                <h3 className="text-xl font-bold text-indigo-800 mb-6 flex items-center gap-2">
                    👥 Detailed Employee Performance
                </h3>
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full divide-y divide-indigo-200 bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500">
                            <tr>
                                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider border-r border-indigo-400">
                                    👤 Employee
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider border-r border-indigo-400">
                                    📋 Total Tasks
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider border-r border-indigo-400">
                                    ✅ Completed
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider border-r border-indigo-400">
                                    🔄 Active
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider border-r border-indigo-400">
                                    ❌ Failed
                                </th>
                                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                                    📊 Completion Rate
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-indigo-100">
                            {employeePerformance.map((employee, index) => (
                                <tr key={index} className={`hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-800 border-r border-gray-200">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                {employee.name.charAt(0).toUpperCase()}
                                            </div>
                                            {employee.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-indigo-700 font-semibold border-r border-gray-200">
                                        <span className="bg-indigo-100 px-3 py-1 rounded-full text-indigo-800 font-bold">
                                            {employee.total}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-700 font-bold border-r border-gray-200">
                                        <span className="bg-green-100 px-3 py-1 rounded-full text-green-800 font-bold">
                                            {employee.completed}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-700 font-bold border-r border-gray-200">
                                        <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 font-bold">
                                            {employee.active}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-700 font-bold border-r border-gray-200">
                                        <span className="bg-red-100 px-3 py-1 rounded-full text-red-800 font-bold">
                                            {employee.failed}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-purple-700 font-bold">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-20 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${Math.min(employee.completionRate, 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="bg-purple-100 px-3 py-1 rounded-full text-purple-800 font-bold min-w-fit">
                                                {employee.completionRate}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default AnalyticsDashboard;
