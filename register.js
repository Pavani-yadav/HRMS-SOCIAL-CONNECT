// Tab switching functionality
function switchTab(tabName) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected form and activate tab
    document.getElementById(tabName + 'Form').classList.add('active');
    event.target.closest('.tab-btn').classList.add('active');
}

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentElement.querySelector('.password-toggle');
    const icon = toggle.querySelector('.toggle-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = '🙈';
    } else {
        input.type = 'password';
        icon.textContent = '👁️';
    }
}

// Toast notification system
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s ease-out forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 400);
    }, 5000);
}

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateForm(formData, formType) {
    const errors = [];
    
    if (formType === 'signup') {
        if (!formData.firstName.trim()) errors.push('First name is required');
        if (!formData.lastName.trim()) errors.push('Last name is required');
        if (!formData.department) errors.push('Department is required');
        if (!formData.jobTitle.trim()) errors.push('Job title is required');
        if (formData.password !== formData.confirmPassword) {
            errors.push('Passwords do not match');
        }
    }
    
    if (!validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (formData.password && !validatePassword(formData.password)) {
        errors.push('Password must be at least 6 characters long');
    }
    
    return errors;
}

// Simulate API calls
function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate successful login
            if (email && password) {
                resolve({ success: true, user: { email, name: 'John Doe' } });
            } else {
                reject({ error: 'Invalid credentials' });
            }
        }, 2000);
    });
}

function simulateSignup(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate successful signup
            if (userData.email && userData.password) {
                resolve({ success: true, message: 'Account created successfully' });
            } else {
                reject({ error: 'Registration failed' });
            }
        }, 2500);
    });
}

function simulateForgotPassword(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (validateEmail(email)) {
                resolve({ success: true, message: 'Reset instructions sent' });
            } else {
                reject({ error: 'Email not found' });
            }
        }, 1500);
    });
}

// Form submission handlers
document.getElementById('loginFormElement').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const errors = validateForm({ email, password }, 'login');
    if (errors.length > 0) {
        showToast(errors[0], 'error');
        return;
    }
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Signing In...';
    submitBtn.disabled = true;
    
    try {
        showToast('Signing you in...', 'info');
        const result = await simulateLogin(email, password);
        
        if (result.success) {
            showToast('Login successful! Redirecting to dashboard...');
            
            // Store user data if remember me is checked
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
                localStorage.setItem('userLoggedIn', 'true');
            }
            
            setTimeout(() => {
                window.location.href = 'main-dashboard.html';
            }, 1500);
        }
    } catch (error) {
        showToast(error.error || 'Login failed. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

document.getElementById('signupFormElement').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('signupEmail').value,
        department: document.getElementById('department').value,
        jobTitle: document.getElementById('jobTitle').value,
        password: document.getElementById('signupPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
    
    const errors = validateForm(formData, 'signup');
    if (errors.length > 0) {
        showToast(errors[0], 'error');
        return;
    }
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Creating Account...';
    submitBtn.disabled = true;
    
    try {
        showToast('Creating your account...', 'info');
        const result = await simulateSignup(formData);
        
        if (result.success) {
            showToast('Account created successfully! Please check your email for verification.');
            
            // Clear form
            this.reset();
            
            // Switch to login tab after 2 seconds
            setTimeout(() => {
                switchTab('login');
                // Pre-fill email in login form
                document.getElementById('loginEmail').value = formData.email;
            }, 2000);
        }
    } catch (error) {
        showToast(error.error || 'Registration failed. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

document.getElementById('forgotFormElement').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    
    const errors = validateForm({ email }, 'forgot');
    if (errors.length > 0) {
        showToast(errors[0], 'error');
        return;
    }
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Sending...';
    submitBtn.disabled = true;
    
    try {
        showToast('Sending reset instructions...', 'info');
        const result = await simulateForgotPassword(email);
        
        if (result.success) {
            showToast('Reset instructions sent to your email!');
            
            // Clear form and switch to login after 2 seconds
            this.reset();
            setTimeout(() => {
                switchTab('login');
            }, 2000);
        }
    } catch (error) {
        showToast(error.error || 'Failed to send reset instructions.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user was remembered
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('loginEmail').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
    
    // Add input animations
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add form animations
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

// Add CSS animation for slide out
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
