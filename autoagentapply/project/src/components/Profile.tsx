import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Briefcase, Save, Upload, ArrowLeft, FileText, CreditCard, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resumeGenerating, setResumeGenerating] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: user?.email || '',
    phone: '',
    location: '',
    current_position: '',
    skills: '',
    experience_level: 'Mid Level (3-5 years)',
    desired_salary: '',
    work_type: 'Remote',
    job_type: 'Full-time',
    auto_apply: true,
    email_notifications: true,
    sms_alerts: false,
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfileData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || user?.email || '',
          phone: data.phone || '',
          location: data.location || '',
          current_position: data.current_position || '',
          skills: data.skills || '',
          experience_level: data.experience_level || 'Mid Level (3-5 years)',
          desired_salary: data.desired_salary || '',
          work_type: data.work_type || 'Remote',
          job_type: data.job_type || 'Full-time',
          auto_apply: data.auto_apply ?? true,
          email_notifications: data.email_notifications ?? true,
          sms_alerts: data.sms_alerts ?? false,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user?.id,
          ...profileData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error('Please upload a PDF or DOC file');
        return;
      }

      toast.success(`Resume uploaded: ${file.name}`);
    }
  };

  const handleGenerateResume = async () => {
    // Check if profile is complete
    const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'current_position', 'skills'];
    const missingFields = requiredFields.filter(field => !profileData[field as keyof typeof profileData]);
    
    if (missingFields.length > 0) {
      toast.error('Please complete your profile before generating resume');
      return;
    }

    setResumeGenerating(true);

    try {
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate resume generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('Resume generated successfully! Check your email for download link.');
      
      // In a real implementation, this would trigger the payment gateway
      // and then call the resume generation API
      
    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error('Failed to generate resume');
    } finally {
      setResumeGenerating(false);
    }
  };

  const isProfileComplete = () => {
    const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'current_position', 'skills'];
    return requiredFields.every(field => profileData[field as keyof typeof profileData]);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your information for AI-powered job applications</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profileData.first_name}
                    onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profileData.last_name}
                    onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="john.doe@example.com"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Position</label>
                <input
                  type="text"
                  value={profileData.current_position}
                  onChange={(e) => setProfileData({...profileData, current_position: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Senior Frontend Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <textarea
                  rows={3}
                  value={profileData.skills}
                  onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, Node.js, Python..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select 
                  value={profileData.experience_level}
                  onChange={(e) => setProfileData({...profileData, experience_level: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Entry Level (0-2 years)</option>
                  <option>Mid Level (3-5 years)</option>
                  <option>Senior Level (6-10 years)</option>
                  <option>Lead/Principal (10+ years)</option>
                </select>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Profile</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Resume Upload & Preferences */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Resume Upload */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resume</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-sm text-gray-600 mb-4">Upload your resume (PDF, DOC)</p>
                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors">
                  Choose File
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Resume Generation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">AI Resume Generator</h3>
              <div className="text-center">
                <FileText className="mx-auto text-blue-600 mb-4" size={48} />
                <p className="text-sm text-gray-600 mb-4">
                  Generate a professional PDF resume from your profile data
                </p>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center space-x-2 text-green-700 mb-2">
                    <CreditCard size={16} />
                    <span className="font-semibold">Only ₹1</span>
                  </div>
                  <p className="text-xs text-gray-600">One-time payment for instant PDF generation</p>
                </div>
                
                <motion.button
                  onClick={handleGenerateResume}
                  disabled={!isProfileComplete() || resumeGenerating}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isProfileComplete() ? 1.02 : 1 }}
                  whileTap={{ scale: isProfileComplete() ? 0.98 : 1 }}
                >
                  {resumeGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <FileText size={20} />
                      <span>Generate Resume for ₹1</span>
                    </>
                  )}
                </motion.button>
                
                {!isProfileComplete() && (
                  <p className="text-xs text-red-600 mt-2">
                    Complete your profile to generate resume
                  </p>
                )}
              </div>
            </div>

            {/* Job Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Job Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Desired Salary</label>
                  <input
                    type="text"
                    value={profileData.desired_salary}
                    onChange={(e) => setProfileData({...profileData, desired_salary: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="$120,000 - $150,000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
                  <select 
                    value={profileData.work_type}
                    onChange={(e) => setProfileData({...profileData, work_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                    <option>Any</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select 
                    value={profileData.job_type}
                    onChange={(e) => setProfileData({...profileData, job_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Any</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AI Agent Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">AI Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Auto-apply to matches</span>
                  <input 
                    type="checkbox" 
                    checked={profileData.auto_apply}
                    onChange={(e) => setProfileData({...profileData, auto_apply: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email notifications</span>
                  <input 
                    type="checkbox" 
                    checked={profileData.email_notifications}
                    onChange={(e) => setProfileData({...profileData, email_notifications: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">SMS alerts</span>
                  <input 
                    type="checkbox" 
                    checked={profileData.sms_alerts}
                    onChange={(e) => setProfileData({...profileData, sms_alerts: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;