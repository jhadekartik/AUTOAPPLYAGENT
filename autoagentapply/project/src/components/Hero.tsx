import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Target, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mountain Peaks Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <svg
          className="absolute bottom-0 w-full h-96 text-blue-100"
          viewBox="0 0 1200 400"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,400 L0,200 L200,50 L400,150 L600,30 L800,120 L1000,80 L1200,160 L1200,400 Z" />
        </svg>
        <svg
          className="absolute bottom-0 w-full h-80 text-blue-200 opacity-80"
          viewBox="0 0 1200 320"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,320 L0,180 L150,80 L350,140 L550,60 L750,110 L950,90 L1200,140 L1200,320 Z" />
        </svg>
        <svg
          className="absolute bottom-0 w-full h-64 text-blue-300 opacity-60"
          viewBox="0 0 1200 256"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,256 L0,160 L100,100 L300,130 L500,80 L700,120 L900,100 L1200,130 L1200,256 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your AI-Powered
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Job Application
              </span>
              <span className="block">Agent</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionize your job search with AutoApply.AI - the autonomous agent that 
              discovers relevant opportunities, applies automatically, and maximizes your chances of landing interviews.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { icon: Target, value: '95%', label: 'Success Rate' },
              { icon: Clock, value: '24/7', label: 'Active Monitoring' },
              { icon: Zap, value: '10x', label: 'Faster Applications' },
            ].map((stat, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg">
                <stat.icon className="text-blue-600" size={24} />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your AI Agent</span>
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              className="bg-white/90 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Job Discovery',
                    description: 'AI scans thousands of job boards',
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    title: 'Smart Filtering',
                    description: 'Matches your skills & preferences',
                    color: 'from-indigo-500 to-purple-500'
                  },
                  {
                    title: 'Auto Application',
                    description: 'Applies within 60 seconds',
                    color: 'from-purple-500 to-pink-500'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      <div className="w-8 h-8 bg-white rounded-lg" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;