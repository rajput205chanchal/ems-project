import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNotification } from '../../context/NotificationProvider';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX } from 'react-icons/fi';

const EmployeeProfile = ({ data, isAdmin = false }) => {
    const [userData, setUserData] = useContext(AuthContext);
    const { addNotification } = useNotification();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        firstname: data?.firstname || '',
        email: data?.email || '',
        phone: data?.phone || '',
        address: data?.address || '',
        department: data?.department || '',
        position: data?.position || '',
        joinDate: data?.joinDate || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (!editData.firstname || !editData.email) {
            addNotification('Name and email are required fields', 'error');
            return;
        }

        // Update local state and localStorage
        const updatedEmployees = userData.employees.map(emp =>
            emp.id === data.id ? { ...emp, ...editData } : emp
        );

        setUserData({
            ...userData,
            employees: updatedEmployees
        });

        // Update localStorage
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));

        setIsEditing(false);
        addNotification('Profile updated successfully!', 'success');
    };

    const handleCancel = () => {
        setEditData({
            firstname: data?.firstname || '',
            email: data?.email || '',
            phone: data?.phone || '',
            address: data?.address || '',
            department: data?.department || '',
            position: data?.position || '',
            joinDate: data?.joinDate || '',
        });
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    👤 Employee Profile
                </h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg font-bold"
                    >
                        <FiEdit2 size={18} />
                        ✏️ Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg font-bold"
                        >
                            <FiSave size={18} />
                            💾 Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105 shadow-lg font-bold"
                        >
                            <FiX size={18} />
                            ❌ Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Basic Information
                    </h3>

                    <div className="flex items-center gap-3">
                        <FiUser className="text-gray-500" />
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="firstname"
                                    value={editData.firstname}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ) : (
                                <p className="mt-1 text-gray-800 dark:text-white">{data?.firstname || 'Not specified'}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <FiMail className="text-gray-500" />
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                Email Address
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ) : (
                                <p className="mt-1 text-gray-800 dark:text-white">{data?.email || 'Not specified'}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <FiPhone className="text-gray-500" />
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                Phone Number
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ) : (
                                <p className="mt-1 text-gray-800 dark:text-white">{data?.phone || 'Not specified'}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <FiMapPin className="text-gray-500" />
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                Address
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="address"
                                    value={editData.address}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ) : (
                                <p className="mt-1 text-gray-800 dark:text-white">{data?.address || 'Not specified'}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Work Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Work Information
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                            Department
                        </label>
                        {isEditing ? (
                            <select
                                name="department"
                                value={editData.department}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Operations">Operations</option>
                            </select>
                        ) : (
                            <p className="mt-1 text-gray-800 dark:text-white">{data?.department || 'Not specified'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                            Position
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="position"
                                value={editData.position}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        ) : (
                            <p className="mt-1 text-gray-800 dark:text-white">{data?.position || 'Not specified'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                            Join Date
                        </label>
                        {isEditing ? (
                            <input
                                type="date"
                                name="joinDate"
                                value={editData.joinDate}
                                onChange={handleInputChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        ) : (
                            <p className="mt-1 text-gray-800 dark:text-white">
                                {data?.joinDate ? new Date(data.joinDate).toLocaleDateString() : 'Not specified'}
                            </p>
                        )}
                    </div>

                    {/* Task Statistics */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Task Statistics
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">Total Tasks:</span>
                                <span className="ml-2 font-semibold text-gray-800 dark:text-white">
                                    {data?.taskCount || 0}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                                <span className="ml-2 font-semibold text-green-600">
                                    {data?.taskSummary?.completed || 0}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">Active:</span>
                                <span className="ml-2 font-semibold text-blue-600">
                                    {data?.taskSummary?.active || 0}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">Failed:</span>
                                <span className="ml-2 font-semibold text-red-600">
                                    {data?.taskSummary?.failed || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
