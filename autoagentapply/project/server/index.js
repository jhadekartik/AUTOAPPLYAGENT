import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import puppeteer from 'puppeteer';
import fs from 'fs/promises';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AutoApply.AI Backend is running!' });
});

// Job Discovery Agent endpoint
app.get('/api/jobs/discover', async (req, res) => {
  try {
    // Simulate job discovery
    const mockJobs = [
      {
        id: 1,
        company: 'Google',
        position: 'Senior Frontend Developer',
        location: 'Mountain View, CA',
        salary: '$140k - $180k',
        match: 95,
        description: 'Looking for an experienced React developer to join our Chrome team...',
        requirements: ['React', 'TypeScript', '5+ years experience'],
        posted: new Date().toISOString()
      },
      {
        id: 2,
        company: 'Microsoft',
        position: 'Full Stack Engineer',
        location: 'Seattle, WA',
        salary: '$130k - $170k',
        match: 88,
        description: 'Join our Azure team to build next-generation cloud solutions...',
        requirements: ['Node.js', 'React', 'Azure', '3+ years experience'],
        posted: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      jobs: mockJobs,
      total: mockJobs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to discover jobs'
    });
  }
});

// Resume Generation Agent endpoint
app.post('/api/resume/generate', async (req, res) => {
  try {
    const { userId, profileData, paymentId } = req.body;
    
    // Verify payment (in real implementation, verify with payment gateway)
    if (!paymentId) {
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed'
      });
    }

    // Generate HTML template for resume
    const resumeHTML = generateResumeHTML(profileData);
    
    // Convert HTML to PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(resumeHTML, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    await browser.close();
    
    // Save PDF temporarily (in production, save to cloud storage)
    const fileName = `resume_${userId}_${Date.now()}.pdf`;
    const filePath = join(__dirname, 'temp', fileName);
    
    // Ensure temp directory exists
    await fs.mkdir(join(__dirname, 'temp'), { recursive: true });
    await fs.writeFile(filePath, pdfBuffer);
    
    // Generate download URL
    const downloadUrl = `/api/resume/download/${fileName}`;
    
    res.json({
      success: true,
      downloadUrl,
      fileName,
      message: 'Resume generated successfully'
    });
    
  } catch (error) {
    console.error('Resume generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate resume'
    });
  }
});

// Resume download endpoint
app.get('/api/resume/download/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = join(__dirname, 'temp', fileName);
    
    // Check if file exists
    await fs.access(filePath);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    const fileBuffer = await fs.readFile(filePath);
    res.send(fileBuffer);
    
    // Clean up file after download (optional)
    setTimeout(async () => {
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.error('Error cleaning up file:', error);
      }
    }, 60000); // Delete after 1 minute
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(404).json({
      success: false,
      error: 'File not found'
    });
  }
});

// Payment processing endpoint (mock)
app.post('/api/payment/process', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    
    // Mock payment processing
    // In real implementation, integrate with Razorpay, Stripe, etc.
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    res.json({
      success: true,
      paymentId,
      amount,
      currency,
      status: 'completed',
      message: 'Payment processed successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Payment processing failed'
    });
  }
});

// Notification Agent endpoint
app.post('/api/notifications/send', async (req, res) => {
  try {
    const { jobId, userId, type } = req.body;
    
    // Simulate sending notification
    console.log(`Sending ${type} notification for job ${jobId} to user ${userId}`);
    
    res.json({
      success: true,
      message: 'Notification sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to send notification'
    });
  }
});

// Form Filling Agent endpoint
app.post('/api/applications/submit', async (req, res) => {
  try {
    const { jobId, userId, applicationData } = req.body;
    
    // Simulate form filling and submission
    console.log(`Submitting application for job ${jobId} by user ${userId}`);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    res.json({
      success: true,
      applicationId: `app_${Date.now()}`,
      message: 'Application submitted successfully',
      submittedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to submit application'
    });
  }
});

// Dashboard stats endpoint
app.get('/api/dashboard/stats/:userId', (req, res) => {
  try {
    const mockStats = {
      applicationsSent: 47,
      responseRate: 23,
      activeJobs: 156,
      interviews: 8,
      recentApplications: [
        {
          company: 'Google',
          position: 'Senior Frontend Developer',
          status: 'Applied',
          time: '2 hours ago'
        },
        {
          company: 'Microsoft',
          position: 'Full Stack Engineer',
          status: 'Interview',
          time: '1 day ago'
        }
      ]
    };
    
    res.json({
      success: true,
      stats: mockStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard stats'
    });
  }
});

// Helper function to generate resume HTML
function generateResumeHTML(profileData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Resume - ${profileData.first_name} ${profileData.last_name}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .name {
          font-size: 32px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        .contact {
          font-size: 14px;
          color: #666;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 20px;
          font-weight: bold;
          color: #2563eb;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill-tag {
          background: #eff6ff;
          color: #2563eb;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        .experience-item {
          margin-bottom: 20px;
        }
        .job-title {
          font-size: 16px;
          font-weight: bold;
          color: #1f2937;
        }
        .company {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 5px;
        }
        .preferences {
          background: #f9fafb;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${profileData.first_name} ${profileData.last_name}</div>
        <div class="contact">
          ${profileData.email} | ${profileData.phone} | ${profileData.location}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Professional Summary</div>
        <p>${profileData.current_position} with ${profileData.experience_level.toLowerCase()} of experience. 
        Passionate about delivering high-quality solutions and driving innovation in technology.</p>
      </div>

      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills">
          ${profileData.skills.split(',').map(skill => 
            `<span class="skill-tag">${skill.trim()}</span>`
          ).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Experience</div>
        <div class="experience-item">
          <div class="job-title">${profileData.current_position}</div>
          <div class="company">Current Position</div>
          <p>Experienced professional with expertise in ${profileData.skills.split(',').slice(0, 3).join(', ')}.</p>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Job Preferences</div>
        <div class="preferences">
          <p><strong>Desired Salary:</strong> ${profileData.desired_salary || 'Negotiable'}</p>
          <p><strong>Work Type:</strong> ${profileData.work_type}</p>
          <p><strong>Job Type:</strong> ${profileData.job_type}</p>
          <p><strong>Experience Level:</strong> ${profileData.experience_level}</p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #9ca3af;">
        Generated by AutoApply.AI - Your Personal AI Job Application Agent
      </div>
    </body>
    </html>
  `;
}

app.listen(PORT, () => {
  console.log(`🚀 AutoApply.AI Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});