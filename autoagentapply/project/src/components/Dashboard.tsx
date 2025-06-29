import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const stats = [
    { icon: BarChart3, label: 'Applications Sent', value: '47', change: '+12 this week', color: 'blue' },
    { icon: TrendingUp, label: 'Response Rate', value: '23%', change: '+5% vs last month', color: 'green' },
    { icon: Clock, label: 'Active Jobs', value: '156', change: 'Monitoring now', color: 'orange' },
    { icon: CheckCircle, label: 'Interviews', value: '8', change: '3 scheduled', color: 'purple' }
  ];

  const recentApplications = [
    { company: 'Google', position: 'Senior Frontend Developer', status: 'Applied', time: '2 hours ago', logo: '🔵' },
    { company: 'Microsoft', position: 'Full Stack Engineer', status: 'Interview', time: '1 day ago', logo: '🟦' },
    { company: 'Apple', position: 'iOS Developer', status: 'Applied', time: '2 days ago', logo: '⚫' },
    { company: 'Meta', position: 'React Developer', status: 'Reviewing', time: '3 days ago', logo: '🔷' },
    { company: 'Netflix', position: 'Frontend Engineer', status: 'Applied', time: '4 days ago', logo: '🔴' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your AI agent's performance and job application progress</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-xs text-green-600">{stat.change}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Applications</h2>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{app.logo}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{app.position}</div>
                      <div className="text-sm text-gray-600">{app.company}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Interview' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{app.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Agent Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">AI Agent Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Job Discovery</span>
                </div>
                <span className="text-xs text-green-600">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Form Filling</span>
                </div>
                <span className="text-xs text-blue-600">Ready</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Notifications</span>
                </div>
                <span className="text-xs text-purple-600">Active</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="text-blue-600" size={16} />
                <span className="text-sm font-medium text-blue-900">Next Action</span>
              </div>
              <p className="text-xs text-blue-700">
                Reviewing 3 new job matches. You'll receive notifications within the next hour.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;