// Mock data for the application
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password', role: 'job_seeker' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password', role: 'recruiter' }
];

const mockResumes = [
    {
        id: 1,
        userId: 1,
        title: 'Software Developer Resume',
        fileName: 'john_doe_resume.pdf',
        uploadDate: '2025-05-15',
        targetJob: 'Software Developer',
        overallScore: 85,
        categoryScores: {
            content: 80,
            format: 90,
            skills: 75,
            impact: 65
        },
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'Git', 'HTML', 'CSS'],
        suggestions: [
            { category: 'content', text: 'Add more quantifiable achievements to your work experience' },
            { category: 'impact', text: 'Use more action verbs at the beginning of bullet points' },
            { category: 'skills', text: 'Consider adding more backend technologies to your skills section' }
        ]
    },
    {
        id: 2,
        userId: 1,
        title: 'Data Scientist Resume',
        fileName: 'john_doe_data_resume.pdf',
        uploadDate: '2025-05-10',
        targetJob: 'Data Scientist',
        overallScore: 78,
        categoryScores: {
            content: 75,
            format: 85,
            skills: 80,
            impact: 60
        },
        skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Visualization', 'Pandas', 'NumPy', 'Scikit-learn'],
        suggestions: [
            { category: 'content', text: 'Highlight more data-driven projects in your experience section' },
            { category: 'format', text: 'Consider reorganizing your skills section for better readability' },
            { category: 'impact', text: 'Quantify the impact of your data analysis projects' }
        ]
    }
];

const mockJobs = [
    {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        description: 'We are looking for a Senior Software Engineer to join our growing team. You will be responsible for developing high-quality applications, collaborating with cross-functional teams, and mentoring junior developers.',
        requirements: [
            'Bachelor\'s degree in Computer Science or related field',
            '5+ years of experience in software development',
            'Strong proficiency in JavaScript, React, and Node.js',
            'Experience with MongoDB or similar NoSQL databases',
            'Knowledge of software design patterns and best practices'
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'AWS', 'Microservices'],
        postedDate: '2025-05-01',
        matchScore: 92
    },
    {
        id: 2,
        title: 'Full Stack Developer',
        company: 'WebSolutions Co.',
        location: 'Remote',
        description: 'WebSolutions is seeking a Full Stack Developer to help build and maintain our web applications. You will work on both frontend and backend development, implement new features, and ensure high performance and responsiveness.',
        requirements: [
            'Bachelor\'s degree in Computer Science or equivalent experience',
            '3+ years of experience in full stack development',
            'Proficiency in JavaScript, HTML, CSS, and modern frameworks',
            'Experience with RESTful APIs and database design',
            'Strong problem-solving skills and attention to detail'
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'HTML', 'CSS', 'RESTful API'],
        postedDate: '2025-05-05',
        matchScore: 85
    },
    {
        id: 3,
        title: 'Data Scientist',
        company: 'DataInsights Analytics',
        location: 'Boston, MA',
        description: 'DataInsights is looking for a Data Scientist to join our analytics team. You will analyze large datasets, develop predictive models, and communicate insights to stakeholders.',
        requirements: [
            'Master\'s or PhD in Statistics, Computer Science, or related field',
            '3+ years of experience in data science or analytics',
            'Strong programming skills in Python or R',
            'Experience with machine learning algorithms and statistical analysis',
            'Excellent communication and presentation skills'
        ],
        skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistical Analysis'],
        postedDate: '2025-05-08',
        matchScore: 80
    },
    {
        id: 4,
        title: 'Frontend Developer',
        company: 'UX Masters',
        location: 'New York, NY',
        description: 'UX Masters is seeking a talented Frontend Developer to create beautiful, responsive user interfaces. You will work closely with designers and backend developers to implement engaging user experiences.',
        requirements: [
            'Bachelor\'s degree in Computer Science or related field',
            '2+ years of experience in frontend development',
            'Proficiency in HTML, CSS, JavaScript, and React',
            'Experience with responsive design and cross-browser compatibility',
            'Eye for design and attention to detail'
        ],
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design', 'UI/UX'],
        postedDate: '2025-05-10',
        matchScore: 75
    },
    {
        id: 5,
        title: 'Backend Developer',
        company: 'ServerLogic Systems',
        location: 'Austin, TX',
        description: 'ServerLogic is looking for a Backend Developer to design and implement server-side applications. You will work on API development, database design, and system architecture.',
        requirements: [
            'Bachelor\'s degree in Computer Science or equivalent experience',
            '3+ years of experience in backend development',
            'Proficiency in Node.js, Express, and MongoDB',
            'Experience with RESTful API design and implementation',
            'Knowledge of security best practices'
        ],
        skills: ['Node.js', 'Express', 'MongoDB', 'RESTful API', 'Database Design', 'Security'],
        postedDate: '2025-05-12',
        matchScore: 70
    }
];

// Application state
let currentUser = null;
let userResumes = [];
let userJobs = [];
let recentActivity = [];

// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');
const mainContainer = document.getElementById('mainContainer');
const headerButtons = document.getElementById('headerButtons');
const userName = document.getElementById('userName');
const resumesList = document.getElementById('resumesList');
const jobsList = document.getElementById('jobsList');
const resumeOverview = document.getElementById('resumeOverview');
const jobMatchesOverview = document.getElementById('jobMatchesOverview');
const recentActivityList = document.getElementById('recentActivity');
const suggestionsList = document.getElementById('suggestionsList');
const skillsList = document.getElementById('skillsList');
const jobSuggestionsList = document.getElementById('jobSuggestionsList');
const skillsMatchContainer = document.getElementById('skillsMatchContainer');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('registerBtn').addEventListener('click', showRegisterForm);
    document.getElementById('backToLoginBtn').addEventListener('click', showLoginForm);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Logout
    document.getElementById('headerButtons').addEventListener('click', (e) => {
        if (e.target.id === 'logoutBtn') {
            handleLogout();
        }
    });
    
    // Resume upload
    document.getElementById('uploadResumeBtn').addEventListener('click', showResumeUploadModal);
    document.getElementById('quickUploadBtn').addEventListener('click', showResumeUploadModal);
    document.getElementById('newResumeBtn').addEventListener('click', showResumeUploadModal);
    document.getElementById('submitResumeBtn').addEventListener('click', handleResumeUpload);
    
    // Resume analysis
    document.getElementById('quickAnalyzeBtn').addEventListener('click', () => {
        if (userResumes.length > 0) {
            showResumeAnalysis(userResumes[0]);
        } else {
            showResumeUploadModal();
        }
    });
    
    // Job matching
    document.getElementById('findJobsBtn').addEventListener('click', showJobMatches);
    document.getElementById('quickMatchBtn').addEventListener('click', showJobMatches);
    document.getElementById('findMatchesBtn').addEventListener('click', () => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('resumeAnalysisModal'));
        if (modal) modal.hide();
        document.getElementById('jobs-tab').click();
    });
    
    // Job filtering
    document.getElementById('jobFilterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        filterJobs();
    });
    
    // Profile forms
    document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);
    document.getElementById('passwordForm').addEventListener('submit', handlePasswordChange);
    document.getElementById('preferencesForm').addEventListener('submit', handlePreferencesUpdate);
});

// Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Find user in mock data
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        loadUserData();
        showMainContainer();
        addRecentActivity('Logged in successfully');
    } else {
        alert('Invalid email or password');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === email)) {
        alert('Email already registered');
        return;
    }
    
    // Create new user
    const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        password,
        role
    };
    
    mockUsers.push(newUser);
    currentUser = newUser;
    loadUserData();
    showMainContainer();
    addRecentActivity('Account created successfully');
}

function handleLogout() {
    currentUser = null;
    userResumes = [];
    userJobs = [];
    recentActivity = [];
    showLoginContainer();
}

// UI Functions
function showLoginForm() {
    loginContainer.classList.remove('hidden');
    registerContainer.classList.add('hidden');
    mainContainer.classList.add('hidden');
}

function showRegisterForm() {
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
    mainContainer.classList.add('hidden');
}

function showMainContainer() {
    loginContainer.classList.add('hidden');
    registerContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    
    // Update header
    headerButtons.innerHTML = `
        <button id="logoutBtn" class="btn btn-outline-light">Logout</button>
    `;
    
    // Update user name
    userName.textContent = currentUser.name;
    
    // Update profile form
    document.getElementById('profileName').value = currentUser.name;
    document.getElementById('profileEmail').value = currentUser.email;
}

function showLoginContainer() {
    loginContainer.classList.remove('hidden');
    registerContainer.classList.add('hidden');
    mainContainer.classList.add('hidden');
    
    // Clear login form
    document.getElementById('loginForm').reset();
}

// Data Loading Functions
function loadUserData() {
    // Load user resumes
    userResumes = mockResumes.filter(r => r.userId === currentUser.id);
    
    // Load job matches based on user role
    if (currentUser.role === 'job_seeker') {
        userJobs = mockJobs.sort((a, b) => b.matchScore - a.matchScore);
    } else {
        // For recruiters, we would load different data
        userJobs = mockJobs;
    }
    
    // Update UI
    updateResumesUI();
    updateJobsUI();
    updateDashboardUI();
}

function updateResumesUI() {
    if (userResumes.length === 0) {
        resumesList.innerHTML = `
            <div class="alert alert-info">
                You haven't uploaded any resumes yet. Click the "Upload New Resume" button to get started.
            </div>
        `;
        return;
    }
    
    let html = '';
    userResumes.forEach(resume => {
        const scoreClass = getScoreClass(resume.overallScore);
        
        html += `
            <div class="card resume-card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title">${resume.title}</h5>
                        <span class="score-badge ${scoreClass}">${resume.overallScore}%</span>
                    </div>
                    <p class="card-text text-muted">Uploaded on ${resume.uploadDate}</p>
                    <p class="card-text">Target Job: ${resume.targetJob || 'Not specified'}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <span class="badge bg-secondary me-1">${resume.skills.length} Skills</span>
                            <span class="badge bg-secondary">${resume.suggestions.length} Suggestions</span>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary view-resume" data-id="${resume.id}">View Analysis</button>
                            <button class="btn btn-sm btn-outline-primary find-matches" data-id="${resume.id}">Find Matches</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    resumesList.innerHTML = html;
    
    // Add event listeners
    document.querySelectorAll('.view-resume').forEach(btn => {
        btn.addEventListener('click', () => {
            const resumeId = parseInt(btn.getAttribute('data-id'));
            const resume = userResumes.find(r => r.id === resumeId);
            showResumeAnalysis(resume);
        });
    });
    
    document.querySelectorAll('.find-matches').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('jobs-tab').click();
        });
    });
}

function updateJobsUI() {
    if (userJobs.length === 0) {
        jobsList.innerHTML = `
            <div class="alert alert-info">
                No job matches found. Try uploading a resume or adjusting your search criteria.
            </div>
        `;
        return;
    }
    
    let html = '';
    userJobs.forEach(job => {
        const scoreClass = getScoreClass(job.matchScore);
        
        html += `
            <div class="card job-card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title">${job.title}</h5>
                        <span class="match-badge ${scoreClass}">${job.matchScore}% Match</span>
                    </div>
                    <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
                    <p class="card-text"><i class="bi bi-geo-alt"></i> ${job.location}</p>
                    <p class="card-text text-muted">Posted on ${job.postedDate}</p>
                    <div class="d-flex flex-wrap mb-2">
                        ${job.skills.slice(0, 4).map(skill => `<span class="badge bg-light text-dark me-1 mb-1">${skill}</span>`).join('')}
                        ${job.skills.length > 4 ? `<span class="badge bg-light text-dark me-1 mb-1">+${job.skills.length - 4} more</span>` : ''}
                    </div>
                    <button class="btn btn-sm btn-primary view-job" data-id="${job.id}">View Details</button>
                </div>
            </div>
        `;
    });
    
    jobsList.innerHTML = html;
    
    // Add event listeners
    document.querySelectorAll('.view-job').forEach(btn => {
        btn.addEventListener('click', () => {
            const jobId = parseInt(btn.getAttribute('data-id'));
            const job = userJobs.find(j => j.id === jobId);
            showJobDetails(job);
        });
    });
}

function updateDashboardUI() {
    // Update resume overview
    if (userResumes.length === 0) {
        resumeOverview.innerHTML = `
            <p>You haven't uploaded any resumes yet.</p>
            <button class="btn btn-primary" id="dashboardUploadBtn">Upload Resume</button>
        `;
        document.getElementById('dashboardUploadBtn').addEventListener('click', showResumeUploadModal);
    } else {
        const latestResume = userResumes[0];
        const scoreClass = getScoreClass(latestResume.overallScore);
        
        resumeOverview.innerHTML = `
            <h5>${latestResume.title}</h5>
            <div class="d-flex align-items-center mb-2">
                <span class="score-badge ${scoreClass} me-2">${latestResume.overallScore}%</span>
                <span>Overall Score</span>
            </div>
            <p class="mb-2">Uploaded on ${latestResume.uploadDate}</p>
            <button class="btn btn-sm btn-primary view-resume-dashboard" data-id="${latestResume.id}">View Analysis</button>
        `;
        
        document.querySelector('.view-resume-dashboard').addEventListener('click', () => {
            showResumeAnalysis(latestResume);
        });
    }
    
    // Update job matches overview
    if (userJobs.length === 0) {
        jobMatchesOverview.innerHTML = `
            <p>No job matches available yet.</p>
            <button class="btn btn-primary" id="dashboardFindJobsBtn">Find Jobs</button>
        `;
        document.getElementById('dashboardFindJobsBtn').addEventListener('click', showJobMatches);
    } else {
        const topJobs = userJobs.slice(0, 3);
        let jobsHtml = '<ul class="list-group">';
        
        topJobs.forEach(job => {
            const scoreClass = getScoreClass(job.matchScore);
            jobsHtml += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${job.title}</strong>
                        <div class="text-muted small">${job.company}</div>
                    </div>
                    <span class="match-badge ${scoreClass}">${job.matchScore}%</span>
                </li>
            `;
        });
        
        jobsHtml += '</ul>';
        jobsHtml += `
            <div class="mt-2">
                <button class="btn btn-sm btn-primary" id="dashboardViewAllJobsBtn">View All Matches</button>
            </div>
        `;
        
        jobMatchesOverview.innerHTML = jobsHtml;
        
        document.getElementById('dashboardViewAllJobsBtn').addEventListener('click', () => {
            document.getElementById('jobs-tab').click();
        });
    }
    
    // Update recent activity
    updateRecentActivityUI();
}

function updateRecentActivityUI() {
    if (recentActivity.length === 0) {
        recentActivityList.innerHTML = `<li class="list-group-item">No recent activity</li>`;
        return;
    }
    
    let html = '';
    recentActivity.forEach(activity => {
        html += `<li class="list-group-item">${activity.text} <span class="text-muted float-end small">${activity.time}</span></li>`;
    });
    
    recentActivityList.innerHTML = html;
}

// Resume Functions
function showResumeUploadModal() {
    // Reset form
    document.getElementById('resumeUploadForm').reset();
    
    // Show modal
    const modalElement = document.getElementById('resumeUploadModal');
    const resumeUploadModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    resumeUploadModal.show();
}

function handleResumeUpload() {
    const title = document.getElementById('resumeTitle').value;
    const file = document.getElementById('resumeFile').files[0];
    const targetJob = document.getElementById('jobTarget').value;
    
    if (!title || !file) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create new resume object
    const newResume = {
        id: mockResumes.length + 1,
        userId: currentUser.id,
        title: title,
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        targetJob: targetJob,
        overallScore: Math.floor(Math.random() * 30) + 65, // Random score between 65-95
        categoryScores: {
            content: Math.floor(Math.random() * 30) + 65,
            format: Math.floor(Math.random() * 30) + 65,
            skills: Math.floor(Math.random() * 30) + 65,
            impact: Math.floor(Math.random() * 30) + 65
        },
        skills: getRandomSkills(),
        suggestions: getRandomSuggestions()
    };
    
    // Add to mock data
    mockResumes.unshift(newResume);
    userResumes.unshift(newResume);
    
    // Close modal
    const modalElement = document.getElementById('resumeUploadModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
    
    // Update UI
    updateResumesUI();
    updateDashboardUI();
    
    // Show analysis
    setTimeout(() => {
        showResumeAnalysis(newResume);
        addRecentActivity(`Uploaded and analyzed resume: ${newResume.title}`);
    }, 500);
}

function showResumeAnalysis(resume) {
    // Update modal content
    document.getElementById('analysisResumeTitle').textContent = resume.title;
    document.getElementById('analysisScore').textContent = `${resume.overallScore}%`;
    
    // Update category scores
    document.getElementById('contentScore').style.width = `${resume.categoryScores.content}%`;
    document.getElementById('formatScore').style.width = `${resume.categoryScores.format}%`;
    document.getElementById('skillsScore').style.width = `${resume.categoryScores.skills}%`;
    document.getElementById('impactScore').style.width = `${resume.categoryScores.impact}%`;
    
    // Update suggestions
    let suggestionsHtml = '';
    resume.suggestions.forEach(suggestion => {
        suggestionsHtml += `
            <div class="suggestion-item">
                <strong>${getCategoryName(suggestion.category)}</strong>
                <p>${suggestion.text}</p>
            </div>
        `;
    });
    suggestionsList.innerHTML = suggestionsHtml;
    
    // Update skills
    let skillsHtml = '';
    resume.skills.forEach(skill => {
        skillsHtml += `<span class="badge bg-light text-dark me-1 mb-1">${skill}</span>`;
    });
    skillsList.innerHTML = skillsHtml;
    
    // Show modal
    const modalElement = document.getElementById('resumeAnalysisModal');
    const resumeAnalysisModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    resumeAnalysisModal.show();
    
    addRecentActivity(`Viewed analysis for resume: ${resume.title}`);
}

// Job Functions
function showJobMatches() {
    document.getElementById('jobs-tab').click();
    addRecentActivity('Searched for job matches');
}

function filterJobs() {
    const titleFilter = document.getElementById('jobTitle').value.toLowerCase();
    const locationFilter = document.getElementById('location').value.toLowerCase();
    const scoreFilter = parseInt(document.getElementById('matchScore').value);
    
    const filteredJobs = mockJobs.filter(job => {
        const titleMatch = job.title.toLowerCase().includes(titleFilter) || titleFilter === '';
        const locationMatch = job.location.toLowerCase().includes(locationFilter) || locationFilter === '';
        const scoreMatch = job.matchScore >= scoreFilter;
        
        return titleMatch && locationMatch && scoreMatch;
    });
    
    userJobs = filteredJobs.sort((a, b) => b.matchScore - a.matchScore);
    updateJobsUI();
    
    addRecentActivity('Applied job filters');
}

function showJobDetails(job) {
    // Update modal content
    document.getElementById('jobDetailsModalLabel').textContent = job.title;
    document.getElementById('jobTitle').textContent = job.title;
    document.getElementById('jobCompany').textContent = job.company;
    document.getElementById('jobLocation').textContent = job.location;
    document.getElementById('jobMatchScore').textContent = `${job.matchScore}%`;
    
    // Update job description
    document.getElementById('jobDescription').innerHTML = `<p>${job.description}</p>`;
    
    // Update requirements
    let requirementsHtml = '<ul>';
    job.requirements.forEach(req => {
        requirementsHtml += `<li>${req}</li>`;
    });
    requirementsHtml += '</ul>';
    document.getElementById('jobRequirements').innerHTML = requirementsHtml;
    
    // Update skills match
    let skillsMatchHtml = '';
    
    if (userResumes.length > 0) {
        const userSkills = userResumes[0].skills;
        
        job.skills.forEach(skill => {
            const isMatch = userSkills.includes(skill);
            const matchClass = isMatch ? 'bg-success' : 'bg-secondary';
            const matchText = isMatch ? 'Match' : 'Missing';
            
            skillsMatchHtml += `
                <div class="col-md-6 mb-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <span>${skill}</span>
                        <span class="badge ${matchClass}">${matchText}</span>
                    </div>
                </div>
            `;
        });
    } else {
        skillsMatchHtml = '<div class="col-12"><p>Upload a resume to see skills matching</p></div>';
    }
    
    skillsMatchContainer.innerHTML = skillsMatchHtml;
    
    // Update job suggestions
    let jobSuggestionsHtml = '';
    
    if (userResumes.length > 0) {
        const matchingSkills = userResumes[0].skills.filter(skill => job.skills.includes(skill));
        const missingSkills = job.skills.filter(skill => !userResumes[0].skills.includes(skill));
        
        if (missingSkills.length > 0) {
            jobSuggestionsHtml += `
                <div class="suggestion-item">
                    <strong>Add Missing Skills</strong>
                    <p>Consider adding these skills to your resume: ${missingSkills.join(', ')}</p>
                </div>
            `;
        }
        
        jobSuggestionsHtml += `
            <div class="suggestion-item">
                <strong>Highlight Matching Skills</strong>
                <p>Emphasize these matching skills in your resume: ${matchingSkills.join(', ')}</p>
            </div>
            
            <div class="suggestion-item">
                <strong>Tailor Your Resume</strong>
                <p>Customize your resume to highlight experience relevant to ${job.title} roles</p>
            </div>
        `;
    } else {
        jobSuggestionsHtml = '<p>Upload a resume to get personalized suggestions</p>';
    }
    
    jobSuggestionsList.innerHTML = jobSuggestionsHtml;
    
    // Show modal
    const modalElement = document.getElementById('jobDetailsModal');
    const jobDetailsModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    jobDetailsModal.show();
    
    addRecentActivity(`Viewed job details: ${job.title} at ${job.company}`);
}

// Profile Functions
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const name = document.getElementById('profileName').value;
    const phone = document.getElementById('profilePhone').value;
    const location = document.getElementById('profileLocation').value;
    
    // Update user data
    currentUser.name = name;
    currentUser.phone = phone;
    currentUser.location = location;
    
    // Update UI
    userName.textContent = name;
    
    alert('Profile updated successfully');
    addRecentActivity('Updated profile information');
}

function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate current password
    if (currentPassword !== currentUser.password) {
        alert('Current password is incorrect');
        return;
    }
    
    // Validate new password
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    // Update password
    currentUser.password = newPassword;
    
    // Reset form
    document.getElementById('passwordForm').reset();
    
    alert('Password changed successfully');
    addRecentActivity('Changed account password');
}

function handlePreferencesUpdate(e) {
    e.preventDefault();
    
    const notifications = document.getElementById('jobNotifications').value;
    const emailUpdates = document.getElementById('emailUpdates').checked;
    
    // Update user preferences
    currentUser.preferences = {
        jobNotifications: notifications,
        emailUpdates: emailUpdates
    };
    
    alert('Preferences updated successfully');
    addRecentActivity('Updated notification preferences');
}

// Utility Functions
function getScoreClass(score) {
    if (score >= 90) return 'bg-success text-white';
    if (score >= 70) return 'bg-primary text-white';
    if (score >= 50) return 'bg-warning text-dark';
    return 'bg-danger text-white';
}

function getCategoryName(category) {
    switch (category) {
        case 'content': return 'Content Quality';
        case 'format': return 'Format & Structure';
        case 'skills': return 'Skills Relevance';
        case 'impact': return 'Impact Statements';
        default: return category;
    }
}

function addRecentActivity(text) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    recentActivity.unshift({
        text: text,
        time: timeString
    });
    
    // Keep only the last 10 activities
    if (recentActivity.length > 10) {
        recentActivity.pop();
    }
    
    updateRecentActivityUI();
}

function getRandomSkills() {
    const allSkills = [
        'JavaScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 
        'MongoDB', 'MySQL', 'PostgreSQL', 'GraphQL', 'REST API', 'HTML', 
        'CSS', 'Sass', 'Less', 'Bootstrap', 'Tailwind CSS', 'Material UI',
        'Git', 'GitHub', 'GitLab', 'CI/CD', 'Docker', 'Kubernetes',
        'AWS', 'Azure', 'Google Cloud', 'Serverless', 'Microservices',
        'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'C#', '.NET',
        'PHP', 'Laravel', 'Ruby', 'Ruby on Rails', 'Go', 'Rust',
        'TypeScript', 'Redux', 'MobX', 'RxJS', 'Jest', 'Mocha', 'Chai',
        'Cypress', 'Selenium', 'Webpack', 'Babel', 'ESLint', 'Prettier',
        'Agile', 'Scrum', 'Kanban', 'JIRA', 'Confluence', 'Trello',
        'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator',
        'UI/UX Design', 'Responsive Design', 'Mobile Development',
        'React Native', 'Flutter', 'Swift', 'Kotlin', 'Android', 'iOS',
        'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch',
        'NLP', 'Computer Vision', 'Big Data', 'Hadoop', 'Spark',
        'R', 'Data Visualization', 'D3.js', 'Tableau', 'Power BI',
        'SQL', 'NoSQL', 'Redis', 'Elasticsearch', 'Cassandra',
        'Linux', 'Unix', 'Bash', 'Shell Scripting', 'Networking',
        'Security', 'Authentication', 'Authorization', 'OAuth',
        'JWT', 'Blockchain', 'Smart Contracts', 'Solidity',
        'WebSockets', 'WebRTC', 'PWA', 'Service Workers',
        'SEO', 'Analytics', 'Google Analytics', 'A/B Testing',
        'Performance Optimization', 'Accessibility', 'Internationalization',
        'Localization', 'Content Management', 'WordPress', 'Drupal',
        'E-commerce', 'Shopify', 'WooCommerce', 'Magento',
        'Payment Integration', 'Stripe', 'PayPal', 'Social Media Integration',
        'Email Marketing', 'Mailchimp', 'SendGrid', 'Twilio'
    ];
    
    // Shuffle and take random number of skills
    const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 10) + 5);
}

function getRandomSuggestions() {
    const contentSuggestions = [
        'Add more quantifiable achievements to your work experience',
        'Include more specific technical details about your projects',
        'Highlight leadership roles and responsibilities more clearly',
        'Add relevant certifications or professional development',
        'Include a summary section that highlights your key qualifications'
    ];
    
    const formatSuggestions = [
        'Improve the overall layout for better readability',
        'Use consistent formatting for dates and section headers',
        'Consider reorganizing sections to highlight strengths',
        'Use bullet points consistently throughout the document',
        'Ensure proper spacing between sections for better readability'
    ];
    
    const skillsSuggestions = [
        'Add more technical skills relevant to your target job',
        'Organize skills by category for better readability',
        'Remove outdated or irrelevant skills',
        'Add proficiency levels to your skills section',
        'Include both technical and soft skills'
    ];
    
    const impactSuggestions = [
        'Use more action verbs at the beginning of bullet points',
        'Quantify your achievements with specific metrics',
        'Focus on results rather than just responsibilities',
        'Highlight the impact of your work on the organization',
        'Include specific examples of problems you solved'
    ];
    
    const suggestions = [];
    
    // Add 1-2 suggestions from each category
    suggestions.push({ category: 'content', text: contentSuggestions[Math.floor(Math.random() * contentSuggestions.length)] });
    if (Math.random() > 0.5) {
        suggestions.push({ category: 'content', text: contentSuggestions[Math.floor(Math.random() * contentSuggestions.length)] });
    }
    
    suggestions.push({ category: 'format', text: formatSuggestions[Math.floor(Math.random() * formatSuggestions.length)] });
    if (Math.random() > 0.5) {
        suggestions.push({ category: 'format', text: formatSuggestions[Math.floor(Math.random() * formatSuggestions.length)] });
    }
    
    suggestions.push({ category: 'skills', text: skillsSuggestions[Math.floor(Math.random() * skillsSuggestions.length)] });
    if (Math.random() > 0.5) {
        suggestions.push({ category: 'skills', text: skillsSuggestions[Math.floor(Math.random() * skillsSuggestions.length)] });
    }
    
    suggestions.push({ category: 'impact', text: impactSuggestions[Math.floor(Math.random() * impactSuggestions.length)] });
    if (Math.random() > 0.5) {
        suggestions.push({ category: 'impact', text: impactSuggestions[Math.floor(Math.random() * impactSuggestions.length)] });
    }
    
    return suggestions;
}