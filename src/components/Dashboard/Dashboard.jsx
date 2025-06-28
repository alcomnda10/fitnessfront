import React, { useState } from 'react';
import { BarChart3, Activity, Users, DollarSign, TrendingUp, Calendar, Settings, Bell, Box } from 'lucide-react';

import ProductsManager from './ProductsManager';
import UsersManager from './UsersManager'; // تم إضافته

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { title: 'Total Users', value: '1,234', icon: Users, change: '+12%', color: 'bg-blue-500' },
        { title: 'Revenue', value: '$12,345', icon: DollarSign, change: '+8%', color: 'bg-green-500' },
        { title: 'Active Members', value: '856', icon: Activity, change: '+5%', color: 'bg-purple-500' },
        { title: 'Growth Rate', value: '23%', icon: TrendingUp, change: '+2%', color: 'bg-orange-500' },
    ];

    const recentActivities = [
        { user: 'John Doe', action: 'Started a new workout plan', time: '2 hours ago' },
        { user: 'Jane Smith', action: 'Completed daily challenge', time: '4 hours ago' },
        { user: 'Mike Johnson', action: 'Achieved fitness goal', time: '6 hours ago' },
        { user: 'Sarah Wilson', action: 'Joined premium membership', time: '8 hours ago' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold mb-6">لوحة التحكم</h2>
                <nav className="flex flex-col gap-3">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`cursor-pointer flex items-center gap-2 p-2 rounded hover:bg-teal-600 transition ${activeTab === 'overview' ? 'bg-gray-300 font-semibold' : ''}`}
                    >
                        <BarChart3 className="w-5 h-5" /> نظرة عامة
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`cursor-pointer flex items-center gap-2 p-2 rounded hover:bg-teal-600 transition ${activeTab === 'products' ? 'bg-gray-300 font-semibold' : ''}`}
                    >
                        <Box className="w-5 h-5" /> إدارة المنتجات
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`cursor-pointer flex items-center gap-2 p-2 rounded hover:bg-teal-600 transition ${activeTab === 'users' ? 'bg-gray-300 font-semibold' : ''}`}
                    >
                        <Users className="w-5 h-5" /> إدارة المستخدمين
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-6">
                {activeTab === 'overview' && (
                    <div>
                        <div className="mb-8 flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <div className="flex items-center gap-4">
                                <button className="p-2 text-gray-600 hover:text-gray-900">
                                    <Bell className="h-6 w-6" />
                                </button>
                                <button className="p-2 text-gray-600 hover:text-gray-900">
                                    <Settings className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                            <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                                        </div>
                                        <div className={`rounded-full ${stat.color} p-3`}>
                                            <stat.icon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <span className="text-sm font-medium text-green-600">{stat.change}</span>
                                        <span className="ml-2 text-sm text-gray-600">vs last month</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 grid gap-6 lg:grid-cols-2">
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Activity Overview</h2>
                                    <button className="text-sm text-teal-600 hover:text-teal-700">View All</button>
                                </div>
                                <div className="relative h-[300px] w-full">
                                    <div className="flex h-full items-end justify-between gap-2">
                                        {[40, 70, 45, 90, 65, 30, 85].map((height, index) => (
                                            <div key={index} className="w-full">
                                                <div
                                                    className="bg-teal-500 transition-all hover:bg-teal-600"
                                                    style={{ height: `${height}%` }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-4">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                                            <span key={index} className="text-sm text-gray-600">
                                                {day}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                                    <button className="text-sm text-teal-600 hover:text-teal-700">View All</button>
                                </div>
                                <div className="space-y-4">
                                    {recentActivities.map((activity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0"
                                        >
                                            <div className="rounded-full bg-gray-100 p-2">
                                                <Calendar className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{activity.user}</p>
                                                <p className="text-sm text-gray-600">{activity.action}</p>
                                                <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'products' && <ProductsManager />}
                {activeTab === 'users' && <UsersManager />}
            </main>
        </div>
    );
};

export default Dashboard;
