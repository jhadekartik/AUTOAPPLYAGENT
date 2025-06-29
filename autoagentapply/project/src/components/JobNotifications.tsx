import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, X, Clock, MapPin, DollarSign, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobNotifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      company: 'Google',
      position: 'Senior Frontend Developer',
      location: 'Mountain View, CA',
      salary: '$140k - $180k',
      match: 95,
      time: '2 minutes ago',
      status: 'pending',
      description: 'Looking for an experienced React developer to join our Chrome team...',
      logo: '🔵'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Full Stack Engineer',
      location: 'Seattle, WA',
      salary: '$130k - $170k',
      match: 88,
      time: '15 minutes ago',
      status: 'pending',
      description: 'Join our Azure team to build next-generation cloud solutions...',
      logo: '🟦'
    },
    {
      id: 3,
      company: 'Apple',
      position: 'iOS Developer',
      location: 'Cupertino, CA',
      salary: '$135k - $175k',
      match: 92,
      time: '1 hour ago',
      status: 'approved',
      description: 'Help us create amazing user experiences for millions of users...',
      logo: '⚫'
    },
    {
      id: 4,
      company: 'Meta',
      position: 'React Developer',
      location: 'Menlo Park, CA',
      salary: '$125k - $165k',
      match: 85,
      time: '3 hours ago',
      status: 'rejected',
      description: 'Build the future of social technology with React and GraphQL...',
      logo: '🔷'
    }
  ];

  const handleApprove = (id: number) => {
    console.log('Approved job:', id);
  };

  const handleReject = (id: number) => {
    console.log('Rejected job:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <Bell className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Job Notifications</h1>
          </div>
          <p className="text-gray-600">Review AI-discovered job opportunities and approve applications</p>
        </motion.div>

        <div className="space-y-6">
          {notifications.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                job.status === 'pending' ? 'border-yellow-400' :
                job.status === 'approved' ? 'border-green-400' :
                'border-red-400'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{job.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{job.position}</h3>
                    <p className="text-lg text-gray-700 font-medium">{job.company}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{job.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    job.match >= 90 ? 'bg-green-100 text-green-800' :
                    job.match >= 80 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {job.match}% Match
                  </div>
                  <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    job.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {job.status === 'pending' ? 'Awaiting Response' :
                     job.status === 'approved' ? 'Application Sent' :
                     'Declined'}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{job.description}</p>

              {job.status === 'pending' && (
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-medium">
                    Should I apply to this position for you?
                  </p>
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={() => handleReject(job.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={16} />
                      <span>No</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleApprove(job.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check size={16} />
                      <span>Yes, Apply</span>
                    </motion.button>
                  </div>
                </div>
              )}

              {job.status === 'approved' && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Check size={16} />
                    <span className="font-medium">Application submitted successfully!</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Your application was sent 2 hours ago. You'll receive updates on any responses.
                  </p>
                </div>
              )}

              {job.status === 'rejected' && (
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-700">
                    <X size={16} />
                    <span className="font-medium">Application declined</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    You chose not to apply to this position.
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Summary</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Jobs Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">Applications Sent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobNotifications;