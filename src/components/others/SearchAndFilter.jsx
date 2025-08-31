import React, { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const SearchAndFilter = ({
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    onClearFilters,
    filterOptions = {}
}) => {
    const [showFilters, setShowFilters] = useState(false);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        onClearFilters();
        setShowFilters(false);
    };

    const activeFiltersCount = Object.values(filters).filter(value =>
        value && value !== '' && value !== 'all'
    ).length;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search tasks, employees, or descriptions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FiX size={16} />
                        </button>
                    )}
                </div>

                {/* Filter Toggle Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold transition-all transform hover:scale-105 ${showFilters || activeFiltersCount > 0
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-300 text-white shadow-lg'
                            : 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                        }`}
                >
                    <FiFilter size={18} />
                    <span className="text-sm font-medium">Filters</span>
                    {activeFiltersCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>

                {/* Clear All Button */}
                {(searchQuery || activeFiltersCount > 0) && (
                    <button
                        onClick={clearAllFilters}
                        className="px-6 py-3 text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
                    >
                        🗑️ Clear All
                    </button>
                )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Status Filter */}
                        {filterOptions.status && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    📊 Status
                                </label>
                                <select
                                    value={filters.status || 'all'}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm font-medium"
                                >
                                    <option value="all">All Status</option>
                                    <option value="new">New</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        )}

                        {/* Priority Filter */}
                        {filterOptions.priority && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    🚀 Priority
                                </label>
                                <select
                                    value={filters.priority || 'all'}
                                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm font-medium"
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        )}

                        {/* Category Filter */}
                        {filterOptions.category && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    📂 Category
                                </label>
                                <select
                                    value={filters.category || 'all'}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm font-medium"
                                >
                                    <option value="all">All Categories</option>
                                    {filterOptions.categories?.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Department Filter */}
                        {filterOptions.department && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    🏢 Department
                                </label>
                                <select
                                    value={filters.department || 'all'}
                                    onChange={(e) => handleFilterChange('department', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm font-medium"
                                >
                                    <option value="all">All Departments</option>
                                    <option value="IT">IT</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Operations">Operations</option>
                                </select>
                            </div>
                        )}

                        {/* Date Range Filter */}
                        {filterOptions.dateRange && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        From Date
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.dateFrom || ''}
                                        onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        To Date
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.dateTo || ''}
                                        onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Active Filters Display */}
                    {activeFiltersCount > 0 && (
                        <div className="mt-4 pt-4 border-t dark:border-gray-600">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Active Filters:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value || value === '' || value === 'all') return null;
                                    return (
                                        <span
                                            key={key}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                                        >
                                            <span className="font-medium">{key}:</span>
                                            <span>{value}</span>
                                            <button
                                                onClick={() => handleFilterChange(key, '')}
                                                className="ml-1 hover:text-blue-600"
                                            >
                                                <FiX size={14} />
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchAndFilter;
