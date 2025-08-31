import React, { useState, useContext } from "react";
import Header from "../others/Header";
import CreateTask from "../others/CreateTask";
import AllTask from "../others/AllTask";
import AnalyticsDashboard from "../Analytics/AnalyticsDashboard";
import EmployeeProfile from "../Profile/EmployeeProfile";
import SearchAndFilter from "../others/SearchAndFilter";
import { AuthContext } from "../../context/AuthProvider";
import { useNotification } from "../../context/NotificationProvider";
import { FiUsers, FiPlus, FiBarChart, FiList } from "react-icons/fi";

const AdminDashboard = (props) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [userData] = useContext(AuthContext);
  const { addNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleNavigation = (view) => {
    setActiveView(view);
    addNotification(`Switched to ${view} view`, 'info');
  };

  const clearFilters = () => {
    setFilters({});
  };

  const renderEmployeesList = () => {
    if (!userData?.employees) return null;

    const filteredEmployees = userData.employees.filter(employee => {
      const matchesSearch = !searchQuery ||
        employee.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (employee.department && employee.department.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDepartment = !filters.department || filters.department === 'all' ||
        employee.department === filters.department;

      return matchesSearch && matchesDepartment;
    });

    return (
      <div className="space-y-6">
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          onClearFilters={clearFilters}
          filterOptions={{ department: true }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee, index) => {
            const gradients = [
              'from-pink-400 to-red-500',
              'from-blue-400 to-indigo-500',
              'from-green-400 to-teal-500',
              'from-purple-400 to-pink-500',
              'from-yellow-400 to-orange-500',
              'from-indigo-400 to-purple-500'
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <div key={employee.id} className="bg-white rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all border border-gray-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {employee.firstname.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {employee.firstname}
                    </h3>
                    <p className="text-sm text-gray-600">
                      📧 {employee.email}
                    </p>
                    <p className="text-sm font-semibold text-blue-600">
                      🏢 {employee.department || 'No Department'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-700 font-bold">📊 Total Tasks</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {employee.taskCount || 0}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <p className="text-xs text-green-700 font-bold">✅ Completed</p>
                    <p className="text-2xl font-bold text-green-800">
                      {employee.taskSummary?.completed || 0}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setActiveView('employeeProfile');
                  }}
                  className={`w-full px-6 py-3 bg-gradient-to-r ${gradient} text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  👤 View Profile
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'employees':
        return renderEmployeesList();
      case 'employeeProfile':
        return selectedEmployee ? (
          <div>
            <button
              onClick={() => setActiveView('employees')}
              className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              ← Back to Employees
            </button>
            <EmployeeProfile data={selectedEmployee} isAdmin={true} />
          </div>
        ) : null;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 border-l-4 border-cyan-500 p-8 rounded-xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FiPlus className="text-cyan-600 text-3xl" />
                <h2 className="text-3xl font-bold text-gray-800">✨ Create a New Task</h2>
              </div>
              <CreateTask />
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 border-l-4 border-emerald-500 p-8 rounded-xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FiList className="text-emerald-600 text-3xl" />
                <h2 className="text-3xl font-bold text-gray-800">📋 All Tasks</h2>
              </div>
              <AllTask />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-900 p-4 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header changeUser={props.changeUser} onNavigate={handleNavigation} />

        {/* Quick Stats Dashboard */}
        {activeView === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 font-medium">Total Employees</p>
                  <p className="text-3xl font-bold">
                    {userData?.employees?.length || 0}
                  </p>
                </div>
                <FiUsers className="text-blue-200 text-4xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 font-medium">Total Tasks</p>
                  <p className="text-3xl font-bold">
                    {userData?.employees?.reduce((sum, emp) => sum + (emp.taskCount || 0), 0) || 0}
                  </p>
                </div>
                <FiList className="text-green-200 text-4xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 font-medium">Completed Tasks</p>
                  <p className="text-3xl font-bold">
                    {userData?.employees?.reduce((sum, emp) => sum + (emp.taskSummary?.completed || 0), 0) || 0}
                  </p>
                </div>
                <FiBarChart className="text-purple-200 text-4xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 font-medium">Active Tasks</p>
                  <p className="text-3xl font-bold">
                    {userData?.employees?.reduce((sum, emp) => sum + (emp.taskSummary?.active || 0), 0) || 0}
                  </p>
                </div>
                <FiBarChart className="text-orange-200 text-4xl" />
              </div>
            </div>
          </div>
        )}

        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;


