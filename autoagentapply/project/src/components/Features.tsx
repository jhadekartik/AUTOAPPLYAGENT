import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Bell, Shield, Zap, Target, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'Job Discovery Agent',
      description: 'Continuously scans LinkedIn, Indeed, and company sites for relevant opportunities matching your profile.',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['24/7 monitoring', 'Smart filtering', 'Real-time alerts']
    },
    {
      icon: Bell,
      title: 'Notification System',
      description: 'Get instant notifications when perfect matches are found, with simple YES/NO response options.',
      color: 'from-indigo-500 to-purple-500',
      benefits: ['Email alerts', 'SMS notifications', 'One-click responses']
    },
    {
      icon: Shield,
      title: 'Secure Profile Manager',
      description: 'Your personal data, resumes, and preferences stored securely in the cloud, always ready for applications.',
      color: 'from-purple-500 to-pink-500',
      benefits: ['Encrypted storage', 'Version control', 'Easy updates']
    },
    {
      icon: Zap,
      title: 'Auto Form Filling',
      description: 'Automatically fills out job applications within 60 seconds using your stored profile information.',
      color: 'from-pink-500 to-red-500',
      benefits: ['Lightning fast', 'Error-free', 'Document upload']
    },
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'AI analyzes job requirements against your skills, experience, and preferences for perfect matches.',
      color: 'from-red-500 to-orange-500',
      benefits: ['95% accuracy', 'Skill matching', 'Salary filtering']
    },
    {
      icon: CheckCircle,
      title: 'Application Tracking',
      description: 'Complete confirmation system with screenshots and email receipts for every submitted application.',
      color: 'from-orange-500 to-yellow-500',
      benefits: ['Visual proof', 'Status tracking', 'Follow-up reminders']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful AI Agents
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Working For You
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our suite of specialized AI agents handles every aspect of your job search, 
            from discovery to application submission, so you can focus on what matters most.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="text-white" size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              
              <div className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How AutoApply.AI Works
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Setup Profile', desc: 'Upload your resume and set preferences' },
              { step: '02', title: 'AI Discovery', desc: 'Our agents find matching opportunities' },
              { step: '03', title: 'Get Notified', desc: 'Receive alerts for perfect matches' },
              { step: '04', title: 'Auto Apply', desc: 'Applications submitted in 60 seconds' }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
                
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 text-gray-300" size={24} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
          <p className="text-gray-500 mt-4">No credit card required • 14-day free trial</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;