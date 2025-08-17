// Immediate console log to verify script loading
console.log('=== MAIN-DASHBOARD.JS LOADING ===');
console.log('Script started loading at:', new Date().toISOString());

// Global state
let currentComponent = 'dashboard';
let sidebarCollapsed = false;

console.log('=== JAVASCRIPT FILE LOADED ===');
console.log('Global variables initialized');

// Very basic test function
function testBasicContentChange() {
    console.log('testBasicContentChange called');
    alert('Test function called!');

    const contentArea = document.getElementById('contentArea');
    console.log('contentArea found:', !!contentArea);

    if (contentArea) {
        contentArea.innerHTML = '<div style="background: green; color: white; padding: 40px; text-align: center; font-size: 24px;">✅ BASIC CONTENT CHANGE WORKS!</div>';
        alert('Content changed! Check if you see green box.');
    } else {
        alert('ERROR: contentArea not found!');
    }
}

// Make it global immediately
window.testBasicContentChange = testBasicContentChange;

// Component configurations
const components = {
    dashboard: {
        title: 'Dashboard',
        subtitle: 'Welcome back, John! Here\'s what\'s happening today.',
        content: null // Default dashboard content
    },

    payroll: {
        title: 'Payroll Management',
        subtitle: 'Manage employee salary and payroll information',
        content: 'payroll'
    },

    chat: {
        title: 'Chat & Messaging',
        subtitle: 'Real-time communication with colleagues and teams',
        content: 'chat'
    },
    'social-feed': {
        title: 'Social Feed',
        subtitle: 'Share updates and stay connected with your team',
        content: 'social-feed'
    },
    announcements: {
        title: 'Announcements',
        subtitle: 'Company news, updates, and important notices',
        content: 'announcements'
    },
    events: {
        title: 'Events Calendar',
        subtitle: 'Company events, meetings, and important dates',
        content: 'events'
    },
    polls: {
        title: 'Polls & Surveys',
        subtitle: 'Participate in company polls and share feedback',
        content: 'polls'
    },
    suggestions: {
        title: 'Suggestion Box',
        subtitle: 'Share ideas and suggestions to improve workplace',
        content: 'suggestions'
    },
    recognition: {
        title: 'Recognition',
        subtitle: 'Recognize and celebrate employee achievements',
        content: 'recognition'
    },

    live: {
        title: 'Attendance & Leave',
        subtitle: 'Track attendance and manage leave requests',
        content: 'attendance-leave'
    }
};

console.log('Components defined:', Object.keys(components));

// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebarCollapsed = !sidebarCollapsed;
    
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
    }
    
    // Save state to localStorage
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
}

// Load component functionality
async function loadComponent(componentName) {
    console.log('Loading component:', componentName);

    if (currentComponent === componentName) {
        console.log('Component already loaded:', componentName);
        return;
    }

    const component = components[componentName];
    if (!component) {
        console.error('Component not found:', componentName);
        return;
    }

    console.log('Found component:', component);

    // Show loading overlay
    showLoading();

    try {
        // Update active nav item
        updateActiveNavItem(componentName);

        // Update header
        updateHeader(component.title, component.subtitle);

        // Load component content
        if (component.content) {
            console.log('Loading inline component:', component.content);
            loadInlineComponent(component.content);
        } else {
            console.log('Loading dashboard content');
            loadDashboardContent();
        }

        currentComponent = componentName;
        console.log('Component loaded successfully:', componentName);

    } catch (error) {
        console.error('Error loading component:', error);
        showError('Failed to load component. Please try again.');
    } finally {
        hideLoading();
    }
}

// Make functions available globally
window.loadComponent = loadComponent;
window.toggleSidebar = toggleSidebar;
window.logout = logout;
window.showNotifications = showNotifications;
window.showSearch = showSearch;
window.showSettings = showSettings;
window.startChat = startChat;
window.showEmployeeProfile = showEmployeeProfile;

// Test function to verify JavaScript is working
window.testFunction = function() {
    alert('JavaScript is working!');
    console.log('Test function called successfully');
};

// Make sure loadComponent is available immediately
console.log('Setting up loadComponent function...');
console.log('loadComponent function:', typeof loadComponent);

// Add a test loadComponent function
window.testLoadComponent = function() {
    console.log('testLoadComponent called');
    alert('Testing loadComponent...');
    loadComponent('chat');
};

// Add a direct chat test function
window.testChatDirect = function() {
    console.log('testChatDirect called');
    alert('Starting chat test...');

    try {
        const contentArea = document.getElementById('contentArea');
        console.log('contentArea found:', !!contentArea);

        if (!contentArea) {
            alert('contentArea not found!');
            return;
        }

        // First try a simple HTML test
        contentArea.innerHTML = '<h1>SIMPLE TEST CONTENT</h1><p>If you see this, contentArea works!</p>';
        alert('Simple content set. Check if you see "SIMPLE TEST CONTENT" on the page.');

        // Now try chat content
        console.log('Getting chat content...');
        const chatContent = getChatContent();
        console.log('Chat content length:', chatContent.length);

        contentArea.innerHTML = chatContent;
        alert('Chat content set. Now initializing...');

        initializeChat();
        alert('Chat initialized successfully!');

    } catch (error) {
        alert('Error loading chat: ' + error.message);
        console.error('Chat error:', error);
    }
};

console.log('=== ALL FUNCTIONS MADE GLOBAL ===');
console.log('window.loadComponent:', typeof window.loadComponent);
console.log('window.toggleSidebar:', typeof window.toggleSidebar);
console.log('window.testFunction:', typeof window.testFunction);

// Add click event listeners to sidebar items as backup
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, adding click listeners...');

    // Add click listeners to all nav items
    const navItems = document.querySelectorAll('.nav-item');
    console.log('Found nav items:', navItems.length);

    navItems.forEach((item, index) => {
        const onclick = item.getAttribute('onclick');
        console.log(`Nav item ${index} onclick:`, onclick);

        // Add a backup click listener
        item.addEventListener('click', function(e) {
            console.log('Nav item clicked:', onclick);
            if (onclick && onclick.includes('loadComponent')) {
                const match = onclick.match(/loadComponent\('([^']+)'\)/);
                if (match) {
                    const componentName = match[1];
                    console.log('Loading component via event listener:', componentName);
                    loadComponent(componentName);
                }
            }
        });
    });
});

// Add a super simple content test
window.testSimpleContent = function() {
    console.log('testSimpleContent called');
    const contentArea = document.getElementById('contentArea');
    if (contentArea) {
        contentArea.innerHTML = '<div style="background: red; color: white; padding: 20px; font-size: 24px;">CONTENT AREA WORKS!</div>';
        alert('Simple content set - check if you see red box');
    } else {
        alert('contentArea element not found!');
    }
};

// Test chat with specific employee
window.testChatWithSarah = function() {
    console.log('Testing chat with Sarah Wilson...');
    alert('Starting chat with Sarah Wilson...');

    // Find Sarah Wilson's ID
    const sarah = employees.find(emp => emp.name === 'Sarah Wilson');
    if (sarah) {
        console.log('Found Sarah:', sarah);
        startChat(sarah.id);
    } else {
        alert('Sarah Wilson not found in employees list');
        console.error('Sarah not found in employees:', employees);
    }
};

// Test just loading chat component
window.testChatComponentOnly = function() {
    console.log('=== TESTING CHAT COMPONENT LOADING ONLY ===');
    alert('Testing chat component loading...');

    try {
        loadComponent('chat');
        alert('Chat component load command sent - check console for details');
    } catch (error) {
        alert('Error loading chat component: ' + error.message);
        console.error('Chat component error:', error);
    }
};

// Update active navigation item
function updateActiveNavItem(componentName) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current item
    const activeItem = document.querySelector(`[onclick="loadComponent('${componentName}')"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Update header content
function updateHeader(title, subtitle) {
    document.getElementById('pageTitle').textContent = title;
    document.getElementById('pageSubtitle').textContent = subtitle;
}

// Load inline component
function loadInlineComponent(componentName) {
    console.log('loadInlineComponent called with:', componentName);
    const contentArea = document.getElementById('contentArea');

    if (!contentArea) {
        console.error('contentArea element not found!');
        return;
    }

    console.log('contentArea found, loading component:', componentName);

    switch(componentName) {

        case 'payroll':
            contentArea.innerHTML = getPayrollContent();
            initializePayroll();
            break;
        case 'chat':
            console.log('=== LOADING CHAT COMPONENT ===');
            console.log('contentArea found:', !!contentArea);
            try {
                console.log('Calling getChatContent()...');
                const chatContent = getChatContent();
                console.log('Chat content generated successfully, length:', chatContent.length);
                console.log('Setting innerHTML...');
                contentArea.innerHTML = chatContent;
                console.log('Content set successfully, calling initializeChat()...');
                initializeChat();
                console.log('=== CHAT COMPONENT LOADED SUCCESSFULLY ===');
            } catch (error) {
                console.error('=== ERROR LOADING CHAT ===', error);
                console.error('Error stack:', error.stack);
                contentArea.innerHTML = '<div style="padding: 20px; color: red; background: #ffe6e6; border: 1px solid red; border-radius: 8px;"><h3>Error loading chat component:</h3><p>' + error.message + '</p><p>Check console for details.</p></div>';
            }
            break;
        case 'social-feed':
            contentArea.innerHTML = getSocialFeedContent();
            initializeSocialFeed();
            break;
        case 'announcements':
            contentArea.innerHTML = getAnnouncementsContent();
            initializeAnnouncements();
            break;
        case 'events':
            contentArea.innerHTML = getEventsContent();
            initializeEvents();
            break;
        case 'polls':
            contentArea.innerHTML = getPollsContent();
            initializePolls();
            break;
        case 'suggestions':
            contentArea.innerHTML = getSuggestionsContent();
            initializeSuggestions();
            break;
        case 'recognition':
            contentArea.innerHTML = getRecognitionContent();
            initializeRecognition();
            break;

        case 'attendance-leave':
            contentArea.innerHTML = getAttendanceLeaveContent();
            initializeAttendanceLeave();
            break;
        default:
            contentArea.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #718096;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🚧</div>
                    <h3>Component Under Development</h3>
                    <p>This component is being built. Please check back soon!</p>
                </div>
            `;
    }
}

// Load external component
async function loadExternalComponent(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();

        // Extract body content from the loaded HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Try to find the main content in different ways
        let mainContent = doc.querySelector('main .container') ||
                         doc.querySelector('main') ||
                         doc.querySelector('.container') ||
                         doc.querySelector('body > *:not(script)');

        if (mainContent) {
            // Clear the content area
            const contentArea = document.getElementById('contentArea');
            contentArea.innerHTML = '';

            // Clone and insert the content
            const clonedContent = mainContent.cloneNode(true);
            contentArea.appendChild(clonedContent);

            // Execute any scripts in the loaded content
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.textContent.trim()) {
                    try {
                        // Create a new script element and execute it
                        const newScript = document.createElement('script');
                        newScript.textContent = script.textContent;
                        document.body.appendChild(newScript);
                        // Remove it immediately after execution
                        document.body.removeChild(newScript);
                    } catch (scriptError) {
                        console.warn('Error executing script:', scriptError);
                    }
                }
            });

            // Add any CSS styles from the loaded document
            const styles = doc.querySelectorAll('style');
            styles.forEach(style => {
                if (!document.querySelector(`style[data-component="${filename}"]`)) {
                    const newStyle = document.createElement('style');
                    newStyle.textContent = style.textContent;
                    newStyle.setAttribute('data-component', filename);
                    document.head.appendChild(newStyle);
                }
            });

        } else {
            throw new Error('No main content found in component');
        }

    } catch (error) {
        console.error('Error loading external component:', error);
        document.getElementById('contentArea').innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #718096;">
                <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                <h3>Component Not Available</h3>
                <p>This component is currently being developed. Please check back later.</p>
                <button onclick="loadComponent('dashboard')" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Return to Dashboard
                </button>
            </div>
        `;
    }
}

// Load default dashboard content
function loadDashboardContent() {
    document.getElementById('contentArea').innerHTML = `
        <div class="dashboard-overview">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-content">
                        <h3>127</h3>
                        <p>Total Employees</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💬</div>
                    <div class="stat-content">
                        <h3>24</h3>
                        <p>Active Chats</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-content">
                        <h3>47</h3>
                        <p>Recognitions</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-content">
                        <h3>8</h3>
                        <p>Upcoming Events</p>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-widgets">
                <div class="widget">
                    <h3>Recent Activity</h3>
                    <div class="activity-list" id="recentActivityList">
                        <!-- Dynamic content will be loaded here -->
                    </div>
                </div>
                
                <div class="widget">
                    <h3>Quick Actions</h3>
                    <div class="quick-actions">
                        <button class="quick-action" onclick="loadComponent('payroll')">
                            <span class="action-icon">💰</span>
                            <span>View Payroll</span>
                        </button>
                        <button class="quick-action" onclick="loadComponent('chat')">
                            <span class="action-icon">💬</span>
                            <span>Start Chat</span>
                        </button>
                        <button class="quick-action" onclick="loadComponent('recognition')">
                            <span class="action-icon">🏆</span>
                            <span>Give Recognition</span>
                        </button>
                        <button class="quick-action" onclick="loadComponent('announcements')">
                            <span class="action-icon">📢</span>
                            <span>New Announcement</span>
                        </button>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: #e6f3ff; border-radius: 8px; border-left: 4px solid #667eea;">
                        <p style="margin: 0; font-size: 0.9rem; color: #4a5568;">
                            💡 <strong>Tip:</strong> Click the ☰ button or press <kbd style="background: white; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem;">Ctrl+B</kbd> to collapse the sidebar for more space!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Loading functions
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading() {
    setTimeout(() => {
        document.getElementById('loadingOverlay').classList.remove('active');
    }, 500);
}

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Error handling
function showError(message) {
    document.getElementById('contentArea').innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: #e53e3e;">
            <div style="font-size: 3rem; margin-bottom: 20px;">❌</div>
            <h3>Error</h3>
            <p>${message}</p>
            <button onclick="loadComponent('dashboard')" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer;">
                Return to Dashboard
            </button>
        </div>
    `;
}

// Header action functions
function showNotifications() {
    // Remove existing notification panel if it exists
    const existingPanel = document.getElementById('notificationPanel');
    if (existingPanel) {
        existingPanel.remove();
        return;
    }

    // Create notification panel
    const panel = document.createElement('div');
    panel.id = 'notificationPanel';
    panel.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 350px;
        max-height: 500px;
        background: white;
        border: 1px solid var(--gray-200);
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 1000;
        overflow: hidden;
    `;

    const notifications = [
        { id: 1, title: 'New Employee Registered', message: 'Sarah Wilson has joined the HR department', time: '5 min ago', type: 'info' },
        { id: 2, title: 'Payroll Processed', message: 'Monthly payroll has been successfully processed', time: '1 hour ago', type: 'success' },
        { id: 3, title: 'Leave Request', message: 'Mike Johnson requested 3 days leave', time: '2 hours ago', type: 'warning' },
        { id: 4, title: 'System Update', message: 'HRMS system will be updated tonight at 2 AM', time: '1 day ago', type: 'info' },
        { id: 5, title: 'Recognition Given', message: 'You received a "Team Player" badge', time: '2 days ago', type: 'success' }
    ];

    const typeColors = {
        info: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    };

    panel.innerHTML = `
        <div style="padding: var(--spacing-4); border-bottom: 1px solid var(--gray-200); background: var(--gray-50);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 1.1rem;">Notifications</h3>
                <button onclick="document.getElementById('notificationPanel').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); padding: 8px; margin: -8px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='var(--gray-200)'; this.style.color='var(--gray-700)'" onmouseout="this.style.background='none'; this.style.color='var(--gray-500)'">×</button>
            </div>
        </div>
        <div style="max-height: 400px; overflow-y: auto;">
            ${notifications.map(notif => `
                <div style="padding: var(--spacing-3); border-bottom: 1px solid var(--gray-100); cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
                    <div style="display: flex; align-items: flex-start; gap: var(--spacing-2);">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: ${typeColors[notif.type]}; margin-top: 6px; flex-shrink: 0;"></div>
                        <div style="flex: 1; min-width: 0;">
                            <div style="font-weight: 600; margin-bottom: 4px; font-size: 0.9rem;">${notif.title}</div>
                            <div style="color: var(--gray-600); font-size: 0.8rem; line-height: 1.4; margin-bottom: 4px;">${notif.message}</div>
                            <div style="color: var(--gray-400); font-size: 0.75rem;">${notif.time}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div style="padding: var(--spacing-3); text-align: center; border-top: 1px solid var(--gray-200);">
            <button style="background: var(--primary-color); color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">View All Notifications</button>
        </div>
    `;

    document.body.appendChild(panel);

    // Close panel when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closePanel(e) {
            if (!panel.contains(e.target) && !e.target.closest('.action-btn')) {
                panel.remove();
                document.removeEventListener('click', closePanel);
            }
        });
    }, 100);
}

function showSearch() {
    // Remove existing search panel if it exists
    const existingPanel = document.getElementById('searchPanel');
    if (existingPanel) {
        existingPanel.remove();
        return;
    }

    // Create search panel
    const panel = document.createElement('div');
    panel.id = 'searchPanel';
    panel.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 400px;
        background: white;
        border: 1px solid var(--gray-200);
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 1000;
        overflow: hidden;
    `;

    panel.innerHTML = `
        <div style="padding: var(--spacing-4); border-bottom: 1px solid var(--gray-200);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-3);">
                <h3 style="margin: 0; font-size: 1.1rem;">Global Search</h3>
                <button onclick="document.getElementById('searchPanel').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); padding: 8px; margin: -8px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='var(--gray-200)'; this.style.color='var(--gray-700)'" onmouseout="this.style.background='none'; this.style.color='var(--gray-500)'">×</button>
            </div>
            <div style="position: relative;">
                <input type="text" id="globalSearchInput" placeholder="Search employees, documents, or anything..." style="width: 100%; padding: 12px 40px 12px 12px; border: 1px solid var(--gray-300); border-radius: 8px; font-size: 0.9rem;" oninput="performGlobalSearch(this.value)">
                <span style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--gray-400);">🔍</span>
            </div>
        </div>
        <div id="searchResults" style="max-height: 300px; overflow-y: auto;">
            <div style="padding: var(--spacing-4); text-align: center; color: var(--gray-500);">
                Start typing to search...
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    // Focus on search input
    setTimeout(() => {
        document.getElementById('globalSearchInput').focus();
    }, 100);

    // Close panel when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closePanel(e) {
            if (!panel.contains(e.target) && !e.target.closest('.action-btn')) {
                panel.remove();
                document.removeEventListener('click', closePanel);
            }
        });
    }, 100);
}

function performGlobalSearch(query) {
    const resultsContainer = document.getElementById('searchResults');

    if (!query.trim()) {
        resultsContainer.innerHTML = `
            <div style="padding: var(--spacing-4); text-align: center; color: var(--gray-500);">
                Start typing to search...
            </div>
        `;
        return;
    }

    // Get data to search through
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const socialPosts = JSON.parse(localStorage.getItem('socialPosts') || '[]');

    const results = [];

    // Search employees
    employees.forEach(emp => {
        const searchText = `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.position} ${emp.department}`.toLowerCase();
        if (searchText.includes(query.toLowerCase())) {
            results.push({
                type: 'employee',
                title: `${emp.firstName} ${emp.lastName}`,
                subtitle: `${emp.position} • ${emp.department}`,
                action: 'navigateTo("attendance")'
            });
        }
    });

    // Search social posts
    socialPosts.forEach(post => {
        const searchText = `${post.content} ${post.author}`.toLowerCase();
        if (searchText.includes(query.toLowerCase())) {
            results.push({
                type: 'post',
                title: `Post by ${post.author}`,
                subtitle: post.content.substring(0, 60) + '...',
                action: 'navigateTo("social-feed")'
            });
        }
    });

    // Add some static results
    const staticResults = [
        { type: 'page', title: 'Payroll Management', subtitle: 'Manage employee salaries and payments', action: 'navigateTo("payroll")' },
        { type: 'page', title: 'Employee Directory', subtitle: 'View all employees and their details', action: 'navigateTo("attendance")' },
        { type: 'page', title: 'Social Feed', subtitle: 'Company social updates and posts', action: 'navigateTo("social-feed")' },
        { type: 'page', title: 'Chat & Messaging', subtitle: 'Communicate with team members', action: 'navigateTo("chat")' }
    ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.subtitle.toLowerCase().includes(query.toLowerCase()));

    results.push(...staticResults);

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div style="padding: var(--spacing-4); text-align: center; color: var(--gray-500);">
                No results found for "${query}"
            </div>
        `;
        return;
    }

    const typeIcons = {
        employee: '👤',
        post: '📝',
        page: '📄'
    };

    resultsContainer.innerHTML = results.map(result => `
        <div style="padding: var(--spacing-3); border-bottom: 1px solid var(--gray-100); cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'" onclick="document.getElementById('searchPanel').remove(); ${result.action}">
            <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                <span style="font-size: 1.2rem;">${typeIcons[result.type]}</span>
                <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: 600; margin-bottom: 2px; font-size: 0.9rem;">${result.title}</div>
                    <div style="color: var(--gray-600); font-size: 0.8rem; line-height: 1.3;">${result.subtitle}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function showSettings() {
    // Remove existing settings panel if it exists
    const existingPanel = document.getElementById('settingsPanel');
    if (existingPanel) {
        existingPanel.remove();
        return;
    }

    // Create settings panel
    const panel = document.createElement('div');
    panel.id = 'settingsPanel';
    panel.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 320px;
        background: white;
        border: 1px solid var(--gray-200);
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 1000;
        overflow: hidden;
    `;

    panel.innerHTML = `
        <div style="padding: var(--spacing-4); border-bottom: 1px solid var(--gray-200); background: var(--gray-50);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 1.1rem;">Settings</h3>
                <button onclick="document.getElementById('settingsPanel').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); padding: 8px; margin: -8px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='var(--gray-200)'; this.style.color='var(--gray-700)'" onmouseout="this.style.background='none'; this.style.color='var(--gray-500)'">×</button>
            </div>
        </div>
        <div style="padding: var(--spacing-2);">
            <div class="settings-item" style="padding: var(--spacing-3); cursor: pointer; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'" onclick="showProfileSettings()">
                <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                    <span style="font-size: 1.2rem;">👤</span>
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem;">Profile Settings</div>
                        <div style="color: var(--gray-600); font-size: 0.8rem;">Update your personal information</div>
                    </div>
                </div>
            </div>
            <div class="settings-item" style="padding: var(--spacing-3); cursor: pointer; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'" onclick="showNotificationSettings()">
                <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                    <span style="font-size: 1.2rem;">🔔</span>
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem;">Notifications</div>
                        <div style="color: var(--gray-600); font-size: 0.8rem;">Manage notification preferences</div>
                    </div>
                </div>
            </div>
            <div class="settings-item" style="padding: var(--spacing-3); cursor: pointer; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'" onclick="showThemeSettings()">
                <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                    <span style="font-size: 1.2rem;">🎨</span>
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem;">Theme & Display</div>
                        <div style="color: var(--gray-600); font-size: 0.8rem;">Customize appearance</div>
                    </div>
                </div>
            </div>
            <div class="settings-item" style="padding: var(--spacing-3); cursor: pointer; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'" onclick="showSecuritySettings()">
                <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                    <span style="font-size: 1.2rem;">🔒</span>
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem;">Security</div>
                        <div style="color: var(--gray-600); font-size: 0.8rem;">Password and security settings</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="padding: var(--spacing-3); border-top: 1px solid var(--gray-200); background: var(--gray-50);">
            <button onclick="logout()" style="width: 100%; background: #ef4444; color: white; border: none; padding: 10px; border-radius: 6px; font-size: 0.9rem; cursor: pointer; font-weight: 600;">
                🚪 Logout
            </button>
        </div>
    `;

    document.body.appendChild(panel);

    // Close panel when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closePanel(e) {
            if (!panel.contains(e.target) && !e.target.closest('.action-btn')) {
                panel.remove();
                document.removeEventListener('click', closePanel);
            }
        });
    }, 100);
}

// Settings sub-functions
function showProfileSettings() {
    document.getElementById('settingsPanel').remove();

    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;

    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto;">
            <div style="padding: var(--spacing-4); border-bottom: 1px solid var(--gray-200); background: var(--gray-50);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.2rem;">👤 Profile Settings</h3>
                    <button onclick="document.getElementById('profileModal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); padding: 8px; margin: -8px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='var(--gray-200)'; this.style.color='var(--gray-700)'" onmouseout="this.style.background='none'; this.style.color='var(--gray-500)'">×</button>
                </div>
            </div>
            <div style="padding: var(--spacing-4);">
                <form onsubmit="updateProfile(event)">
                    <div style="margin-bottom: var(--spacing-3);">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--gray-700);">Full Name</label>
                        <input type="text" value="John Doe" style="width: 100%; padding: 12px; border: 1px solid var(--gray-300); border-radius: 6px; font-size: 0.9rem;">
                    </div>
                    <div style="margin-bottom: var(--spacing-3);">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--gray-700);">Email</label>
                        <input type="email" value="john.doe@company.com" style="width: 100%; padding: 12px; border: 1px solid var(--gray-300); border-radius: 6px; font-size: 0.9rem;">
                    </div>
                    <div style="margin-bottom: var(--spacing-3);">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--gray-700);">Department</label>
                        <select style="width: 100%; padding: 12px; border: 1px solid var(--gray-300); border-radius: 6px; font-size: 0.9rem;">
                            <option>Software Engineering</option>
                            <option>Human Resources</option>
                            <option>Marketing</option>
                            <option>Finance</option>
                        </select>
                    </div>
                    <div style="margin-bottom: var(--spacing-3);">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--gray-700);">Phone</label>
                        <input type="tel" value="+1 (555) 123-4567" style="width: 100%; padding: 12px; border: 1px solid var(--gray-300); border-radius: 6px; font-size: 0.9rem;">
                    </div>
                    <div style="display: flex; gap: var(--spacing-2); justify-content: flex-end;">
                        <button type="button" onclick="document.getElementById('profileModal').remove()" style="padding: 10px 20px; border: 1px solid var(--gray-300); background: white; color: var(--gray-700); border-radius: 6px; cursor: pointer;">Cancel</button>
                        <button type="submit" style="padding: 10px 20px; background: var(--primary-600); color: white; border: none; border-radius: 6px; cursor: pointer;">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function showNotificationSettings() {
    document.getElementById('settingsPanel').remove();

    const modal = document.createElement('div');
    modal.id = 'notificationModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;

    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto;">
            <div style="padding: var(--spacing-4); border-bottom: 1px solid var(--gray-200); background: var(--gray-50);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.2rem;">🔔 Notification Settings</h3>
                    <button onclick="document.getElementById('notificationModal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); padding: 8px; margin: -8px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='var(--gray-200)'; this.style.color='var(--gray-700)'" onmouseout="this.style.background='none'; this.style.color='var(--gray-500)'">×</button>
                </div>
            </div>
            <div style="padding: var(--spacing-4);">
                <div style="margin-bottom: var(--spacing-4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2);">
                        <div>
                            <div style="font-weight: 600; color: var(--gray-900);">Email Notifications</div>
                            <div style="font-size: 0.875rem; color: var(--gray-600);">Receive notifications via email</div>
                        </div>
                        <label style="position: relative; display: inline-block; width: 50px; height: 24px;">
                            <input type="checkbox" checked style="opacity: 0; width: 0; height: 0;">
                            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--primary-600); transition: .4s; border-radius: 24px;"></span>
                            <span style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; transform: translateX(26px);"></span>
                        </label>
                    </div>
                </div>
                <div style="margin-bottom: var(--spacing-4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2);">
                        <div>
                            <div style="font-weight: 600; color: var(--gray-900);">Push Notifications</div>
                            <div style="font-size: 0.875rem; color: var(--gray-600);">Receive push notifications in browser</div>
                        </div>
                        <label style="position: relative; display: inline-block; width: 50px; height: 24px;">
                            <input type="checkbox" checked style="opacity: 0; width: 0; height: 0;">
                            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--primary-600); transition: .4s; border-radius: 24px;"></span>
                            <span style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; transform: translateX(26px);"></span>
                        </label>
                    </div>
                </div>
                <div style="margin-bottom: var(--spacing-4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2);">
                        <div>
                            <div style="font-weight: 600; color: var(--gray-900);">SMS Notifications</div>
                            <div style="font-size: 0.875rem; color: var(--gray-600);">Receive notifications via SMS</div>
                        </div>
                        <label style="position: relative; display: inline-block; width: 50px; height: 24px;">
                            <input type="checkbox" style="opacity: 0; width: 0; height: 0;">
                            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--gray-300); transition: .4s; border-radius: 24px;"></span>
                            <span style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;"></span>
                        </label>
                    </div>
                </div>
                <div style="display: flex; gap: var(--spacing-2); justify-content: flex-end;">
                    <button onclick="document.getElementById('notificationModal').remove()" style="padding: 10px 20px; border: 1px solid var(--gray-300); background: white; color: var(--gray-700); border-radius: 6px; cursor: pointer;">Cancel</button>
                    <button onclick="saveNotificationSettings()" style="padding: 10px 20px; background: var(--primary-600); color: white; border: none; border-radius: 6px; cursor: pointer;">Save Settings</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function showThemeSettings() {
    document.getElementById('settingsPanel').remove();

    const modal = document.createElement('div');
    modal.id = 'themeModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;

    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto;">
            <div style="padding: var(--spacing-4); border-bottom: 1px solid var(--gray-200); background: var(--gray-50);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.2rem;">🎨 Theme & Display</h3>
                    <button onclick="document.getElementById('themeModal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); padding: 8px; margin: -8px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='var(--gray-200)'; this.style.color='var(--gray-700)'" onmouseout="this.style.background='none'; this.style.color='var(--gray-500)'">×</button>
                </div>
            </div>
            <div style="padding: var(--spacing-4);">
                <div style="margin-bottom: var(--spacing-4);">
                    <label style="display: block; margin-bottom: 12px; font-weight: 600; color: var(--gray-700);">Theme</label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-2);">
                        <div onclick="selectTheme('light')" style="padding: var(--spacing-3); border: 2px solid var(--primary-600); border-radius: 8px; cursor: pointer; text-align: center; background: white;">
                            <div style="font-size: 2rem; margin-bottom: 8px;">☀️</div>
                            <div style="font-weight: 600;">Light</div>
                        </div>
                        <div onclick="selectTheme('dark')" style="padding: var(--spacing-3); border: 2px solid var(--gray-300); border-radius: 8px; cursor: pointer; text-align: center; background: #1f2937; color: white;">
                            <div style="font-size: 2rem; margin-bottom: 8px;">🌙</div>
                            <div style="font-weight: 600;">Dark</div>
                        </div>
                    </div>
                </div>
                <div style="margin-bottom: var(--spacing-4);">
                    <label style="display: block; margin-bottom: 12px; font-weight: 600; color: var(--gray-700);">Font Size</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid var(--gray-300); border-radius: 6px; font-size: 0.9rem;">
                        <option>Small</option>
                        <option selected>Medium</option>
                        <option>Large</option>
                    </select>
                </div>
                <div style="display: flex; gap: var(--spacing-2); justify-content: flex-end;">
                    <button onclick="document.getElementById('themeModal').remove()" style="padding: 10px 20px; border: 1px solid var(--gray-300); background: white; color: var(--gray-700); border-radius: 6px; cursor: pointer;">Cancel</button>
                    <button onclick="saveThemeSettings()" style="padding: 10px 20px; background: var(--primary-600); color: white; border: none; border-radius: 6px; cursor: pointer;">Save Settings</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function showSecuritySettings() {
    document.getElementById('settingsPanel').remove();

    const modal = document.createElement('div');
    modal.id = 'securityModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;

    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto;">
            <div style="padding: var(--spacing-4); border-bottom: 1px solid var(--gray-200); background: var(--gray-50);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.2rem;">🔒 Security Settings</h3>
                    <button onclick="document.getElementById('securityModal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); padding: 8px; margin: -8px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='var(--gray-200)'; this.style.color='var(--gray-700)'" onmouseout="this.style.background='none'; this.style.color='var(--gray-500)'">×</button>
                </div>
            </div>
            <div style="padding: var(--spacing-4);">
                <form onsubmit="updatePassword(event)">
                    <div style="margin-bottom: var(--spacing-3);">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--gray-700);">Current Password</label>
                        <input type="password" style="width: 100%; padding: 12px; border: 1px solid var(--gray-300); border-radius: 6px; font-size: 0.9rem;">
                    </div>
                    <div style="margin-bottom: var(--spacing-3);">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--gray-700);">New Password</label>
                        <input type="password" style="width: 100%; padding: 12px; border: 1px solid var(--gray-300); border-radius: 6px; font-size: 0.9rem;">
                    </div>
                    <div style="margin-bottom: var(--spacing-3);">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--gray-700);">Confirm New Password</label>
                        <input type="password" style="width: 100%; padding: 12px; border: 1px solid var(--gray-300); border-radius: 6px; font-size: 0.9rem;">
                    </div>
                    <div style="margin-bottom: var(--spacing-4);">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 600; color: var(--gray-900);">Two-Factor Authentication</div>
                                <div style="font-size: 0.875rem; color: var(--gray-600);">Add an extra layer of security</div>
                            </div>
                            <button type="button" onclick="enableTwoFactor()" style="padding: 8px 16px; background: var(--primary-600); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.875rem;">Enable</button>
                        </div>
                    </div>
                    <div style="display: flex; gap: var(--spacing-2); justify-content: flex-end;">
                        <button type="button" onclick="document.getElementById('securityModal').remove()" style="padding: 10px 20px; border: 1px solid var(--gray-300); background: white; color: var(--gray-700); border-radius: 6px; cursor: pointer;">Cancel</button>
                        <button type="submit" style="padding: 10px 20px; background: var(--primary-600); color: white; border: none; border-radius: 6px; cursor: pointer;">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Helper functions for settings
function updateProfile(event) {
    event.preventDefault();
    alert('Profile updated successfully!');
    document.getElementById('profileModal').remove();
}

function saveNotificationSettings() {
    alert('Notification settings saved!');
    document.getElementById('notificationModal').remove();
}

function selectTheme(theme) {
    // Update theme selection visual feedback
    const themeModal = document.getElementById('themeModal');
    const lightTheme = themeModal.querySelector('div[onclick="selectTheme(\'light\')"]');
    const darkTheme = themeModal.querySelector('div[onclick="selectTheme(\'dark\')"]');

    if (theme === 'light') {
        lightTheme.style.border = '2px solid var(--primary-600)';
        darkTheme.style.border = '2px solid var(--gray-300)';
    } else {
        darkTheme.style.border = '2px solid var(--primary-600)';
        lightTheme.style.border = '2px solid var(--gray-300)';
    }
}

function saveThemeSettings() {
    alert('Theme settings saved!');
    document.getElementById('themeModal').remove();
}

function updatePassword(event) {
    event.preventDefault();
    alert('Password updated successfully!');
    document.getElementById('securityModal').remove();
}

function enableTwoFactor() {
    alert('Two-factor authentication setup initiated!');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('rememberedEmail');
        window.location.href = 'register.html';
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Add component styles
    addComponentStyles();

    // Restore sidebar state
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState === 'true') {
        sidebarCollapsed = true;
        document.querySelector('.sidebar').classList.add('collapsed');
    }

    // Load default dashboard content
    loadDashboardContent();

    // Initialize sample data if not exists
    initializeSampleData();

    // Generate recent activities
    generateRecentActivities();

    // Add mobile menu toggle for responsive design
    if (window.innerWidth <= 1024) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            display: none;
        `;
        document.body.appendChild(overlay);
        
        // Toggle mobile sidebar
        window.toggleMobileSidebar = function() {
            sidebar.classList.toggle('open');
            overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
        };
        
        // Close sidebar when clicking overlay
        overlay.addEventListener('click', toggleMobileSidebar);
        
        // Add mobile menu button to header
        const headerLeft = document.querySelector('.header-left');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            margin-right: 15px;
            padding: 5px;
        `;
        mobileMenuBtn.onclick = toggleMobileSidebar;
        headerLeft.insertBefore(mobileMenuBtn, headerLeft.firstChild);
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'b':
                    e.preventDefault();
                    toggleSidebar();
                    break;
                case 'h':
                    e.preventDefault();
                    loadComponent('dashboard');
                    break;
                case 'k':
                    e.preventDefault();
                    showSearch();
                    break;
            }
        }

        // Escape key to close panels
        if (e.key === 'Escape') {
            const panels = ['notificationPanel', 'searchPanel', 'settingsPanel'];
            panels.forEach(panelId => {
                const panel = document.getElementById(panelId);
                if (panel) panel.remove();
            });
        }
    });
});

// Component Content Functions
function getRegistrationContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>👤 Employee Registration</h2>
                <form id="employeeRegistrationForm" style="margin-top: var(--spacing-4);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-4);">
                        <div class="form-group">
                            <label for="empFirstName" class="form-label">First Name *</label>
                            <input type="text" id="empFirstName" class="form-input" placeholder="Enter first name" required>
                        </div>
                        <div class="form-group">
                            <label for="empLastName" class="form-label">Last Name *</label>
                            <input type="text" id="empLastName" class="form-input" placeholder="Enter last name" required>
                        </div>
                        <div class="form-group">
                            <label for="empEmail" class="form-label">Email Address *</label>
                            <input type="email" id="empEmail" class="form-input" placeholder="Enter email address" required>
                        </div>
                        <div class="form-group">
                            <label for="empPhone" class="form-label">Phone Number</label>
                            <input type="tel" id="empPhone" class="form-input" placeholder="Enter phone number">
                        </div>
                        <div class="form-group">
                            <label for="empDepartment" class="form-label">Department *</label>
                            <select id="empDepartment" class="form-input" required>
                                <option value="">Select Department</option>
                                <option value="IT">Information Technology</option>
                                <option value="HR">Human Resources</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="Operations">Operations</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="empPosition" class="form-label">Position *</label>
                            <input type="text" id="empPosition" class="form-input" placeholder="Enter job position" required>
                        </div>
                        <div class="form-group">
                            <label for="empStartDate" class="form-label">Start Date *</label>
                            <input type="date" id="empStartDate" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="empSalary" class="form-label">Salary</label>
                            <input type="number" id="empSalary" class="form-input" placeholder="Enter salary" min="0" step="1000">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin-top: var(--spacing-4);">
                        ➕ Register Employee
                    </button>
                </form>
            </section>

            <section class="card">
                <h2>📋 Recent Registrations</h2>
                <div id="recentRegistrations" style="margin-top: var(--spacing-4);">
                    <!-- Recent registrations will be loaded here -->
                </div>
            </section>
        </div>
    `;
}

function initializeRegistration() {
    // Add form submission handler
    document.getElementById('employeeRegistrationForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('empFirstName').value,
            lastName: document.getElementById('empLastName').value,
            email: document.getElementById('empEmail').value,
            phone: document.getElementById('empPhone').value,
            department: document.getElementById('empDepartment').value,
            position: document.getElementById('empPosition').value,
            startDate: document.getElementById('empStartDate').value,
            salary: document.getElementById('empSalary').value
        };

        // Save to localStorage
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        const newEmployee = {
            id: Date.now(),
            ...formData,
            registeredDate: new Date().toISOString()
        };
        employees.push(newEmployee);
        localStorage.setItem('employees', JSON.stringify(employees));

        // Show success message
        showToast('Employee registered successfully!', 'success');

        // Reset form
        this.reset();

        // Reload recent registrations
        loadRecentRegistrations();
    });

    // Load recent registrations
    loadRecentRegistrations();
}

function loadRecentRegistrations() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const container = document.getElementById('recentRegistrations');

    if (employees.length === 0) {
        container.innerHTML = '<p style="color: var(--gray-600); text-align: center;">No employees registered yet</p>';
        return;
    }

    const recentEmployees = employees.slice(-5).reverse();
    const profileImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    ];

    const html = recentEmployees.map((emp, index) => `
        <div class="employee-card" style="display: flex; align-items: center; gap: var(--spacing-3); padding: var(--spacing-3); border-bottom: 1px solid var(--gray-200);">
            <img src="${profileImages[index % profileImages.length]}" alt="${emp.firstName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
            <div style="flex: 1;">
                <div style="font-weight: 600;">${emp.firstName} ${emp.lastName}</div>
                <div style="font-size: var(--font-size-sm); color: var(--gray-600);">${emp.position} • ${emp.department}</div>
            </div>
            <div style="text-align: right; font-size: var(--font-size-sm); color: var(--gray-500);">
                ${new Date(emp.registeredDate).toLocaleDateString()}
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}



function getAttendanceLeaveContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                <div style="text-align: center;">
                    <h2 style="color: white; margin-bottom: var(--spacing-4);">⏰ Today's Attendance</h2>
                    <div id="currentTime" style="font-size: 2rem; font-weight: 700; margin-bottom: var(--spacing-2);">
                        Loading...
                    </div>
                    <div id="currentDate" style="font-size: 1.2rem; opacity: 0.9; margin-bottom: var(--spacing-4);">
                        Loading...
                    </div>
                    <div style="display: flex; gap: var(--spacing-4); justify-content: center; flex-wrap: wrap;">
                        <button id="checkInBtn" class="btn btn-success" onclick="checkIn()" style="background: #10b981; border: none;">
                            <span>🟢</span> Check In
                        </button>
                        <button id="checkOutBtn" class="btn btn-danger" onclick="checkOut()" style="background: #ef4444; border: none;" disabled>
                            <span>🔴</span> Check Out
                        </button>
                        <button class="btn btn-secondary" onclick="requestLeave()" style="background: #f59e0b; border: none;">
                            <span>🏖️</span> Request Leave
                        </button>
                    </div>
                </div>
            </section>

            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>📊 Today's Summary</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4); margin-top: var(--spacing-4);">
                    <div class="summary-item">
                        <div class="summary-icon">🕐</div>
                        <div class="summary-content">
                            <h3 id="checkInTime">--:--</h3>
                            <p>Check In Time</p>
                        </div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-icon">🕕</div>
                        <div class="summary-content">
                            <h3 id="checkOutTime">--:--</h3>
                            <p>Check Out Time</p>
                        </div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-icon">⏱️</div>
                        <div class="summary-content">
                            <h3 id="totalHours">0h 0m</h3>
                            <p>Total Hours</p>
                        </div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-icon">🏖️</div>
                        <div class="summary-content">
                            <h3 id="leaveBalance">15</h3>
                            <p>Leave Balance</p>
                        </div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-icon">📊</div>
                        <div class="summary-content">
                            <h3 id="attendancePercentage">92%</h3>
                            <p>Attendance Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="card">
                <h2>🏖️ Request Leave</h2>
                <form id="leaveRequestForm" style="margin-top: var(--spacing-4);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-4);">
                        <div class="form-group">
                            <label for="leaveType" class="form-label">Leave Type</label>
                            <select id="leaveType" class="form-input" required>
                                <option value="">Select leave type</option>
                                <option value="annual">🏖️ Annual Leave</option>
                                <option value="sick">🤒 Sick Leave</option>
                                <option value="personal">👤 Personal Leave</option>
                                <option value="emergency">🚨 Emergency Leave</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="startDate" class="form-label">Start Date</label>
                            <input type="date" id="startDate" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="endDate" class="form-label">End Date</label>
                            <input type="date" id="endDate" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="totalDays" class="form-label">Total Days</label>
                            <input type="number" id="totalDays" class="form-input" readonly>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top: var(--spacing-4);">
                        <label for="leaveReason" class="form-label">Reason</label>
                        <textarea id="leaveReason" class="form-input" rows="3" placeholder="Please provide reason for leave request" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin-top: var(--spacing-4);">
                        📤 Submit Leave Request
                    </button>
                </form>
            </section>

            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>📋 Recent Leave Requests</h2>
                <div id="recentLeaveRequests" style="margin-top: var(--spacing-4);">
                    <!-- Recent leave requests will be loaded here -->
                </div>
            </section>

            <section class="card">
                <h2>📈 Attendance Analytics</h2>
                <div style="margin-top: var(--spacing-4);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4);">
                        <div class="analytics-item">
                            <h4>This Month</h4>
                            <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-top: var(--spacing-2);">
                                <div style="width: 100%; background: var(--gray-200); border-radius: 10px; height: 8px;">
                                    <div style="width: 92%; background: var(--accent-color); height: 100%; border-radius: 10px;"></div>
                                </div>
                                <span style="font-weight: 600; color: var(--accent-color);">92%</span>
                            </div>
                        </div>
                        <div class="analytics-item">
                            <h4>Last Month</h4>
                            <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-top: var(--spacing-2);">
                                <div style="width: 100%; background: var(--gray-200); border-radius: 10px; height: 8px;">
                                    <div style="width: 88%; background: var(--warning-color); height: 100%; border-radius: 10px;"></div>
                                </div>
                                <span style="font-weight: 600; color: var(--warning-color);">88%</span>
                            </div>
                        </div>
                        <div class="analytics-item">
                            <h4>Average</h4>
                            <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-top: var(--spacing-2);">
                                <div style="width: 100%; background: var(--gray-200); border-radius: 10px; height: 8px;">
                                    <div style="width: 90%; background: var(--primary-color); height: 100%; border-radius: 10px;"></div>
                                </div>
                                <span style="font-weight: 600; color: var(--primary-color);">90%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

function initializeAttendanceLeave() {
    // Initialize attendance functionality (simplified version)
    let attendanceState = JSON.parse(localStorage.getItem('attendanceState') || '{"isCheckedIn": false, "checkInTime": null, "checkOutTime": null}');

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Check in function
    window.checkIn = function() {
        const now = new Date();
        attendanceState.isCheckedIn = true;
        attendanceState.checkInTime = now.toISOString();
        localStorage.setItem('attendanceState', JSON.stringify(attendanceState));

        document.getElementById('checkInBtn').disabled = true;
        document.getElementById('checkOutBtn').disabled = false;

        showToast('✅ Checked in successfully!', 'success');
        updateSummary();
    };

    // Check out function
    window.checkOut = function() {
        const now = new Date();
        attendanceState.isCheckedIn = false;
        attendanceState.checkOutTime = now.toISOString();
        localStorage.setItem('attendanceState', JSON.stringify(attendanceState));

        document.getElementById('checkInBtn').disabled = false;
        document.getElementById('checkOutBtn').disabled = true;

        showToast('✅ Checked out successfully!', 'success');
        updateSummary();
    };

    // Request leave function
    window.requestLeave = function() {
        document.querySelector('#leaveRequestForm').scrollIntoView({ behavior: 'smooth' });
    };

    function updateDateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const timeEl = document.getElementById('currentTime');
        const dateEl = document.getElementById('currentDate');
        if (timeEl) timeEl.textContent = timeString;
        if (dateEl) dateEl.textContent = dateString;
    }

    function updateSummary() {
        const checkInTimeEl = document.getElementById('checkInTime');
        const checkOutTimeEl = document.getElementById('checkOutTime');
        const totalHoursEl = document.getElementById('totalHours');

        if (attendanceState.checkInTime && checkInTimeEl) {
            const checkIn = new Date(attendanceState.checkInTime);
            checkInTimeEl.textContent = checkIn.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (attendanceState.checkOutTime && checkOutTimeEl) {
            const checkOut = new Date(attendanceState.checkOutTime);
            checkOutTimeEl.textContent = checkOut.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (attendanceState.checkInTime && totalHoursEl) {
            const checkIn = new Date(attendanceState.checkInTime);
            const checkOut = attendanceState.checkOutTime ?
                new Date(attendanceState.checkOutTime) : new Date();

            const totalMs = checkOut - checkIn;
            const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
            const totalMinutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));

            totalHoursEl.textContent = totalHours + 'h ' + totalMinutes + 'm';
        }
    }

    // Initialize UI state
    if (attendanceState.isCheckedIn) {
        document.getElementById('checkInBtn').disabled = true;
        document.getElementById('checkOutBtn').disabled = false;
    }

    updateSummary();

    // Add leave form handler
    document.getElementById('leaveRequestForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const leaveType = document.getElementById('leaveType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const totalDays = document.getElementById('totalDays').value;
        const reason = document.getElementById('leaveReason').value;

        const leaveRequest = {
            id: Date.now(),
            type: leaveType,
            startDate,
            endDate,
            totalDays,
            reason,
            status: 'pending',
            submittedDate: new Date().toISOString()
        };

        // Save to localStorage
        const leaveRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
        leaveRequests.unshift(leaveRequest);
        localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));

        showToast('Leave request submitted successfully!', 'success');
        this.reset();
        loadRecentLeaveRequests();
    });

    // Load recent leave requests
    loadRecentLeaveRequests();

    // Add date change listeners
    document.getElementById('startDate').addEventListener('change', calculateDays);
    document.getElementById('endDate').addEventListener('change', calculateDays);

    function calculateDays() {
        const start = document.getElementById('startDate').value;
        const end = document.getElementById('endDate').value;

        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            document.getElementById('totalDays').value = diffDays;
        }
    }
}

function loadRecentLeaveRequests() {
    let leaveRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');

    // Add sample leave requests if none exist
    if (leaveRequests.length === 0) {
        leaveRequests = [
            {
                id: 1,
                type: 'annual',
                startDate: '2024-01-15',
                endDate: '2024-01-17',
                totalDays: 3,
                reason: 'Family vacation to celebrate New Year',
                status: 'approved',
                submittedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                type: 'sick',
                startDate: '2024-01-08',
                endDate: '2024-01-08',
                totalDays: 1,
                reason: 'Feeling unwell with flu symptoms',
                status: 'approved',
                submittedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                type: 'personal',
                startDate: '2024-01-25',
                endDate: '2024-01-26',
                totalDays: 2,
                reason: 'Personal appointment and family matters',
                status: 'pending',
                submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
    }

    const container = document.getElementById('recentLeaveRequests');

    const leaveTypeIcons = {
        annual: '🏖️',
        sick: '🤒',
        personal: '👤',
        emergency: '🚨',
        maternity: '👶',
        paternity: '👨‍👶'
    };

    const statusColors = {
        pending: '#f59e0b',
        approved: '#10b981',
        rejected: '#ef4444'
    };

    const html = leaveRequests.slice(0, 5).map(request => `
        <div class="leave-request-item" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-3); border-left: 4px solid ${statusColors[request.status]};">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-2);">
                <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                    <span style="font-size: 1.5rem;">${leaveTypeIcons[request.type]}</span>
                    <div>
                        <h4 style="margin-bottom: 4px; text-transform: capitalize;">${request.type} Leave</h4>
                        <p style="font-size: var(--font-size-sm); color: var(--gray-600); margin: 0;">${request.startDate} to ${request.endDate} (${request.totalDays} days)</p>
                    </div>
                </div>
                <span style="background: ${statusColors[request.status]}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; text-transform: capitalize;">${request.status}</span>
            </div>
            <div style="background: var(--gray-50); padding: var(--spacing-2); border-radius: 6px; margin-bottom: var(--spacing-2);">
                <p style="margin: 0; font-style: italic; color: var(--gray-700);">"${request.reason}"</p>
            </div>
            <div style="font-size: var(--font-size-sm); color: var(--gray-500);">
                Submitted on ${new Date(request.submittedDate).toLocaleDateString()}
            </div>
        </div>
    `).join('');

    container.innerHTML = html || '<p style="color: var(--gray-600); text-align: center;">No leave requests found</p>';
}

// Enhanced Profiles Component
function getProfilesContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>👥 Employee Profiles</h2>
                <div style="margin-top: var(--spacing-4);">
                    <div style="display: flex; gap: var(--spacing-3); margin-bottom: var(--spacing-4);">
                        <input type="text" id="profileSearchInput" class="form-input" placeholder="Search employees..." style="flex: 1;">
                        <button class="btn btn-primary" onclick="searchProfiles()">🔎 Search</button>
                    </div>
                    <div style="display: flex; gap: var(--spacing-2); flex-wrap: wrap;">
                        <button class="btn btn-secondary filter-btn active" onclick="filterProfiles('all')">All Departments</button>
                        <button class="btn btn-secondary filter-btn" onclick="filterProfiles('IT')">IT</button>
                        <button class="btn btn-secondary filter-btn" onclick="filterProfiles('HR')">HR</button>
                        <button class="btn btn-secondary filter-btn" onclick="filterProfiles('Finance')">Finance</button>
                        <button class="btn btn-secondary filter-btn" onclick="filterProfiles('Marketing')">Marketing</button>
                        <button class="btn btn-secondary filter-btn" onclick="filterProfiles('Sales')">Sales</button>
                    </div>
                </div>
            </section>

            <section class="card">
                <h2>📋 Employee Directory</h2>
                <div id="profilesGrid" style="margin-top: var(--spacing-4);">
                    <!-- Employee profiles will be loaded here -->
                </div>
            </section>
        </div>
    `;
}

function getPayrollContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>💰 Payroll Management</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-4); margin-top: var(--spacing-4);">
                    <div class="payroll-stat">
                        <div class="stat-icon">💵</div>
                        <div class="stat-content">
                            <h3 id="totalPayroll">₹92,50,000</h3>
                            <p>Total Monthly Payroll</p>
                        </div>
                    </div>
                    <div class="payroll-stat">
                        <div class="stat-icon">👥</div>
                        <div class="stat-content">
                            <h3 id="employeeCount">24</h3>
                            <p>Active Employees</p>
                        </div>
                    </div>
                    <div class="payroll-stat">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <h3 id="avgSalary">₹3,85,417</h3>
                            <p>Average Salary</p>
                        </div>
                    </div>
                    <div class="payroll-stat">
                        <div class="stat-icon">📅</div>
                        <div class="stat-content">
                            <h3 id="nextPayday">Dec 15</h3>
                            <p>Next Payday</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>📋 Employee Payroll</h2>
                <div id="payrollTable" style="margin-top: var(--spacing-4); overflow-x: auto;">
                    <!-- Payroll table will be loaded here -->
                </div>
            </section>

            <section class="card">
                <h2>💳 Salary Calculator</h2>
                <form id="salaryCalculator" style="margin-top: var(--spacing-4);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4);">
                        <div class="form-group">
                            <label for="baseSalary" class="form-label">Base Salary (₹)</label>
                            <input type="number" id="baseSalary" class="form-input" placeholder="Enter base salary in rupees" min="0">
                        </div>
                        <div class="form-group">
                            <label for="bonus" class="form-label">Bonus (₹)</label>
                            <input type="number" id="bonus" class="form-input" placeholder="Enter bonus in rupees" min="0">
                        </div>
                        <div class="form-group">
                            <label for="deductions" class="form-label">Deductions (₹)</label>
                            <input type="number" id="deductions" class="form-input" placeholder="Enter deductions in rupees" min="0">
                        </div>
                        <div class="form-group">
                            <label for="netSalary" class="form-label">Net Salary (₹)</label>
                            <input type="text" id="netSalary" class="form-input" readonly style="background: var(--gray-100);" placeholder="₹0">
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" onclick="calculateSalary()" style="margin-top: var(--spacing-4);">
                        🧮 Calculate Net Salary
                    </button>
                </form>
            </section>
        </div>
    `;
}

function getChatContent() {
    console.log('=== getChatContent() CALLED ===');
    try {
        console.log('Building chat content HTML...');
        const content = `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>💬 Chat & Messaging</h2>
                <div class="chat-container" style="display: grid; grid-template-columns: minmax(250px, 300px) 1fr; gap: var(--spacing-4); height: 500px; margin-top: var(--spacing-4);">
                    <!-- Chat List -->
                    <div style="border: 1px solid var(--gray-200); border-radius: 8px; overflow: hidden; min-width: 0;">
                        <div style="background: var(--gray-50); padding: var(--spacing-3); border-bottom: 1px solid var(--gray-200);">
                            <h4 style="margin: 0; font-size: 1rem;">Recent Chats</h4>
                        </div>
                        <div id="chatList" style="overflow-y: auto; height: calc(100% - 60px);">
                            <!-- Chat list will be loaded here -->
                        </div>
                    </div>

                    <!-- Chat Area -->
                    <div style="border: 1px solid var(--gray-200); border-radius: 8px; display: flex; flex-direction: column; min-width: 0;">
                        <div style="background: var(--gray-50); padding: var(--spacing-3); border-bottom: 1px solid var(--gray-200);">
                            <h4 id="chatHeader" style="margin: 0; font-size: 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Select a chat to start messaging</h4>
                        </div>
                        <div id="chatMessages" style="flex: 1; padding: var(--spacing-3); overflow-y: auto; background: #fafafa;">
                            <div style="text-align: center; color: var(--gray-500); margin-top: 50px;">
                                <div style="font-size: 3rem; margin-bottom: var(--spacing-2);">💬</div>
                                <p>Select a conversation to start chatting</p>
                            </div>
                        </div>
                        <div style="padding: var(--spacing-3); border-top: 1px solid var(--gray-200);">
                            <div style="display: flex; gap: var(--spacing-2);">
                                <input type="text" id="messageInput" class="form-input" placeholder="Type a message..." style="flex: 1; min-width: 0;" disabled>
                                <button class="btn btn-primary" onclick="sendChatMessage()" disabled id="sendBtn" style="white-space: nowrap;">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
    console.log('getChatContent returning content, length:', content.length);
    return content;
}

function getSocialFeedContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>📱 Social Feed</h2>
                <form id="newPostForm" style="margin-top: var(--spacing-4);">
                    <div class="form-group">
                        <textarea id="postContent" class="form-input" rows="3" placeholder="What's on your mind? Share an update with your team..." required></textarea>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--spacing-2);">
                        <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-2);">
                            <button type="button" class="btn btn-secondary" onclick="addEmoji('😊')" style="min-width: 40px;">😊</button>
                            <button type="button" class="btn btn-secondary" onclick="addEmoji('👍')" style="min-width: 40px;">👍</button>
                            <button type="button" class="btn btn-secondary" onclick="addEmoji('🎉')" style="min-width: 40px;">🎉</button>
                            <button type="button" class="btn btn-secondary" onclick="addEmoji('💡')" style="min-width: 40px;">💡</button>
                        </div>
                        <button type="submit" class="btn btn-primary" style="white-space: nowrap;">📤 Post Update</button>
                    </div>
                </form>
            </section>

            <section class="card">
                <h2>📰 Recent Posts</h2>
                <div id="socialFeedPosts" style="margin-top: var(--spacing-4);">
                    <!-- Posts will be loaded here -->
                </div>
            </section>
        </div>
    `;
}

function getAnnouncementsContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>📢 Company Announcements</h2>
                <div id="announcementsList" style="margin-top: var(--spacing-4);">
                    <!-- Announcements will be loaded here -->
                </div>
            </section>

            <section class="card">
                <h2>📝 Create Announcement</h2>
                <form id="announcementForm" style="margin-top: var(--spacing-4);">
                    <div class="form-group">
                        <label for="announcementTitle" class="form-label">Title</label>
                        <input type="text" id="announcementTitle" class="form-input" placeholder="Enter announcement title" required>
                    </div>
                    <div class="form-group">
                        <label for="announcementType" class="form-label">Type</label>
                        <select id="announcementType" class="form-input" required>
                            <option value="">Select type</option>
                            <option value="general">📢 General</option>
                            <option value="urgent">🚨 Urgent</option>
                            <option value="event">📅 Event</option>
                            <option value="policy">📋 Policy</option>
                            <option value="celebration">🎉 Celebration</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="announcementContent" class="form-label">Content</label>
                        <textarea id="announcementContent" class="form-input" rows="4" placeholder="Enter announcement details" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">📤 Post Announcement</button>
                </form>
            </section>
        </div>
    `;
}

function getEventsContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>📅 Events Calendar</h2>
                <div class="calendar-container" style="display: grid; grid-template-columns: 1fr 300px; gap: var(--spacing-4); margin-top: var(--spacing-4);">
                    <!-- Calendar View -->
                    <div id="calendarView" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-4);">
                            <h3 id="currentMonth">Loading...</h3>
                            <div style="display: flex; gap: var(--spacing-2);">
                                <button class="btn btn-secondary" onclick="previousMonth()" style="padding: 8px 12px;">‹</button>
                                <button class="btn btn-secondary" onclick="nextMonth()" style="padding: 8px 12px;">›</button>
                            </div>
                        </div>
                        <div id="calendarGrid" class="calendar-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--gray-200); border-radius: 8px; overflow: hidden;">
                            <!-- Calendar grid will be generated here -->
                        </div>
                    </div>

                    <!-- Upcoming Events -->
                    <div style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4);">
                        <h3 style="margin-bottom: var(--spacing-4);">🔜 Upcoming Events</h3>
                        <div id="upcomingEvents">
                            <!-- Upcoming events will be loaded here -->
                        </div>
                    </div>
                </div>
            </section>

            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>➕ Create Event</h2>
                <form id="eventForm" style="margin-top: var(--spacing-4);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-4);">
                        <div class="form-group">
                            <label for="eventTitle" class="form-label">Event Title</label>
                            <input type="text" id="eventTitle" class="form-input" placeholder="Enter event title" required>
                        </div>
                        <div class="form-group">
                            <label for="eventType" class="form-label">Event Type</label>
                            <select id="eventType" class="form-input" required>
                                <option value="">Select type</option>
                                <option value="meeting">🤝 Meeting</option>
                                <option value="training">📚 Training</option>
                                <option value="social">🎉 Social Event</option>
                                <option value="deadline">⏰ Deadline</option>
                                <option value="holiday">🏖️ Holiday</option>
                                <option value="conference">🎤 Conference</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="eventDate" class="form-label">Date</label>
                            <input type="date" id="eventDate" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="eventTime" class="form-label">Time</label>
                            <input type="time" id="eventTime" class="form-input" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="eventDescription" class="form-label">Description</label>
                        <textarea id="eventDescription" class="form-input" rows="3" placeholder="Event description and details" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="eventLocation" class="form-label">Location</label>
                        <input type="text" id="eventLocation" class="form-input" placeholder="Event location or meeting room">
                    </div>
                    <button type="submit" class="btn btn-primary">📅 Create Event</button>
                </form>
            </section>

            <section class="card">
                <h2>📋 All Events</h2>
                <div id="allEventsList" style="margin-top: var(--spacing-4);">
                    <!-- All events will be loaded here -->
                </div>
            </section>
        </div>
    `;
}

function getPollsContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>📊 Create Poll</h2>
                <form id="pollForm" style="margin-top: var(--spacing-4);">
                    <div class="form-group">
                        <label for="pollQuestion" class="form-label">Poll Question</label>
                        <input type="text" id="pollQuestion" class="form-input" placeholder="What would you like to ask?" required>
                    </div>
                    <div class="form-group">
                        <label for="pollType" class="form-label">Poll Type</label>
                        <select id="pollType" class="form-input" required>
                            <option value="">Select type</option>
                            <option value="multiple">📊 Multiple Choice</option>
                            <option value="yesno">✅ Yes/No</option>
                            <option value="rating">⭐ Rating (1-5)</option>
                            <option value="feedback">💬 Feedback</option>
                        </select>
                    </div>
                    <div id="pollOptionsContainer" style="display: none;">
                        <label class="form-label">Poll Options</label>
                        <div id="pollOptions">
                            <div class="poll-option-input" style="display: flex; gap: var(--spacing-2); margin-bottom: var(--spacing-2);">
                                <input type="text" class="form-input" placeholder="Option 1" style="flex: 1;">
                                <button type="button" class="btn btn-secondary" onclick="removePollOption(this)" style="padding: 8px 12px;">❌</button>
                            </div>
                            <div class="poll-option-input" style="display: flex; gap: var(--spacing-2); margin-bottom: var(--spacing-2);">
                                <input type="text" class="form-input" placeholder="Option 2" style="flex: 1;">
                                <button type="button" class="btn btn-secondary" onclick="removePollOption(this)" style="padding: 8px 12px;">❌</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary" onclick="addPollOption()" style="margin-bottom: var(--spacing-4);">➕ Add Option</button>
                    </div>
                    <div class="form-group">
                        <label for="pollDescription" class="form-label">Description (Optional)</label>
                        <textarea id="pollDescription" class="form-input" rows="2" placeholder="Additional details about the poll"></textarea>
                    </div>

                    <div id="pollPreview" style="display: none; margin-top: var(--spacing-4); padding: var(--spacing-4); background: var(--gray-50); border-radius: 8px;">
                        <h4 style="margin-bottom: var(--spacing-3); color: var(--gray-700);">📋 Poll Preview</h4>
                        <div id="previewContent">
                            <!-- Preview will be generated here -->
                        </div>
                    </div>

                    <div style="display: flex; gap: var(--spacing-2); margin-top: var(--spacing-4);">
                        <button type="button" class="btn btn-secondary" onclick="showPollPreview()">👁️ Preview Poll</button>
                        <button type="submit" class="btn btn-primary">📊 Create Poll</button>
                    </div>
                </form>
            </section>

            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>🗳️ Active Polls</h2>
                <div id="activePolls" style="margin-top: var(--spacing-4);">
                    <!-- Active polls will be loaded here -->
                </div>
            </section>

            <section class="card">
                <h2>📈 Poll Results</h2>
                <div id="pollResults" style="margin-top: var(--spacing-4);">
                    <!-- Poll results will be loaded here -->
                </div>
            </section>
        </div>
    `;
}

function getSuggestionsContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>💡 Submit Suggestion</h2>
                <form id="suggestionForm" style="margin-top: var(--spacing-4);">
                    <div class="form-group">
                        <label for="suggestionCategory" class="form-label">Category</label>
                        <select id="suggestionCategory" class="form-input" required>
                            <option value="">Select category</option>
                            <option value="workplace">🏢 Workplace Improvement</option>
                            <option value="process">⚙️ Process Enhancement</option>
                            <option value="technology">💻 Technology</option>
                            <option value="benefits">🎁 Employee Benefits</option>
                            <option value="environment">🌱 Work Environment</option>
                            <option value="other">📝 Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="suggestionTitle" class="form-label">Title</label>
                        <input type="text" id="suggestionTitle" class="form-input" placeholder="Brief title for your suggestion" required>
                    </div>
                    <div class="form-group">
                        <label for="suggestionDescription" class="form-label">Description</label>
                        <textarea id="suggestionDescription" class="form-input" rows="4" placeholder="Describe your suggestion in detail..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="anonymousSubmission">
                            <span class="checkmark"></span>
                            Submit anonymously
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">💡 Submit Suggestion</button>
                </form>
            </section>

            <section class="card">
                <h2>📋 Recent Suggestions</h2>
                <div id="suggestionsList" style="margin-top: var(--spacing-4);">
                    <!-- Suggestions will be loaded here -->
                </div>
            </section>
        </div>
    `;
}

function getRecognitionContent() {
    return `
        <div class="component-content">
            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>🏆 Top Recognition Leaders</h2>
                <div id="topRecognitionLeaders" style="margin-top: var(--spacing-4);">
                    <!-- Top leaders will be loaded here -->
                </div>
            </section>

            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>🎖️ Recognition Badges</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4); margin-top: var(--spacing-4);">
                    <div class="badge-item" style="text-align: center; padding: var(--spacing-4); background: var(--gray-50); border-radius: 12px;">
                        <div style="font-size: 3rem; margin-bottom: var(--spacing-2);">🌟</div>
                        <h4>Star Performer</h4>
                        <p style="font-size: var(--font-size-sm); color: var(--gray-600);">Outstanding work quality</p>
                    </div>
                    <div class="badge-item" style="text-align: center; padding: var(--spacing-4); background: var(--gray-50); border-radius: 12px;">
                        <div style="font-size: 3rem; margin-bottom: var(--spacing-2);">🤝</div>
                        <h4>Team Player</h4>
                        <p style="font-size: var(--font-size-sm); color: var(--gray-600);">Excellent collaboration</p>
                    </div>
                    <div class="badge-item" style="text-align: center; padding: var(--spacing-4); background: var(--gray-50); border-radius: 12px;">
                        <div style="font-size: 3rem; margin-bottom: var(--spacing-2);">💡</div>
                        <h4>Innovator</h4>
                        <p style="font-size: var(--font-size-sm); color: var(--gray-600);">Creative problem solving</p>
                    </div>
                    <div class="badge-item" style="text-align: center; padding: var(--spacing-4); background: var(--gray-50); border-radius: 12px;">
                        <div style="font-size: 3rem; margin-bottom: var(--spacing-2);">🎯</div>
                        <h4>Goal Achiever</h4>
                        <p style="font-size: var(--font-size-sm); color: var(--gray-600);">Consistently meets targets</p>
                    </div>
                </div>
            </section>

            <section class="card" style="margin-bottom: var(--spacing-6);">
                <h2>🎉 Give Recognition</h2>
                <form id="recognitionForm" style="margin-top: var(--spacing-4);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-4);">
                        <div class="form-group">
                            <label for="recognitionEmployee" class="form-label">Employee</label>
                            <select id="recognitionEmployee" class="form-input" required>
                                <option value="">Select employee</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="recognitionBadge" class="form-label">Badge</label>
                            <select id="recognitionBadge" class="form-input" required>
                                <option value="">Select badge</option>
                                <option value="star">🌟 Star Performer</option>
                                <option value="team">🤝 Team Player</option>
                                <option value="innovator">💡 Innovator</option>
                                <option value="achiever">🎯 Goal Achiever</option>
                                <option value="leader">👑 Leadership</option>
                                <option value="mentor">🎓 Mentor</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="recognitionMessage" class="form-label">Recognition Message</label>
                        <textarea id="recognitionMessage" class="form-input" rows="3" placeholder="Write a message explaining why this person deserves recognition..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">🏆 Give Recognition</button>
                </form>
            </section>

            <section class="card">
                <h2>📜 Recent Recognitions</h2>
                <div id="recentRecognitions" style="margin-top: var(--spacing-4);">
                    <!-- Recent recognitions will be loaded here -->
                </div>
            </section>
        </div>
    `;
}

function getGalleryContent() {
    return `<div class="component-content"><div style="text-align: center; padding: 60px 20px;"><h3>📸 Photo Gallery</h3><p>Share and view photos from events</p></div></div>`;
}

// Initialize profiles functionality
function initializeProfiles() {
    loadAllProfiles();

    // Add search input listener
    document.getElementById('profileSearchInput').addEventListener('input', searchProfiles);

    // Define search and filter functions
    window.searchProfiles = function() {
        const query = document.getElementById('profileSearchInput').value.toLowerCase();
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');

        const filtered = employees.filter(emp =>
            emp.firstName.toLowerCase().includes(query) ||
            emp.lastName.toLowerCase().includes(query) ||
            emp.department.toLowerCase().includes(query) ||
            emp.position.toLowerCase().includes(query) ||
            emp.email.toLowerCase().includes(query)
        );

        displayProfiles(filtered);
    };

    window.filterProfiles = function(dept) {
        // Update filter button states
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        const filtered = dept === 'all' ? employees : employees.filter(emp => emp.department === dept);

        displayProfiles(filtered);
    };

    window.viewProfile = function(empId) {
        showToast('Opening employee profile...', 'info');
    };

    window.sendMessage = function(empId) {
        showToast('Opening chat with employee...', 'info');
    };
}

function loadAllProfiles() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    displayProfiles(employees);
}

function displayProfiles(employees) {
    const container = document.getElementById('profilesGrid');

    if (employees.length === 0) {
        container.innerHTML = '<p style="color: var(--gray-600); text-align: center; grid-column: 1 / -1;">No employees found</p>';
        return;
    }

    const profileImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face'
    ];

    const html = employees.map((emp, index) => `
        <div class="profile-card" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4); text-align: center; transition: all 0.3s ease;">
            ${createAvatarElement(`${emp.firstName} ${emp.lastName}`, profileImages[index % profileImages.length], 80)}
            <h4 style="margin-bottom: var(--spacing-1); color: var(--gray-800);">${emp.firstName} ${emp.lastName}</h4>
            <p style="color: var(--gray-600); margin-bottom: var(--spacing-1); font-weight: 600;">${emp.position}</p>
            <p style="font-size: var(--font-size-sm); color: var(--gray-500); margin-bottom: var(--spacing-2);">${emp.department}</p>
            ${emp.location ? `<p style="font-size: var(--font-size-sm); color: var(--gray-500); margin-bottom: var(--spacing-2);">📍 ${emp.location}</p>` : ''}
            <div style="display: flex; align-items: center; justify-content: center; gap: var(--spacing-1); margin-bottom: var(--spacing-3);">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${emp.status === 'Online' ? '#10b981' : emp.status === 'Away' ? '#f59e0b' : '#6b7280'};"></span>
                <span style="font-size: var(--font-size-sm); color: ${emp.status === 'Online' ? '#10b981' : emp.status === 'Away' ? '#f59e0b' : '#6b7280'};">${emp.status || 'Online'}</span>
            </div>
            <div style="display: flex; gap: var(--spacing-2); justify-content: center;">
                <button class="btn btn-secondary" onclick="viewDetailedProfile(${emp.id})" style="padding: 8px 16px; font-size: 0.8rem;">👁️ View</button>
                <button class="btn btn-primary" onclick="sendMessage(${emp.id})" style="padding: 8px 16px; font-size: 0.8rem;">💬 Chat</button>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;

    // Add hover effects
    setTimeout(() => {
        document.querySelectorAll('.profile-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }, 100);
}
function initializePayroll() {
    loadPayrollData();

    // Define calculator function
    window.calculateSalary = function() {
        const baseSalary = parseFloat(document.getElementById('baseSalary').value) || 0;
        const bonus = parseFloat(document.getElementById('bonus').value) || 0;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;

        const netSalary = baseSalary + bonus - deductions;
        const formattedSalary = formatIndianCurrency(netSalary);
        document.getElementById('netSalary').value = formattedSalary;

        showToast(`Net salary calculated: ${formattedSalary}`, 'success');
    };

    // Add input listeners for real-time calculation
    ['baseSalary', 'bonus', 'deductions'].forEach(id => {
        document.getElementById(id).addEventListener('input', calculateSalary);
    });
}

// Indian currency formatting function
function formatIndianCurrency(amount) {
    if (amount === 0) return '₹0';

    const numStr = Math.abs(amount).toString();
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);

    if (otherNumbers !== '') {
        const formattedOthers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
        return `₹${amount < 0 ? '-' : ''}${formattedOthers},${lastThree}`;
    } else {
        return `₹${amount < 0 ? '-' : ''}${lastThree}`;
    }
}

function loadPayrollData() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const container = document.getElementById('payrollTable');

    if (employees.length === 0) {
        container.innerHTML = '<p style="color: var(--gray-600); text-align: center;">No employee data available</p>';
        return;
    }

    const profileImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    ];

    const html = `
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <thead style="background: var(--gray-50);">
                <tr>
                    <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--gray-200);">Employee</th>
                    <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--gray-200);">Department</th>
                    <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--gray-200);">Base Salary</th>
                    <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--gray-200);">Bonus</th>
                    <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--gray-200);">Net Salary</th>
                    <th style="padding: 15px; text-align: left; border-bottom: 1px solid var(--gray-200);">Status</th>
                </tr>
            </thead>
            <tbody>
                ${employees.map((emp, index) => {
                    const baseSalary = parseFloat(emp.salary) || 350000; // Updated to Indian salary range
                    const bonus = Math.floor(Math.random() * 50000) + 10000; // Updated bonus range
                    const netSalary = baseSalary + bonus;

                    return `
                        <tr style="border-bottom: 1px solid var(--gray-100);">
                            <td style="padding: 15px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <img src="${profileImages[index % profileImages.length]}" alt="${emp.firstName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                                    <div>
                                        <div style="font-weight: 600;">${emp.firstName} ${emp.lastName}</div>
                                        <div style="font-size: 0.8rem; color: var(--gray-500);">${emp.position}</div>
                                    </div>
                                </div>
                            </td>
                            <td style="padding: 15px; color: var(--gray-600);">${emp.department}</td>
                            <td style="padding: 15px; font-weight: 600;">${formatIndianCurrency(baseSalary)}</td>
                            <td style="padding: 15px; color: var(--accent-color);">${formatIndianCurrency(bonus)}</td>
                            <td style="padding: 15px; font-weight: 700; color: var(--primary-color);">${formatIndianCurrency(netSalary)}</td>
                            <td style="padding: 15px;">
                                <span style="background: var(--accent-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Paid</span>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}
function initializeChat() {
    console.log('=== INITIALIZING CHAT ===');
    try {
        console.log('Calling loadChatList()...');
        loadChatList();
        console.log('Chat list loaded successfully');
        let currentChatId = null;

    // Define chat functions
    window.openChat = function(empId, empName) {
        currentChatId = empId;

        // Find employee details from the employees array
        const employee = employees.find(emp => emp.id == empId || `${emp.firstName} ${emp.lastName}` === empName);
        const employeeDetails = employee || {
            name: empName,
            position: 'Employee',
            department: 'General',
            email: empName.toLowerCase().replace(' ', '.') + '@company.com',
            status: 'Online'
        };

        document.getElementById('chatHeader').innerHTML = `
            <div style="display: flex; align-items: center; gap: var(--spacing-3); flex: 1;">
                <div style="position: relative;">
                    ${createAvatarElement(empName, employee ? employee.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(empName)}&background=6366f1&color=fff&size=50`, 50)}
                    <div style="position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; border-radius: 50%; background: ${employeeDetails.status === 'Online' ? '#10b981' : employeeDetails.status === 'Away' ? '#f59e0b' : '#6b7280'}; border: 2px solid white;"></div>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <h4 style="margin: 0; font-size: 1.1rem; font-weight: 600;">${employee ? employee.name : empName}</h4>
                    <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: var(--gray-600);">${employee ? employee.position : employeeDetails.position} • ${employee ? employee.department : employeeDetails.department}</p>
                    <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: var(--gray-500);">${employee ? employee.email : employeeDetails.email}</p>
                </div>
                <div style="display: flex; gap: var(--spacing-2);">
                    <button onclick="showChatEmployeeProfile('${empId}', '${empName}')" style="background: var(--gray-100); border: none; padding: 8px; border-radius: 6px; cursor: pointer; color: var(--gray-600); display: flex; align-items: center; justify-content: center;" title="View Profile">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </button>
                    <button onclick="closeChatModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); padding: 4px 8px;">×</button>
                </div>
            </div>
        `;
        document.getElementById('messageInput').disabled = false;
        document.getElementById('sendBtn').disabled = false;

        loadChatMessages(empId, empName);
    };

    window.sendChatMessage = function() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (message && currentChatId) {
            addMessageToChat(currentChatId, message, true);
            input.value = '';

            // Generate contextual response based on message content
            setTimeout(() => {
                const response = generateContextualResponse(message);
                addMessageToChat(currentChatId, response, false);
            }, Math.random() * 3000 + 2000);
        }
    };

    // Add enter key listener
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    } catch (error) {
        console.error('Error initializing chat:', error);
    }
}

function loadChatMessages(empId, empName) {
    const chatKey = `chat_${empId}`;
    let messages = JSON.parse(localStorage.getItem(chatKey) || '[]');

    // Add contextual sample messages based on employee name if none exist
    if (messages.length === 0) {
        messages = generateInitialConversation(empName, empId);
        localStorage.setItem(chatKey, JSON.stringify(messages));
    }

    displayChatMessages(messages, empName);
}

function generateInitialConversation(empName, empId) {
    const conversations = {
        'Sarah Wilson': [
            {
                id: 1,
                text: "Hi! I wanted to follow up on the Q4 performance review process.",
                sender: empName,
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                isMe: false,
                seen: true
            },
            {
                id: 2,
                text: "Sure! I've been working on the evaluation criteria. Should have it ready by Friday.",
                sender: "You",
                timestamp: new Date(Date.now() - 6600000).toISOString(),
                isMe: true,
                seen: true
            },
            {
                id: 3,
                text: "That sounds perfect! Also, congratulations on the recent recognition! 🎉",
                sender: empName,
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                isMe: false,
                seen: true
            }
        ],
        'Mike Johnson': [
            {
                id: 1,
                text: "Hey! Did you see my latest post in the social feed?",
                sender: empName,
                timestamp: new Date(Date.now() - 5400000).toISOString(),
                isMe: false,
                seen: true
            },
            {
                id: 2,
                text: "Yes! Great insights about the team collaboration tools.",
                sender: "You",
                timestamp: new Date(Date.now() - 4800000).toISOString(),
                isMe: true,
                seen: true
            },
            {
                id: 3,
                text: "Thanks! I think implementing those changes could really boost our productivity.",
                sender: empName,
                timestamp: new Date(Date.now() - 2400000).toISOString(),
                isMe: false,
                seen: true
            }
        ],
        'Jane Smith': [
            {
                id: 1,
                text: "Hi! The new poll about flexible working hours is getting great responses!",
                sender: empName,
                timestamp: new Date(Date.now() - 4800000).toISOString(),
                isMe: false,
                seen: true
            },
            {
                id: 2,
                text: "That's awesome! I voted for the hybrid model. What's the current tally?",
                sender: "You",
                timestamp: new Date(Date.now() - 4200000).toISOString(),
                isMe: true,
                seen: true
            },
            {
                id: 3,
                text: "Hybrid is leading with 65% votes! I'll compile the results by end of week.",
                sender: empName,
                timestamp: new Date(Date.now() - 1800000).toISOString(),
                isMe: false,
                seen: true
            }
        ]
    };

    // Return specific conversation or default
    return conversations[empName] || [
        {
            id: 1,
            text: "Hey! How's everything going?",
            sender: empName,
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            isMe: false,
            seen: true
        },
        {
            id: 2,
            text: "Going well! Thanks for checking in.",
            sender: "You",
            timestamp: new Date(Date.now() - 3000000).toISOString(),
            isMe: true,
            seen: true
        },
        {
            id: 3,
            text: "Great! Let me know if you need anything.",
            sender: empName,
            timestamp: new Date(Date.now() - 2400000).toISOString(),
            isMe: false,
            seen: true
        }
    ];
}

function displayChatMessages(messages, empName) {
    const chatMessages = document.getElementById('chatMessages');



    const html = messages.map(message => {
        const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <div style="display: flex; align-items: end; gap: var(--spacing-2); margin-bottom: var(--spacing-3); ${message.isMe ? 'flex-direction: row-reverse;' : ''}">
                ${message.isMe
                    ? createAvatarElement('You', 'https://ui-avatars.com/api/?name=You&background=6366f1&color=fff&size=32', 32)
                    : createAvatarElement(empName, `https://ui-avatars.com/api/?name=${encodeURIComponent(empName)}&background=10b981&color=fff&size=32`, 32)
                }
                <div style="max-width: 70%;">
                    <div style="background: ${message.isMe ? 'var(--primary-color)' : 'var(--gray-200)'}; color: ${message.isMe ? 'white' : 'var(--gray-800)'}; padding: var(--spacing-2) var(--spacing-3); border-radius: 18px; ${message.isMe ? 'border-bottom-right-radius: 4px;' : 'border-bottom-left-radius: 4px;'}">
                        <p style="margin: 0; line-height: 1.4;">${message.text}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: var(--spacing-1); margin-top: 4px; ${message.isMe ? 'justify-content: flex-end;' : ''}">
                        <small style="color: var(--gray-500); font-size: 0.75rem;">${time}</small>
                        ${message.isMe ? `<span style="color: ${message.seen ? 'var(--primary-color)' : 'var(--gray-400)'}; font-size: 0.75rem;">${message.seen ? '✓✓' : '✓'}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    chatMessages.innerHTML = html;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessageToChat(empId, messageText, isMe) {
    const chatKey = `chat_${empId}`;
    const messages = JSON.parse(localStorage.getItem(chatKey) || '[]');

    const newMessage = {
        id: Date.now(),
        text: messageText,
        sender: isMe ? "You" : "Employee",
        timestamp: new Date().toISOString(),
        isMe: isMe,
        seen: false
    };

    messages.push(newMessage);
    localStorage.setItem(chatKey, JSON.stringify(messages));

    // Get employee name from current chat header
    const headerText = document.getElementById('chatHeader').textContent;
    const empName = headerText.replace('Chat with ', '').split('\n')[0];

    displayChatMessages(messages, empName);

    if (isMe) {
        showToast('Message sent!', 'success');

        // Mark as seen after 1 second
        setTimeout(() => {
            newMessage.seen = true;
            localStorage.setItem(chatKey, JSON.stringify(messages));
            displayChatMessages(messages, empName);
        }, 1000);
    }
}

function loadChatList() {
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');

    // Add default chat contacts if no employees exist
    if (employees.length === 0) {
        employees = [
            {
                id: 1,
                firstName: 'Sarah',
                lastName: 'Wilson',
                status: 'Online',
                position: 'HR Manager',
                department: 'Human Resources',
                email: 'sarah.wilson@company.com',
                phone: '+1 (555) 123-4567',
                joinDate: '2022-03-15',
                location: 'New York, NY'
            },
            {
                id: 2,
                firstName: 'Mike',
                lastName: 'Johnson',
                status: 'Online',
                position: 'Software Engineer',
                department: 'Engineering',
                email: 'mike.johnson@company.com',
                phone: '+1 (555) 234-5678',
                joinDate: '2021-08-20',
                location: 'San Francisco, CA'
            },
            {
                id: 3,
                firstName: 'Jane',
                lastName: 'Smith',
                status: 'Away',
                position: 'Marketing Specialist',
                department: 'Marketing',
                email: 'jane.smith@company.com',
                phone: '+1 (555) 345-6789',
                joinDate: '2023-01-10',
                location: 'Chicago, IL'
            },
            {
                id: 4,
                firstName: 'David',
                lastName: 'Brown',
                status: 'Online',
                position: 'Financial Analyst',
                department: 'Finance',
                email: 'david.brown@company.com',
                phone: '+1 (555) 456-7890',
                joinDate: '2022-11-05',
                location: 'Boston, MA'
            },
            {
                id: 5,
                firstName: 'Lisa',
                lastName: 'Davis',
                status: 'Offline',
                position: 'UX Designer',
                department: 'Design',
                email: 'lisa.davis@company.com',
                phone: '+1 (555) 567-8901',
                joinDate: '2023-06-12',
                location: 'Austin, TX'
            }
        ];
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    const container = document.getElementById('chatList');

    if (!container) {
        console.error('Chat list container not found!');
        return;
    }

    const profileImages = [
        'https://ui-avatars.com/api/?name=Sarah+Wilson&background=6366f1&color=fff&size=50',
        'https://ui-avatars.com/api/?name=Mike+Johnson&background=8b5cf6&color=fff&size=50',
        'https://ui-avatars.com/api/?name=Jane+Smith&background=06b6d4&color=fff&size=50',
        'https://ui-avatars.com/api/?name=David+Brown&background=10b981&color=fff&size=50',
        'https://ui-avatars.com/api/?name=Lisa+Davis&background=f59e0b&color=fff&size=50'
    ];

    const html = employees.map((emp, index) => `
        <div class="chat-item" onclick="openChat(${emp.id}, '${emp.firstName} ${emp.lastName}')" style="display: flex; align-items: center; gap: var(--spacing-3); padding: var(--spacing-3); cursor: pointer; border-bottom: 1px solid var(--gray-100); transition: background 0.2s;">
            ${createAvatarElement(`${emp.firstName} ${emp.lastName}`, profileImages[index % profileImages.length], 40)}
            <div style="flex: 1; min-width: 0;">
                <div style="font-weight: 600; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${emp.firstName} ${emp.lastName}</div>
                <div style="font-size: var(--font-size-sm); color: ${emp.status === 'Online' ? '#10b981' : emp.status === 'Away' ? '#f59e0b' : '#6b7280'};">
                    <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${emp.status === 'Online' ? '#10b981' : emp.status === 'Away' ? '#f59e0b' : '#6b7280'}; margin-right: 6px;"></span>
                    ${emp.status}
                </div>
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--gray-400);">
                ${Math.floor(Math.random() * 60)}m
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
    console.log('Chat list loaded with', employees.length, 'employees');

    // Add hover effects and ensure images load
    setTimeout(() => {
        document.querySelectorAll('.chat-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.background = 'var(--gray-50)';
            });
            item.addEventListener('mouseleave', function() {
                this.style.background = 'transparent';
            });
        });

        // Force image loading check
        document.querySelectorAll('.chat-item img').forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                img.onerror();
            }
        });
    }, 100);
}
function initializeSocialFeed() {
    loadSocialPosts();

    // Add emoji function
    window.addEmoji = function(emoji) {
        const textarea = document.getElementById('postContent');
        textarea.value += emoji + ' ';
        textarea.focus();
    };

    // Handle post submission
    document.getElementById('newPostForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const content = document.getElementById('postContent').value.trim();
        if (!content) return;

        const newPost = {
            id: Date.now(),
            content: content,
            author: 'You',
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: []
        };

        // Save to localStorage
        const posts = JSON.parse(localStorage.getItem('socialPosts') || '[]');
        posts.unshift(newPost);
        localStorage.setItem('socialPosts', JSON.stringify(posts));

        // Clear form and reload posts
        this.reset();
        loadSocialPosts();

        showToast('Post shared successfully!', 'success');
    });
}

function loadSocialPosts() {
    let posts = JSON.parse(localStorage.getItem('socialPosts') || '[]');

    // Add sample posts if none exist
    if (posts.length === 0) {
        posts = [
            {
                id: 1,
                content: "Excited to announce our Q4 results! Great work everyone! 🎉",
                author: "Sarah Wilson",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                likes: 12,
                comments: ['Great job team!', 'Congratulations!']
            },
            {
                id: 2,
                content: "Just finished the new employee onboarding session. Welcome to our new team members! 👋",
                author: "Mike Johnson",
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                likes: 8,
                comments: ['Welcome aboard!']
            },
            {
                id: 3,
                content: "Coffee break time! ☕ Anyone wants to join me in the break room?",
                author: "Jane Smith",
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                likes: 5,
                comments: []
            }
        ];
        localStorage.setItem('socialPosts', JSON.stringify(posts));
    }

    const container = document.getElementById('socialFeedPosts');
    const profileImages = [
        'https://ui-avatars.com/api/?name=Sarah+Wilson&background=6366f1&color=fff&size=50',
        'https://ui-avatars.com/api/?name=Mike+Johnson&background=8b5cf6&color=fff&size=50',
        'https://ui-avatars.com/api/?name=Jane+Smith&background=06b6d4&color=fff&size=50'
    ];

    const html = posts.map((post, index) => `
        <div class="social-post" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-4); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: flex-start; gap: var(--spacing-3); margin-bottom: var(--spacing-3);">
                <img src="${profileImages[index % profileImages.length]}" alt="${post.author}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
                <div style="flex: 1; min-width: 0;">
                    <h4 style="margin: 0 0 4px 0; font-weight: 600; color: var(--gray-800);">${post.author}</h4>
                    <p style="font-size: var(--font-size-sm); color: var(--gray-500); margin: 0;">${new Date(post.timestamp).toLocaleString()}</p>
                </div>
            </div>
            <p style="margin-bottom: var(--spacing-3); line-height: 1.6; color: var(--gray-700); word-wrap: break-word;">${post.content}</p>
            <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-2); padding-top: var(--spacing-2); border-top: 1px solid var(--gray-100);">
                <button class="btn btn-secondary" onclick="likePost(${post.id})" style="padding: 8px 16px; font-size: 0.9rem; flex: 1; min-width: 120px; max-width: 200px;">
                    👍 ${post.likes} Likes
                </button>
                <button class="btn btn-secondary" onclick="commentPost(${post.id})" style="padding: 8px 16px; font-size: 0.9rem; flex: 1; min-width: 120px; max-width: 200px;">
                    💬 ${post.comments.length} Comments
                </button>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;

    // Define interaction functions
    window.likePost = function(postId) {
        const posts = JSON.parse(localStorage.getItem('socialPosts') || '[]');
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            localStorage.setItem('socialPosts', JSON.stringify(posts));
            loadSocialPosts();
            showToast('Post liked!', 'success');
        }
    };

    window.commentPost = function(postId) {
        const comment = prompt('Add a comment:');
        if (comment) {
            const posts = JSON.parse(localStorage.getItem('socialPosts') || '[]');
            const post = posts.find(p => p.id === postId);
            if (post) {
                post.comments.push(comment);
                localStorage.setItem('socialPosts', JSON.stringify(posts));
                loadSocialPosts();
                showToast('Comment added!', 'success');
            }
        }
    };
}
function initializeAnnouncements() {
    loadAnnouncements();

    // Handle form submission
    document.getElementById('announcementForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('announcementTitle').value;
        const type = document.getElementById('announcementType').value;
        const content = document.getElementById('announcementContent').value;

        const newAnnouncement = {
            id: Date.now(),
            title,
            type,
            content,
            author: 'HR Department',
            timestamp: new Date().toISOString(),
            priority: type === 'urgent' ? 'high' : 'normal'
        };

        // Save to localStorage
        const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        announcements.unshift(newAnnouncement);
        localStorage.setItem('announcements', JSON.stringify(announcements));

        // Clear form and reload
        this.reset();
        loadAnnouncements();

        showToast('Announcement posted successfully!', 'success');
    });
}

function loadAnnouncements() {
    let announcements = JSON.parse(localStorage.getItem('announcements') || '[]');

    // Add sample announcements if none exist
    if (announcements.length === 0) {
        announcements = [
            {
                id: 1,
                title: "Holiday Schedule Update",
                type: "general",
                content: "Please note the updated holiday schedule for December. The office will be closed from Dec 24-26 and Jan 1st.",
                author: "HR Department",
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                priority: "normal"
            },
            {
                id: 2,
                title: "Security System Maintenance",
                type: "urgent",
                content: "The building security system will undergo maintenance this Saturday from 6 AM to 10 AM. Please use the main entrance only.",
                author: "Facilities Team",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                priority: "high"
            },
            {
                id: 3,
                title: "Team Building Event",
                type: "event",
                content: "Join us for our quarterly team building event next Friday at 3 PM in the main conference room. Pizza and games!",
                author: "HR Department",
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                priority: "normal"
            }
        ];
        localStorage.setItem('announcements', JSON.stringify(announcements));
    }

    const container = document.getElementById('announcementsList');

    const typeIcons = {
        general: '📢',
        urgent: '🚨',
        event: '📅',
        policy: '📋',
        celebration: '🎉'
    };

    const typeColors = {
        general: '#3b82f6',
        urgent: '#ef4444',
        event: '#10b981',
        policy: '#f59e0b',
        celebration: '#8b5cf6'
    };

    const html = announcements.map(announcement => `
        <div class="announcement-item" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-4); ${announcement.priority === 'high' ? 'border-left: 4px solid #ef4444;' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-2);">
                <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                    <span style="font-size: 1.5rem;">${typeIcons[announcement.type]}</span>
                    <h3 style="color: var(--gray-800);">${announcement.title}</h3>
                    ${announcement.priority === 'high' ? '<span style="background: #ef4444; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">URGENT</span>' : ''}
                </div>
                <span style="font-size: var(--font-size-sm); color: var(--gray-500);">${new Date(announcement.timestamp).toLocaleDateString()}</span>
            </div>
            <p style="color: var(--gray-700); line-height: 1.6; margin-bottom: var(--spacing-2);">${announcement.content}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--spacing-2); border-top: 1px solid var(--gray-100);">
                <span style="font-size: var(--font-size-sm); color: var(--gray-500);">By ${announcement.author}</span>
                <span style="background: ${typeColors[announcement.type]}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; text-transform: capitalize;">${announcement.type}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}
function initializeEvents() {
    let currentDate = new Date();

    loadCalendar();
    loadUpcomingEvents();
    loadAllEvents();

    // Handle form submission
    document.getElementById('eventForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('eventTitle').value;
        const type = document.getElementById('eventType').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const description = document.getElementById('eventDescription').value;
        const location = document.getElementById('eventLocation').value;

        const newEvent = {
            id: Date.now(),
            title,
            type,
            date,
            time,
            description,
            location,
            createdBy: 'You',
            createdDate: new Date().toISOString()
        };

        // Save to localStorage
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));

        // Clear form and reload
        this.reset();
        loadCalendar();
        loadUpcomingEvents();
        loadAllEvents();

        showToast('Event created successfully!', 'success');
    });

    // Define navigation functions
    window.previousMonth = function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        loadCalendar();
    };

    window.nextMonth = function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        loadCalendar();
    };

    function loadCalendar() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        document.getElementById('currentMonth').textContent =
            `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const events = JSON.parse(localStorage.getItem('events') || '[]');
        const calendarGrid = document.getElementById('calendarGrid');

        let calendarHTML = '';

        // Day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            calendarHTML += `<div style="background: var(--gray-100); padding: 10px; text-align: center; font-weight: 600; font-size: 0.8rem;">${day}</div>`;
        });

        // Calendar days
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();
            const dateString = date.toISOString().split('T')[0];

            // Check for events on this date
            const dayEvents = events.filter(event => event.date === dateString);

            calendarHTML += `
                <div style="background: white; padding: 8px; min-height: 60px; border: 1px solid var(--gray-100); ${isToday ? 'background: #e6f3ff; border-color: var(--primary-color);' : ''} ${!isCurrentMonth ? 'opacity: 0.3;' : ''}">
                    <div style="font-weight: ${isToday ? '700' : '500'}; color: ${isToday ? 'var(--primary-color)' : 'var(--gray-800)'}; margin-bottom: 4px;">
                        ${date.getDate()}
                    </div>
                    ${dayEvents.map(event => `
                        <div style="background: var(--primary-color); color: white; padding: 2px 4px; border-radius: 3px; font-size: 0.7rem; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${event.title}">
                            ${event.title}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        calendarGrid.innerHTML = calendarHTML;
    }

    function loadUpcomingEvents() {
        let events = JSON.parse(localStorage.getItem('events') || '[]');

        // Add sample events if none exist
        if (events.length === 0) {
            const today = new Date();
            events = [
                {
                    id: 1,
                    title: "Team Meeting",
                    type: "meeting",
                    date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    time: "10:00",
                    description: "Weekly team sync and project updates",
                    location: "Conference Room A",
                    createdBy: "Manager",
                    createdDate: new Date().toISOString()
                },
                {
                    id: 2,
                    title: "Training Session",
                    type: "training",
                    date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    time: "14:00",
                    description: "New software training for all employees",
                    location: "Training Room",
                    createdBy: "HR",
                    createdDate: new Date().toISOString()
                },
                {
                    id: 3,
                    title: "Company Picnic",
                    type: "social",
                    date: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    time: "12:00",
                    description: "Annual company picnic and team building activities",
                    location: "Central Park",
                    createdBy: "HR",
                    createdDate: new Date().toISOString()
                }
            ];
            localStorage.setItem('events', JSON.stringify(events));
        }

        // Filter upcoming events (next 30 days)
        const today = new Date();
        const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

        const upcomingEvents = events
            .filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= today && eventDate <= thirtyDaysFromNow;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);

        const container = document.getElementById('upcomingEvents');

        if (upcomingEvents.length === 0) {
            container.innerHTML = '<p style="color: var(--gray-600); text-align: center; font-size: 0.9rem;">No upcoming events</p>';
            return;
        }

        const typeIcons = {
            meeting: '🤝',
            training: '📚',
            social: '🎉',
            deadline: '⏰',
            holiday: '🏖️',
            conference: '🎤'
        };

        const html = upcomingEvents.map(event => {
            const eventDate = new Date(event.date);
            const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

            return `
                <div class="upcoming-event" style="padding: 12px; border: 1px solid var(--gray-200); border-radius: 8px; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                        <span style="font-size: 1.2rem;">${typeIcons[event.type]}</span>
                        <h4 style="margin: 0; font-size: 0.9rem;">${event.title}</h4>
                    </div>
                    <div style="font-size: 0.8rem; color: var(--gray-600); margin-bottom: 4px;">
                        ${eventDate.toLocaleDateString()} at ${event.time}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--gray-500);">
                        ${daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }

    function loadAllEvents() {
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        const container = document.getElementById('allEventsList');

        if (events.length === 0) {
            container.innerHTML = '<p style="color: var(--gray-600); text-align: center;">No events created yet</p>';
            return;
        }

        const typeIcons = {
            meeting: '🤝',
            training: '📚',
            social: '🎉',
            deadline: '⏰',
            holiday: '🏖️',
            conference: '🎤'
        };

        const sortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date));

        const html = sortedEvents.map(event => `
            <div class="event-item" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-3);">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-2);">
                    <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                        <span style="font-size: 1.5rem;">${typeIcons[event.type]}</span>
                        <div>
                            <h3 style="margin-bottom: 4px;">${event.title}</h3>
                            <div style="font-size: var(--font-size-sm); color: var(--gray-600);">
                                ${new Date(event.date).toLocaleDateString()} at ${event.time}
                                ${event.location ? ` • ${event.location}` : ''}
                            </div>
                        </div>
                    </div>
                    <span style="background: var(--primary-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; text-transform: capitalize;">${event.type}</span>
                </div>
                <p style="color: var(--gray-700); line-height: 1.6; margin-bottom: var(--spacing-2);">${event.description}</p>
                <div style="font-size: var(--font-size-sm); color: var(--gray-500); padding-top: var(--spacing-2); border-top: 1px solid var(--gray-100);">
                    Created by ${event.createdBy} on ${new Date(event.createdDate).toLocaleDateString()}
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }
}
function initializePolls() {
    loadActivePolls();
    loadPollResults();

    // Handle poll type change
    document.getElementById('pollType').addEventListener('change', function() {
        const pollType = this.value;
        const optionsContainer = document.getElementById('pollOptionsContainer');

        if (pollType === 'multiple') {
            optionsContainer.style.display = 'block';
        } else {
            optionsContainer.style.display = 'none';
        }
    });

    // Handle form submission
    document.getElementById('pollForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const question = document.getElementById('pollQuestion').value;
        const type = document.getElementById('pollType').value;
        const description = document.getElementById('pollDescription').value;

        let options = [];
        if (type === 'multiple') {
            const optionInputs = document.querySelectorAll('#pollOptions input');
            options = Array.from(optionInputs)
                .map(input => input.value.trim())
                .filter(option => option !== '');

            if (options.length < 2) {
                showToast('Please provide at least 2 options for multiple choice poll', 'error');
                return;
            }
        } else if (type === 'yesno') {
            options = ['Yes', 'No'];
        } else if (type === 'rating') {
            options = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
        }

        const newPoll = {
            id: Date.now(),
            question,
            type,
            description,
            options,
            votes: options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {}),
            totalVotes: 0,
            createdBy: 'You',
            createdDate: new Date().toISOString(),
            isActive: true,
            voters: []
        };

        // Save to localStorage
        const polls = JSON.parse(localStorage.getItem('polls') || '[]');
        polls.unshift(newPoll);
        localStorage.setItem('polls', JSON.stringify(polls));

        // Clear form and reload
        this.reset();
        document.getElementById('pollOptionsContainer').style.display = 'none';
        loadActivePolls();
        loadPollResults();

        showToast('Poll created successfully!', 'success');
    });

    // Define helper functions
    window.addPollOption = function() {
        const optionsContainer = document.getElementById('pollOptions');
        const optionCount = optionsContainer.children.length + 1;

        const optionDiv = document.createElement('div');
        optionDiv.className = 'poll-option-input';
        optionDiv.style.cssText = 'display: flex; gap: var(--spacing-2); margin-bottom: var(--spacing-2);';
        optionDiv.innerHTML = `
            <input type="text" class="form-input" placeholder="Option ${optionCount}" style="flex: 1;">
            <button type="button" class="btn btn-secondary" onclick="removePollOption(this)" style="padding: 8px 12px;">❌</button>
        `;

        optionsContainer.appendChild(optionDiv);
    };

    window.removePollOption = function(button) {
        const optionsContainer = document.getElementById('pollOptions');
        if (optionsContainer.children.length > 2) {
            button.parentElement.remove();
        } else {
            showToast('Poll must have at least 2 options', 'error');
        }
    };

    window.votePoll = function(pollId, option) {
        const polls = JSON.parse(localStorage.getItem('polls') || '[]');
        const poll = polls.find(p => p.id === pollId);

        if (!poll) return;

        // Check if user already voted
        if (poll.voters.includes('current_user')) {
            showToast('You have already voted in this poll', 'error');
            return;
        }

        // Add vote
        poll.votes[option]++;
        poll.totalVotes++;
        poll.voters.push('current_user');

        localStorage.setItem('polls', JSON.stringify(polls));

        loadActivePolls();
        loadPollResults();

        showToast('Vote recorded successfully!', 'success');
    };

    // Poll preview function
    window.showPollPreview = function() {
        const question = document.getElementById('pollQuestion').value;
        const type = document.getElementById('pollType').value;
        const description = document.getElementById('pollDescription').value;

        if (!question || !type) {
            showToast('Please fill in the question and type first', 'error');
            return;
        }

        let options = [];
        if (type === 'multiple') {
            const optionInputs = document.querySelectorAll('#pollOptions input');
            options = Array.from(optionInputs)
                .map(input => input.value.trim())
                .filter(option => option !== '');

            if (options.length < 2) {
                showToast('Please provide at least 2 options for preview', 'error');
                return;
            }
        } else if (type === 'yesno') {
            options = ['Yes', 'No'];
        } else if (type === 'rating') {
            options = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
        }

        const previewContainer = document.getElementById('pollPreview');
        const previewContent = document.getElementById('previewContent');

        const previewHTML = `
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4);">
                <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-3);">
                    <span style="font-size: 1.5rem;">📊</span>
                    <h3>${question}</h3>
                    <span style="background: var(--accent-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Preview</span>
                </div>

                ${description ? `<p style="color: var(--gray-600); margin-bottom: var(--spacing-3);">${description}</p>` : ''}

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--spacing-3);">
                    ${options.map((option, index) => {
                        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
                        const optionColor = colors[index % colors.length];

                        return `
                            <div style="
                                background: white;
                                border: 2px solid var(--gray-200);
                                border-radius: 12px;
                                padding: var(--spacing-3);
                                text-align: center;
                            ">
                                <div style="font-size: 2rem; margin-bottom: var(--spacing-2);">
                                    ${type === 'rating' ? '⭐'.repeat(index + 1) :
                                      type === 'yesno' ? (option === 'Yes' ? '✅' : '❌') :
                                      ['📊', '🎯', '💡', '🚀', '⚡', '🎉'][index % 6]}
                                </div>

                                <h4 style="margin-bottom: var(--spacing-2); color: ${optionColor}; font-weight: 600;">${option}</h4>

                                <div style="margin-bottom: var(--spacing-2);">
                                    <div style="font-size: 1.5rem; font-weight: bold; color: ${optionColor};">0</div>
                                    <div style="font-size: 0.8rem; color: var(--gray-500);">votes</div>
                                </div>

                                <div style="margin-bottom: var(--spacing-2);">
                                    <div style="width: 60px; height: 60px; margin: 0 auto; position: relative; border-radius: 50%; background: var(--gray-200);">
                                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: ${optionColor};">
                                            0%
                                        </div>
                                    </div>
                                </div>

                                <button style="
                                    background: ${optionColor};
                                    color: white;
                                    border: none;
                                    padding: 8px 16px;
                                    border-radius: 6px;
                                    font-size: 0.8rem;
                                    font-weight: 600;
                                    width: 100%;
                                    cursor: pointer;
                                ">
                                    Vote
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        previewContent.innerHTML = previewHTML;
        previewContainer.style.display = 'block';

        // Scroll to preview
        previewContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

        showToast('Poll preview generated!', 'success');
    };

    function loadActivePolls() {
        let polls = JSON.parse(localStorage.getItem('polls') || '[]');

        // Add sample polls if none exist
        if (polls.length === 0) {
            polls = [
                {
                    id: 1,
                    question: "What should be our next team building activity?",
                    type: "multiple",
                    description: "Help us plan the next fun team event!",
                    options: ["Bowling", "Escape Room", "Cooking Class", "Outdoor Picnic"],
                    votes: { "Bowling": 5, "Escape Room": 8, "Cooking Class": 3, "Outdoor Picnic": 6 },
                    totalVotes: 22,
                    createdBy: "HR Team",
                    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    isActive: true,
                    voters: []
                },
                {
                    id: 2,
                    question: "Are you satisfied with the current work-from-home policy?",
                    type: "yesno",
                    description: "Your feedback helps us improve our policies",
                    options: ["Yes", "No"],
                    votes: { "Yes": 15, "No": 3 },
                    totalVotes: 18,
                    createdBy: "Management",
                    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    isActive: true,
                    voters: []
                },
                {
                    id: 3,
                    question: "How would you rate our new office coffee?",
                    type: "rating",
                    description: "We want to know if the new coffee brand is a hit!",
                    options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
                    votes: { "1 Star": 1, "2 Stars": 2, "3 Stars": 4, "4 Stars": 8, "5 Stars": 5 },
                    totalVotes: 20,
                    createdBy: "Office Manager",
                    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    isActive: true,
                    voters: []
                }
            ];
            localStorage.setItem('polls', JSON.stringify(polls));
        }

        const activePolls = polls.filter(poll => poll.isActive);
        const container = document.getElementById('activePolls');

        if (activePolls.length === 0) {
            container.innerHTML = '<p style="color: var(--gray-600); text-align: center;">No active polls at the moment</p>';
            return;
        }

        const typeIcons = {
            multiple: '📊',
            yesno: '✅',
            rating: '⭐',
            feedback: '💬'
        };

        const html = activePolls.map(poll => {
            const hasVoted = poll.voters.includes('current_user');

            return `
                <div class="poll-item" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-4);">
                    <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-3);">
                        <span style="font-size: 1.5rem;">${typeIcons[poll.type]}</span>
                        <h3 style="flex: 1;">${poll.question}</h3>
                        <span style="background: var(--accent-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Active</span>
                    </div>

                    ${poll.description ? `<p style="color: var(--gray-600); margin-bottom: var(--spacing-3);">${poll.description}</p>` : ''}

                    <div class="poll-options-container" style="margin-bottom: var(--spacing-3);">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-3);">
                            ${poll.options.map((option, index) => {
                                const percentage = poll.totalVotes > 0 ? Math.round((poll.votes[option] / poll.totalVotes) * 100) : 0;
                                const maxVotes = Math.max(...Object.values(poll.votes));
                                const isWinning = poll.votes[option] === maxVotes && maxVotes > 0;

                                // Color scheme for different options
                                const colors = [
                                    '#3b82f6', // Blue
                                    '#10b981', // Green
                                    '#f59e0b', // Yellow
                                    '#ef4444', // Red
                                    '#8b5cf6', // Purple
                                    '#06b6d4'  // Cyan
                                ];
                                const optionColor = colors[index % colors.length];

                                return `
                                    <div class="vertical-poll-option ${isWinning ? 'winner' : ''}" style="
                                        background: white;
                                        border: 2px solid ${isWinning ? optionColor : 'var(--gray-200)'};
                                        border-radius: 12px;
                                        padding: var(--spacing-3);
                                        text-align: center;
                                        position: relative;
                                        transition: all 0.3s ease;
                                        ${isWinning ? `box-shadow: 0 4px 12px ${optionColor}30;` : ''}
                                        cursor: ${!hasVoted ? 'pointer' : 'default'};
                                    " ${!hasVoted ? `onclick="votePoll(${poll.id}, '${option}')"` : ''}>

                                        ${isWinning ? '<div class="crown" style="position: absolute; top: -8px; right: -8px; background: #ffd700; color: #333; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold;">👑</div>' : ''}

                                        <div style="font-size: 2rem; margin-bottom: var(--spacing-2);">
                                            ${poll.type === 'rating' ? '⭐'.repeat(index + 1) :
                                              poll.type === 'yesno' ? (option === 'Yes' ? '✅' : '❌') :
                                              ['📊', '🎯', '💡', '🚀', '⚡', '🎉'][index % 6]}
                                        </div>

                                        <h4 style="margin-bottom: var(--spacing-2); color: ${optionColor}; font-weight: 600;">${option}</h4>

                                        <div style="margin-bottom: var(--spacing-2);">
                                            <div style="font-size: 1.5rem; font-weight: bold; color: ${optionColor};">${poll.votes[option]}</div>
                                            <div style="font-size: 0.8rem; color: var(--gray-500);">votes</div>
                                        </div>

                                        <div style="margin-bottom: var(--spacing-2);">
                                            <div style="width: 60px; height: 60px; margin: 0 auto; position: relative; border-radius: 50%; background: conic-gradient(${optionColor} ${percentage * 3.6}deg, var(--gray-200) 0deg); transition: all 0.5s ease;">
                                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: ${optionColor}; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                                    ${percentage}%
                                                </div>
                                            </div>
                                        </div>

                                        ${!hasVoted ? `
                                            <button class="btn" style="
                                                background: ${optionColor};
                                                color: white;
                                                border: none;
                                                padding: 8px 16px;
                                                border-radius: 6px;
                                                font-size: 0.8rem;
                                                font-weight: 600;
                                                transition: all 0.2s ease;
                                                width: 100%;
                                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                                Vote
                                            </button>
                                        ` : `
                                            <div style="
                                                background: var(--gray-100);
                                                color: var(--gray-600);
                                                padding: 8px 16px;
                                                border-radius: 6px;
                                                font-size: 0.8rem;
                                                font-weight: 600;
                                                width: 100%;
                                            ">
                                                ${poll.voters.includes('current_user') ? '✓ Voted' : 'Voting Closed'}
                                            </div>
                                        `}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--spacing-2); border-top: 1px solid var(--gray-100); font-size: var(--font-size-sm); color: var(--gray-500);">
                        <span>Created by ${poll.createdBy}</span>
                        <span>${poll.totalVotes} total votes</span>
                    </div>

                    ${hasVoted ? '<div style="text-align: center; margin-top: var(--spacing-2); color: var(--accent-color); font-weight: 600;">✓ You have voted</div>' : ''}
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }

    function loadPollResults() {
        const polls = JSON.parse(localStorage.getItem('polls') || '[]');
        const container = document.getElementById('pollResults');

        if (polls.length === 0) {
            container.innerHTML = '<p style="color: var(--gray-600); text-align: center;">No poll results available</p>';
            return;
        }

        // Show polls with votes
        const pollsWithVotes = polls.filter(poll => poll.totalVotes > 0);

        if (pollsWithVotes.length === 0) {
            container.innerHTML = '<p style="color: var(--gray-600); text-align: center;">No votes recorded yet</p>';
            return;
        }

        const html = pollsWithVotes.map(poll => {
            const winningOption = Object.entries(poll.votes).reduce((a, b) => poll.votes[a[0]] > poll.votes[b[0]] ? a : b);
            const winningPercentage = Math.round((winningOption[1] / poll.totalVotes) * 100);

            return `
                <div class="poll-result" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-4);">
                    <h4 style="margin-bottom: var(--spacing-2);">${poll.question}</h4>
                    <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-2);">
                        <span style="background: var(--accent-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Winner</span>
                        <span style="font-weight: 600; color: var(--accent-color);">${winningOption[0]} (${winningPercentage}%)</span>
                    </div>
                    <div style="font-size: var(--font-size-sm); color: var(--gray-600);">
                        Total votes: ${poll.totalVotes} • Created: ${new Date(poll.createdDate).toLocaleDateString()}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }
}
function initializeSuggestions() {
    loadSuggestions();

    // Handle form submission
    document.getElementById('suggestionForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const category = document.getElementById('suggestionCategory').value;
        const title = document.getElementById('suggestionTitle').value;
        const description = document.getElementById('suggestionDescription').value;
        const anonymous = document.getElementById('anonymousSubmission').checked;

        const newSuggestion = {
            id: Date.now(),
            category,
            title,
            description,
            author: anonymous ? 'Anonymous' : 'You',
            timestamp: new Date().toISOString(),
            status: 'pending',
            votes: 0
        };

        // Save to localStorage
        const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
        suggestions.unshift(newSuggestion);
        localStorage.setItem('suggestions', JSON.stringify(suggestions));

        // Clear form and reload
        this.reset();
        loadSuggestions();

        showToast('Suggestion submitted successfully!', 'success');
    });
}

function loadSuggestions() {
    let suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');

    // Add sample suggestions if none exist
    if (suggestions.length === 0) {
        suggestions = [
            {
                id: 1,
                category: "workplace",
                title: "Flexible Working Hours",
                description: "Implement flexible working hours to improve work-life balance and productivity.",
                author: "Sarah Wilson",
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                status: "approved",
                votes: 15
            },
            {
                id: 2,
                category: "technology",
                title: "Upgrade Video Conferencing System",
                description: "Current system has audio issues. Suggest upgrading to better quality equipment.",
                author: "Anonymous",
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                status: "under_review",
                votes: 8
            },
            {
                id: 3,
                category: "environment",
                title: "Add More Plants to Office",
                description: "Adding plants would improve air quality and create a more pleasant work environment.",
                author: "Mike Johnson",
                timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                status: "pending",
                votes: 12
            }
        ];
        localStorage.setItem('suggestions', JSON.stringify(suggestions));
    }

    const container = document.getElementById('suggestionsList');

    const categoryIcons = {
        workplace: '🏢',
        process: '⚙️',
        technology: '💻',
        benefits: '🎁',
        environment: '🌱',
        other: '📝'
    };

    const statusColors = {
        pending: '#f59e0b',
        under_review: '#3b82f6',
        approved: '#10b981',
        rejected: '#ef4444'
    };

    const html = suggestions.map(suggestion => `
        <div class="suggestion-item" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-4);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-2);">
                <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                    <span style="font-size: 1.5rem;">${categoryIcons[suggestion.category]}</span>
                    <h3 style="color: var(--gray-800);">${suggestion.title}</h3>
                </div>
                <span style="background: ${statusColors[suggestion.status]}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; text-transform: capitalize;">${suggestion.status.replace('_', ' ')}</span>
            </div>
            <p style="color: var(--gray-700); line-height: 1.6; margin-bottom: var(--spacing-3);">${suggestion.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--spacing-2); border-top: 1px solid var(--gray-100);">
                <div style="display: flex; gap: var(--spacing-4);">
                    <span style="font-size: var(--font-size-sm); color: var(--gray-500);">By ${suggestion.author}</span>
                    <span style="font-size: var(--font-size-sm); color: var(--gray-500);">${new Date(suggestion.timestamp).toLocaleDateString()}</span>
                </div>
                <button class="btn btn-secondary" onclick="voteSuggestion(${suggestion.id})" style="padding: 6px 12px; font-size: 0.8rem;">
                    👍 ${suggestion.votes} Votes
                </button>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;

    // Define vote function
    window.voteSuggestion = function(suggestionId) {
        const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
        const suggestion = suggestions.find(s => s.id === suggestionId);
        if (suggestion) {
            suggestion.votes++;
            localStorage.setItem('suggestions', JSON.stringify(suggestions));
            loadSuggestions();
            showToast('Vote added!', 'success');
        }
    };
}
function initializeRecognition() {
    loadEmployeeOptions();
    loadTopRecognitionLeaders();
    loadRecentRecognitions();

    // Handle form submission
    document.getElementById('recognitionForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const employeeId = document.getElementById('recognitionEmployee').value;
        const badge = document.getElementById('recognitionBadge').value;
        const message = document.getElementById('recognitionMessage').value;

        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        const employee = employees.find(emp => emp.id == employeeId);

        if (!employee) {
            showToast('Please select a valid employee', 'error');
            return;
        }

        const badgeNames = {
            star: '🌟 Star Performer',
            team: '🤝 Team Player',
            innovator: '💡 Innovator',
            achiever: '🎯 Goal Achiever',
            leader: '👑 Leadership',
            mentor: '🎓 Mentor'
        };

        const newRecognition = {
            id: Date.now(),
            employeeId: employeeId,
            employeeName: `${employee.firstName} ${employee.lastName}`,
            badge: badge,
            badgeName: badgeNames[badge],
            message: message,
            givenBy: 'You',
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        const recognitions = JSON.parse(localStorage.getItem('recognitions') || '[]');
        recognitions.unshift(newRecognition);
        localStorage.setItem('recognitions', JSON.stringify(recognitions));

        // Clear form and reload
        this.reset();
        loadTopRecognitionLeaders();
        loadRecentRecognitions();

        showToast(`Recognition given to ${employee.firstName} ${employee.lastName}!`, 'success');
    });
}

function loadEmployeeOptions() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const select = document.getElementById('recognitionEmployee');

    const options = employees.map(emp =>
        `<option value="${emp.id}">${emp.firstName} ${emp.lastName} - ${emp.department}</option>`
    ).join('');

    select.innerHTML = '<option value="">Select employee</option>' + options;
}

function loadTopRecognitionLeaders() {
    const recognitions = JSON.parse(localStorage.getItem('recognitions') || '[]');
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');

    // Count recognitions per employee
    const recognitionCounts = {};
    recognitions.forEach(rec => {
        recognitionCounts[rec.employeeId] = (recognitionCounts[rec.employeeId] || 0) + 1;
    });

    // Get top 3 employees
    const topEmployees = Object.entries(recognitionCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([employeeId, count]) => {
            const employee = employees.find(emp => emp.id == employeeId);
            return { employee, count };
        })
        .filter(item => item.employee);

    const container = document.getElementById('topRecognitionLeaders');

    if (topEmployees.length === 0) {
        container.innerHTML = '<p style="color: var(--gray-600); text-align: center;">No recognitions yet. Be the first to give recognition!</p>';
        return;
    }

    const profileImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
    ];

    const medals = ['🥇', '🥈', '🥉'];

    const html = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4);">
            ${topEmployees.map((item, index) => `
                <div class="leader-card" style="text-align: center; padding: var(--spacing-4); background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; border: 2px solid ${index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32'};">
                    <div style="font-size: 2rem; margin-bottom: var(--spacing-2);">${medals[index]}</div>
                    <img src="${profileImages[index]}" alt="${item.employee.firstName}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: var(--spacing-2); border: 3px solid ${index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32'};">
                    <h4 style="margin-bottom: var(--spacing-1);">${item.employee.firstName} ${item.employee.lastName}</h4>
                    <p style="font-size: var(--font-size-sm); color: var(--gray-600); margin-bottom: var(--spacing-2);">${item.employee.department}</p>
                    <div style="background: ${index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32'}; color: white; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: var(--font-size-sm);">
                        ${item.count} Recognition${item.count > 1 ? 's' : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    container.innerHTML = html;
}

function loadRecentRecognitions() {
    let recognitions = JSON.parse(localStorage.getItem('recognitions') || '[]');

    // Add sample recognitions if none exist
    if (recognitions.length === 0) {
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        if (employees.length > 0) {
            recognitions = [
                {
                    id: 1,
                    employeeId: employees[0].id,
                    employeeName: `${employees[0].firstName} ${employees[0].lastName}`,
                    badge: 'star',
                    badgeName: '🌟 Star Performer',
                    message: 'Outstanding work on the quarterly project. Exceeded all expectations!',
                    givenBy: 'Manager',
                    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 2,
                    employeeId: employees[1]?.id || employees[0].id,
                    employeeName: employees[1] ? `${employees[1].firstName} ${employees[1].lastName}` : `${employees[0].firstName} ${employees[0].lastName}`,
                    badge: 'team',
                    badgeName: '🤝 Team Player',
                    message: 'Always willing to help colleagues and share knowledge.',
                    givenBy: 'Team Lead',
                    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
                }
            ];
            localStorage.setItem('recognitions', JSON.stringify(recognitions));
        }
    }

    const container = document.getElementById('recentRecognitions');

    if (recognitions.length === 0) {
        container.innerHTML = '<p style="color: var(--gray-600); text-align: center;">No recognitions yet. Start recognizing your colleagues!</p>';
        return;
    }

    const profileImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face'
    ];

    const html = recognitions.slice(0, 10).map((recognition, index) => `
        <div class="recognition-item" style="background: white; border: 1px solid var(--gray-200); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-4); border-left: 4px solid #ffd700;">
            <div style="display: flex; align-items: center; gap: var(--spacing-3); margin-bottom: var(--spacing-3);">
                <img src="${profileImages[index % profileImages.length]}" alt="${recognition.employeeName}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 4px;">${recognition.employeeName}</h4>
                    <div style="display: flex; align-items: center; gap: var(--spacing-2);">
                        <span style="background: #ffd700; color: #333; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">${recognition.badgeName}</span>
                        <span style="font-size: var(--font-size-sm); color: var(--gray-500);">by ${recognition.givenBy}</span>
                    </div>
                </div>
                <span style="font-size: var(--font-size-sm); color: var(--gray-500);">${new Date(recognition.timestamp).toLocaleDateString()}</span>
            </div>
            <p style="color: var(--gray-700); line-height: 1.6; font-style: italic;">"${recognition.message}"</p>
        </div>
    `).join('');

    container.innerHTML = html;
}
function initializeGallery() { console.log('Gallery initialized'); }

// Add component-specific CSS
function addComponentStyles() {
    if (document.querySelector('#component-styles')) return;

    const style = document.createElement('style');
    style.id = 'component-styles';
    style.textContent = `
        .component-content {
            animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #4a5568;
            font-size: 0.9rem;
        }

        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: white;
        }

        .form-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .summary-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
        }

        .summary-icon {
            font-size: 2rem;
            padding: 10px;
            background: white;
            border-radius: 8px;
        }

        .summary-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .summary-content p {
            color: #718096;
            font-size: 0.9rem;
        }

        .filter-btn.active {
            background: #667eea !important;
            color: white !important;
        }

        @keyframes slideInRight {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100px); opacity: 0; }
        }

        /* Component-specific responsive styles */
        @media (max-width: 768px) {
            .payroll-stat,
            .summary-item,
            .analytics-item {
                padding: 15px !important;
            }

            .social-post,
            .announcement-item,
            .suggestion-item,
            .recognition-item,
            .leave-request-item {
                padding: 15px !important;
                margin-bottom: 15px !important;
            }

            .profile-card,
            .leader-card {
                padding: 15px !important;
            }

            .chat-container {
                grid-template-columns: 1fr !important;
                height: 400px !important;
            }

            .social-post {
                padding: var(--spacing-3) !important;
            }

            .social-post div[style*="flex-wrap"] button {
                flex: 1 1 100% !important;
                max-width: none !important;
                margin-bottom: var(--spacing-2);
            }

            .form-row {
                grid-template-columns: 1fr !important;
                gap: 15px !important;
            }
        }

        @media (max-width: 480px) {
            .component-content {
                padding: 0 !important;
            }

            .card {
                margin-bottom: 15px !important;
                padding: 15px !important;
            }

            .stats-grid,
            .dashboard-widgets {
                grid-template-columns: 1fr !important;
                gap: 10px !important;
            }

            .btn {
                padding: 8px 12px !important;
                font-size: 0.8rem !important;
            }

            /* Social feed form responsive */
            div[style*="flex-wrap"] {
                flex-direction: column !important;
                align-items: stretch !important;
            }

            div[style*="flex-wrap"] > div {
                justify-content: center !important;
                margin-bottom: var(--spacing-2) !important;
            }

            div[style*="flex-wrap"] button[style*="white-space"] {
                width: 100% !important;
            }

            /* Activity list responsive */
            .activity-list .activity-item {
                padding: var(--spacing-2) !important;
            }

            .activity-list .activity-item img {
                width: 35px !important;
                height: 35px !important;
            }

            table {
                font-size: 0.7rem !important;
            }

            .chat-messages {
                padding: 10px !important;
            }

            /* Events calendar responsive */
            .calendar-container {
                grid-template-columns: 1fr !important;
                gap: 15px !important;
            }

            .calendar-grid {
                font-size: 0.7rem !important;
            }

            .calendar-day {
                min-height: 40px !important;
                padding: 4px !important;
            }

            /* Polls responsive */
            .poll-item,
            .poll-result {
                padding: 15px !important;
            }

            .poll-option-input {
                flex-direction: column !important;
                gap: 8px !important;
            }

            .poll-options-grid {
                grid-template-columns: 1fr !important;
            }

            /* Event items responsive */
            .event-item,
            .upcoming-event {
                padding: 12px !important;
            }

            .event-header {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 8px !important;
            }

            /* Vertical polls responsive */
            .poll-options-container > div {
                grid-template-columns: 1fr 1fr !important;
                gap: 15px !important;
            }

            .vertical-poll-option {
                padding: 15px !important;
            }
        }

        @media (max-width: 480px) {
            /* Mobile vertical polls */
            .poll-options-container > div {
                grid-template-columns: 1fr !important;
                gap: 12px !important;
            }

            .vertical-poll-option {
                padding: 12px !important;
            }

            .vertical-poll-option h4 {
                font-size: 0.9rem !important;
            }
        }

        /* Vertical Poll Animations */
        .vertical-poll-option:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .vertical-poll-option:active {
            transform: translateY(0);
        }

        /* Circular progress animation */
        @keyframes fillCircle {
            from {
                background: conic-gradient(var(--gray-200) 0deg, var(--gray-200) 360deg);
            }
            to {
                background: conic-gradient(var(--primary-color) var(--percentage), var(--gray-200) 0deg);
            }
        }

        /* Poll option entrance animation */
        @keyframes pollSlideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .vertical-poll-option {
            animation: pollSlideIn 0.5s ease-out;
        }

        /* Crown animation for winning option */
        @keyframes crownBounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-3px);
            }
            60% {
                transform: translateY(-1px);
            }
        }

        .vertical-poll-option .crown {
            animation: crownBounce 2s infinite;
        }

        /* Pulse animation for winning option */
        @keyframes winnerPulse {
            0% {
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
            50% {
                box-shadow: 0 4px 20px rgba(59, 130, 246, 0.5);
            }
            100% {
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
        }

        .vertical-poll-option.winner {
            animation: winnerPulse 2s infinite;
        }

        /* Circular progress glow effect */
        .poll-progress-circle {
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
        }
    `;
    document.head.appendChild(style);
}

// Initialize sample data
function initializeSampleData() {
    // Check if employees already exist
    const existingEmployees = localStorage.getItem('employees');
    if (!existingEmployees) {
        const sampleEmployees = [
            {
                id: 1,
                firstName: 'Sarah',
                lastName: 'Wilson',
                email: 'sarah.wilson@company.com',
                phone: '+1 (555) 123-4567',
                department: 'Human Resources',
                position: 'HR Manager',
                startDate: '2022-03-15',
                salary: '75000',
                registeredDate: new Date('2022-03-15').toISOString(),
                location: 'New York, NY',
                status: 'Online',
                bio: 'Experienced HR professional with 8+ years in talent management and employee relations. Passionate about creating inclusive workplace cultures.',
                skills: ['Employee Relations', 'Talent Acquisition', 'Performance Management', 'HR Analytics'],
                achievements: ['Employee of the Month - Q2 2023', 'HR Excellence Award 2022', 'Diversity & Inclusion Champion']
            },
            {
                id: 2,
                firstName: 'Mike',
                lastName: 'Johnson',
                email: 'mike.johnson@company.com',
                phone: '+1 (555) 234-5678',
                department: 'Engineering',
                position: 'Software Engineer',
                startDate: '2021-08-20',
                salary: '85000',
                registeredDate: new Date('2021-08-20').toISOString(),
                location: 'San Francisco, CA',
                status: 'Online',
                bio: 'Full-stack developer specializing in React and Node.js. Enjoys building scalable applications and mentoring junior developers.',
                skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
                achievements: ['Tech Innovation Award 2023', 'Best Code Quality 2022', 'Mentor of the Year 2023']
            },
            {
                id: 3,
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@company.com',
                phone: '+1 (555) 345-6789',
                department: 'Marketing',
                position: 'Marketing Specialist',
                startDate: '2023-01-10',
                salary: '65000',
                registeredDate: new Date('2023-01-10').toISOString(),
                location: 'Chicago, IL',
                status: 'Away',
                bio: 'Creative marketing professional with expertise in digital campaigns and brand strategy. Loves data-driven marketing approaches.',
                skills: ['Digital Marketing', 'Content Strategy', 'SEO/SEM', 'Analytics', 'Social Media'],
                achievements: ['Campaign Excellence Award 2023', 'Rising Star Award 2023', 'Best Social Media Campaign 2023']
            },
            {
                id: 4,
                firstName: 'David',
                lastName: 'Brown',
                email: 'david.brown@company.com',
                phone: '+1 (555) 456-7890',
                department: 'Finance',
                position: 'Financial Analyst',
                startDate: '2022-11-05',
                salary: '70000',
                registeredDate: new Date('2022-11-05').toISOString(),
                location: 'Boston, MA',
                status: 'Online',
                bio: 'Detail-oriented financial analyst with strong analytical skills. Specializes in financial modeling and business intelligence.',
                skills: ['Financial Modeling', 'Excel', 'SQL', 'Tableau', 'Business Analysis', 'Forecasting'],
                achievements: ['Accuracy Excellence Award 2023', 'Process Improvement Champion 2022', 'Financial Insight Award 2023']
            },
            {
                id: 5,
                firstName: 'Lisa',
                lastName: 'Davis',
                email: 'lisa.davis@company.com',
                phone: '+1 (555) 567-8901',
                department: 'Design',
                position: 'UX Designer',
                startDate: '2023-06-12',
                salary: '72000',
                registeredDate: new Date('2023-06-12').toISOString(),
                location: 'Austin, TX',
                status: 'Offline',
                bio: 'User-centered designer passionate about creating intuitive and accessible digital experiences. Advocates for inclusive design practices.',
                skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Accessibility'],
                achievements: ['Design Excellence Award 2023', 'User Experience Innovation 2023', 'Accessibility Champion 2023']
            }
        ];

        localStorage.setItem('employees', JSON.stringify(sampleEmployees));
        console.log('Sample employee data initialized');
    }
}

// View detailed employee profile
function viewDetailedProfile(empId) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const employee = employees.find(emp => emp.id === empId);

    if (!employee) {
        alert('Employee not found!');
        return;
    }

    const profileImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face'
    ];

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    modal.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative;">
            <button onclick="this.closest('.profile-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500);">×</button>

            <div style="text-align: center; margin-bottom: 2rem;">
                ${createAvatarElement(`${employee.firstName} ${employee.lastName}`, profileImages[(empId - 1) % profileImages.length], 120)}
                <h2 style="margin: 1rem 0 0.5rem 0; color: var(--gray-800);">${employee.firstName} ${employee.lastName}</h2>
                <p style="color: var(--gray-600); font-weight: 600; margin-bottom: 0.5rem;">${employee.position}</p>
                <p style="color: var(--gray-500); margin-bottom: 1rem;">${employee.department}</p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                    <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${employee.status === 'Online' ? '#10b981' : employee.status === 'Away' ? '#f59e0b' : '#6b7280'};"></span>
                    <span style="color: ${employee.status === 'Online' ? '#10b981' : employee.status === 'Away' ? '#f59e0b' : '#6b7280'}; font-weight: 600;">${employee.status || 'Online'}</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                <div>
                    <h4 style="color: var(--gray-800); margin-bottom: 1rem; border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem;">Contact Information</h4>
                    <div style="space-y: 0.5rem;">
                        <p style="margin-bottom: 0.5rem;"><strong>📧 Email:</strong> ${employee.email}</p>
                        <p style="margin-bottom: 0.5rem;"><strong>📞 Phone:</strong> ${employee.phone}</p>
                        <p style="margin-bottom: 0.5rem;"><strong>📍 Location:</strong> ${employee.location || 'Not specified'}</p>
                        <p style="margin-bottom: 0.5rem;"><strong>📅 Start Date:</strong> ${new Date(employee.startDate).toLocaleDateString()}</p>
                    </div>
                </div>

                <div>
                    <h4 style="color: var(--gray-800); margin-bottom: 1rem; border-bottom: 2px solid var(--secondary-color); padding-bottom: 0.5rem;">Professional Details</h4>
                    <div style="space-y: 0.5rem;">
                        <p style="margin-bottom: 0.5rem;"><strong>💼 Department:</strong> ${employee.department}</p>
                        <p style="margin-bottom: 0.5rem;"><strong>🎯 Position:</strong> ${employee.position}</p>
                        <p style="margin-bottom: 0.5rem;"><strong>💰 Salary:</strong> $${parseInt(employee.salary).toLocaleString()}</p>
                        <p style="margin-bottom: 0.5rem;"><strong>🆔 Employee ID:</strong> #${employee.id.toString().padStart(4, '0')}</p>
                    </div>
                </div>
            </div>

            ${employee.bio ? `
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--gray-800); margin-bottom: 1rem; border-bottom: 2px solid var(--accent-color); padding-bottom: 0.5rem;">About</h4>
                    <p style="color: var(--gray-600); line-height: 1.6;">${employee.bio}</p>
                </div>
            ` : ''}

            ${employee.skills && employee.skills.length > 0 ? `
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--gray-800); margin-bottom: 1rem; border-bottom: 2px solid var(--success-color); padding-bottom: 0.5rem;">Skills & Expertise</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${employee.skills.map(skill => `
                            <span style="background: var(--primary-color); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${employee.achievements && employee.achievements.length > 0 ? `
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--gray-800); margin-bottom: 1rem; border-bottom: 2px solid #ffd700; padding-bottom: 0.5rem;">🏆 Achievements</h4>
                    <ul style="color: var(--gray-600); line-height: 1.8;">
                        ${employee.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button onclick="openChat(${employee.id}, '${employee.firstName} ${employee.lastName}')" style="background: var(--primary-color); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 600;">💬 Start Chat</button>
                <button onclick="this.closest('.profile-modal').remove()" style="background: var(--gray-200); color: var(--gray-700); border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
            </div>
        </div>
    `;

    modal.className = 'profile-modal';
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Generate contextual responses based on message content
function generateContextualResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        const greetings = [
            "Hello! How can I help you today?",
            "Hi there! Good to hear from you!",
            "Hey! What's up?",
            "Hello! Hope you're having a great day!"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Meeting/schedule related
    if (lowerMessage.includes('meeting') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
        const meetingResponses = [
            "Sure! Let me check my calendar and get back to you.",
            "I'm available this week. What time works best for you?",
            "Let's schedule something. I'll send you a calendar invite.",
            "Perfect! I'll block some time for our meeting."
        ];
        return meetingResponses[Math.floor(Math.random() * meetingResponses.length)];
    }

    // Project/work related
    if (lowerMessage.includes('project') || lowerMessage.includes('task') || lowerMessage.includes('work') || lowerMessage.includes('deadline')) {
        const workResponses = [
            "I'll review the project details and update you shortly.",
            "Thanks for the update! I'll prioritize this task.",
            "Let me check the current status and get back to you.",
            "I'll coordinate with the team on this project.",
            "Good point! I'll make sure we stay on track with the deadline."
        ];
        return workResponses[Math.floor(Math.random() * workResponses.length)];
    }

    // Question responses
    if (lowerMessage.includes('?') || lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('when') || lowerMessage.includes('where')) {
        const questionResponses = [
            "Great question! Let me look into that for you.",
            "I'll need to check on that and get back to you.",
            "Let me gather some information and respond shortly.",
            "That's a good point. I'll investigate and update you.",
            "I'll find out the details and share them with you."
        ];
        return questionResponses[Math.floor(Math.random() * questionResponses.length)];
    }

    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        const thankResponses = [
            "You're welcome! Happy to help!",
            "No problem at all!",
            "Glad I could assist!",
            "Anytime! Let me know if you need anything else."
        ];
        return thankResponses[Math.floor(Math.random() * thankResponses.length)];
    }

    // Urgent/important
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('important') || lowerMessage.includes('priority')) {
        const urgentResponses = [
            "Got it! I'll handle this right away.",
            "Understood - marking this as high priority.",
            "I'll take care of this immediately.",
            "Thanks for flagging this as urgent. On it!"
        ];
        return urgentResponses[Math.floor(Math.random() * urgentResponses.length)];
    }

    // Help/support
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
        const helpResponses = [
            "I'm here to help! What specific issue are you facing?",
            "Let me assist you with that. Can you provide more details?",
            "I'll help you resolve this. What seems to be the problem?",
            "Happy to support you on this. Let's figure it out together."
        ];
        return helpResponses[Math.floor(Math.random() * helpResponses.length)];
    }

    // Default responses for general messages
    const defaultResponses = [
        "Thanks for reaching out! I'll get back to you soon.",
        "Got your message! Let me review and respond.",
        "I appreciate you keeping me in the loop.",
        "Thanks for the update! I'll take a look at this.",
        "Sounds good! I'll follow up on this.",
        "I'll review this and get back to you shortly.",
        "Thanks for bringing this to my attention.",
        "I'll make sure to address this promptly."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Utility function to create avatar with fallback
function createAvatarElement(name, imageUrl, size = 40, className = '') {
    const initials = name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#84cc16', '#f97316'];
    const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    const backgroundColor = colors[colorIndex];

    return `
        <div style="position: relative; width: ${size}px; height: ${size}px; flex-shrink: 0;" class="${className}">
            <img src="${imageUrl}" alt="${name}" style="width: ${size}px; height: ${size}px; border-radius: 50%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div style="display: none; width: ${size}px; height: ${size}px; border-radius: 50%; background: ${backgroundColor}; color: white; align-items: center; justify-content: center; font-weight: 600; font-size: ${Math.max(12, size * 0.35)}px; position: absolute; top: 0; left: 0;">${initials}</div>
        </div>
    `;
}

// Generate recent activities
function generateRecentActivities() {
    const activities = [
        {
            employee: employees.find(emp => emp.name === 'Sarah Wilson'),
            action: 'completed project milestone',
            details: 'Q4 Performance Review System - Phase 2',
            time: '2 minutes ago',
            color: '#10b981',
            icon: '🎯'
        },
        {
            employee: employees.find(emp => emp.name === 'Mike Johnson'),
            action: 'shared team update',
            details: 'Weekly sprint progress and blockers',
            time: '8 minutes ago',
            color: '#8b5cf6',
            icon: '📊'
        },
        {
            employee: employees.find(emp => emp.name === 'Jane Smith'),
            action: 'scheduled team meeting',
            details: 'Marketing Campaign Review - Tomorrow 2PM',
            time: '15 minutes ago',
            color: '#06b6d4',
            icon: '📅'
        },
        {
            employee: employees.find(emp => emp.name === 'David Brown'),
            action: 'submitted expense report',
            details: 'Business travel expenses - $1,247.50',
            time: '22 minutes ago',
            color: '#f59e0b',
            icon: '💰'
        },
        {
            employee: employees.find(emp => emp.name === 'Emily Davis'),
            action: 'requested time off',
            details: 'Vacation leave: Dec 20-30, 2024',
            time: '35 minutes ago',
            color: '#ef4444',
            icon: '🏖️'
        },
        {
            employee: employees.find(emp => emp.name === 'Alex Johnson'),
            action: 'updated profile information',
            details: 'Added new certification and skills',
            time: '1 hour ago',
            color: '#84cc16',
            icon: '👤'
        },
        {
            employee: employees.find(emp => emp.name === 'Lisa Anderson'),
            action: 'joined new project team',
            details: 'Mobile App Redesign Project',
            time: '2 hours ago',
            color: '#f97316',
            icon: '🚀'
        },
        {
            employee: employees.find(emp => emp.name === 'Sarah Wilson'),
            action: 'approved leave request',
            details: 'Approved Mike Johnson\'s sick leave',
            time: '3 hours ago',
            color: '#10b981',
            icon: '✅'
        },
        {
            employee: employees.find(emp => emp.name === 'David Brown'),
            action: 'completed training',
            details: 'Advanced Excel and Data Analysis Course',
            time: '4 hours ago',
            color: '#6366f1',
            icon: '🎓'
        }
    ];

    const activityList = document.getElementById('recentActivityList');
    if (!activityList) return;

    // Add scrollable container styling
    activityList.style.cssText = `
        max-height: 400px;
        overflow-y: auto;
        padding-right: 8px;
    `;

    activityList.innerHTML = activities.map(activity => {
        if (!activity.employee) return '';

        const initials = activity.employee.name.split(' ').map(n => n[0]).join('');

        return `
            <div class="activity-item" style="display: flex; align-items: flex-start; gap: var(--spacing-3); padding: var(--spacing-3); background: white; border-radius: 8px; margin-bottom: var(--spacing-2); border-left: 3px solid ${activity.color}; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" onclick="showEmployeeProfile('${activity.employee.id}')" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'">
                <div style="display: flex; align-items: center; gap: var(--spacing-2); flex-shrink: 0;">
                    <div style="position: relative; width: 40px; height: 40px;">
                        <img src="${activity.employee.avatar}" alt="${activity.employee.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="display: none; width: 40px; height: 40px; border-radius: 50%; background: ${activity.color}; color: white; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; position: absolute; top: 0; left: 0;">${initials}</div>
                    </div>
                    <div style="font-size: 1.2rem; opacity: 0.8;">${activity.icon}</div>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: 4px;">
                        <p style="margin: 0; font-weight: 600; color: var(--gray-800); font-size: 0.9rem;">${activity.employee.name}</p>
                        <span style="font-size: 0.75rem; color: var(--gray-400);">${activity.time}</span>
                    </div>
                    <p style="margin: 0 0 4px 0; font-weight: 500; color: var(--gray-700); font-size: 0.85rem;">${activity.action}</p>
                    <p style="margin: 0; font-size: 0.8rem; color: var(--gray-500); line-height: 1.3;">${activity.details}</p>
                </div>
                <div style="width: 8px; height: 8px; border-radius: 50%; background: ${activity.color}; opacity: 0.6; margin-top: 6px;"></div>
            </div>
        `;
    }).join('');

    // Add custom scrollbar styling
    const style = document.createElement('style');
    style.textContent = `
        #recentActivityList::-webkit-scrollbar {
            width: 6px;
        }
        #recentActivityList::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
        }
        #recentActivityList::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
        }
        #recentActivityList::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
    `;
    if (!document.querySelector('#activity-scrollbar-styles')) {
        style.id = 'activity-scrollbar-styles';
        document.head.appendChild(style);
    }
}

// Show employee profile modal
function showEmployeeProfile(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;

    modalContent.innerHTML = `
        <button onclick="this.closest('.modal-overlay').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>

        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="position: relative; width: 100px; height: 100px; margin: 0 auto 1rem;">
                <img src="${employee.avatar}" alt="${employee.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: 100px; height: 100px; border-radius: 50%; background: #6366f1; color: white; align-items: center; justify-content: center; font-weight: 600; font-size: 2rem; position: absolute; top: 0; left: 0;">${employee.name.split(' ').map(n => n[0]).join('')}</div>
            </div>
            <h2 style="margin: 0 0 0.5rem 0; color: #1f2937;">${employee.name}</h2>
            <p style="margin: 0; color: #6b7280; font-size: 1.1rem;">${employee.position}</p>
        </div>

        <div style="display: grid; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 1.2rem;">📧</span>
                </div>
                <div>
                    <p style="margin: 0; font-weight: 500; color: #374151;">Email</p>
                    <p style="margin: 0; color: #6b7280;">${employee.email}</p>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 1.2rem;">📱</span>
                </div>
                <div>
                    <p style="margin: 0; font-weight: 500; color: #374151;">Phone</p>
                    <p style="margin: 0; color: #6b7280;">${employee.phone}</p>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 1.2rem;">🏢</span>
                </div>
                <div>
                    <p style="margin: 0; font-weight: 500; color: #374151;">Department</p>
                    <p style="margin: 0; color: #6b7280;">${employee.department}</p>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 1.2rem;">📅</span>
                </div>
                <div>
                    <p style="margin: 0; font-weight: 500; color: #374151;">Join Date</p>
                    <p style="margin: 0; color: #6b7280;">${employee.joinDate}</p>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 1.2rem;">💰</span>
                </div>
                <div>
                    <p style="margin: 0; font-weight: 500; color: #374151;">Salary</p>
                    <p style="margin: 0; color: #6b7280;">$${employee.salary.toLocaleString()}</p>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 1.2rem;">📊</span>
                </div>
                <div>
                    <p style="margin: 0; font-weight: 500; color: #374151;">Status</p>
                    <span style="display: inline-block; padding: 0.25rem 0.75rem; background: ${employee.status === 'Active' ? '#dcfce7' : '#fef3c7'}; color: ${employee.status === 'Active' ? '#166534' : '#92400e'}; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;">${employee.status}</span>
                </div>
            </div>
        </div>

        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
            <button onclick="startChat('${employee.id}')" style="background: #6366f1; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 500;">Start Chat</button>
            <button onclick="this.closest('.modal-overlay').remove()" style="background: #f3f4f6; color: #374151; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 500;">Close</button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Show employee profile from chat
function showChatEmployeeProfile(empId, empName) {
    const employee = employees.find(emp => emp.id == empId || `${emp.firstName} ${emp.lastName}` === empName || emp.name === empName);

    if (employee) {
        showEmployeeProfile(employee.id);
    } else {
        // Create a temporary profile modal for employees not in the main list
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            position: relative;
        `;

        modalContent.innerHTML = `
            <button onclick="this.closest('.modal-overlay').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>

            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="position: relative; width: 80px; height: 80px; margin: 0 auto 1rem;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1.5rem;">${empName.split(' ').map(n => n[0]).join('')}</div>
                </div>
                <h2 style="margin: 0 0 0.5rem 0; color: #1f2937;">${empName}</h2>
                <p style="margin: 0; color: #6b7280;">Employee</p>
            </div>

            <div style="text-align: center; color: #6b7280;">
                <p>Limited profile information available.</p>
                <p>Contact HR for complete employee details.</p>
            </div>

            <div style="margin-top: 2rem; display: flex; justify-content: center;">
                <button onclick="this.closest('.modal-overlay').remove()" style="background: #f3f4f6; color: #374151; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 500;">Close</button>
            </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Start chat with employee
function startChat(employeeId) {
    console.log('startChat called with employeeId:', employeeId);

    // Close the profile modal
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();

    // Navigate to chat component
    console.log('Loading chat component...');
    loadComponent('chat');

    // Wait for chat to load, then start conversation
    setTimeout(() => {
        console.log('Looking for employee with id:', employeeId);
        const employee = employees.find(emp => emp.id == employeeId);
        console.log('Found employee:', employee);

        if (employee) {
            startConversation(employee);
        } else {
            console.error('Employee not found with id:', employeeId);
        }
    }, 500); // Increased timeout to ensure chat loads
}

// Start conversation with employee (called from dashboard)
function startConversation(employee) {
    console.log('startConversation called with employee:', employee);

    // Make sure we're on the chat page
    if (typeof window.openChat === 'function') {
        console.log('openChat function available, starting chat...');
        window.openChat(employee.id, employee.name);
    } else {
        console.log('openChat function not available yet, waiting...');
        // If chat functions aren't loaded yet, wait and try again
        let attempts = 0;
        const maxAttempts = 10;

        const tryOpenChat = () => {
            attempts++;
            console.log(`Attempt ${attempts} to find openChat function...`);

            if (typeof window.openChat === 'function') {
                console.log('openChat function found, starting chat...');
                window.openChat(employee.id, employee.name);
            } else if (attempts < maxAttempts) {
                setTimeout(tryOpenChat, 500);
            } else {
                console.error('Failed to find openChat function after', maxAttempts, 'attempts');
                alert('Unable to start chat. Please try clicking on Chat & Messaging first, then try again.');
            }
        };

        setTimeout(tryOpenChat, 500);
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.style.display = 'none';
    }
});
