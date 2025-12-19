// Admin Login and Signup Functionality
const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const signupModal = document.getElementById('signupModal');
const signupToggle = document.getElementById('signupToggle');
const closeModal = document.getElementById('closeModal');
const errorMessage = document.getElementById('errorMessage');
const signupErrorMessage = document.getElementById('signupErrorMessage');

// Show signup modal
signupToggle.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.classList.add('show');
});

// Close modal
closeModal.addEventListener('click', () => {
    signupModal.classList.remove('show');
    signupForm.reset();
    signupErrorMessage.classList.remove('show');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === signupModal) {
        signupModal.classList.remove('show');
        signupForm.reset();
        signupErrorMessage.classList.remove('show');
    }
});

// Login Form Submit
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.classList.remove('show');
    
    const formData = new FormData(loginForm);
    const data = {
        username: formData.get('usernameOrEmail'),
        password: formData.get('password'),
        user_type: 'admin'
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Store user data in session
            sessionStorage.setItem('user', JSON.stringify(result.user));
            // Redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            if (result.requiresVerification) {
                // Show verification error with resend option
                errorMessage.innerHTML = `
                    ${result.message}
                    <br><br>
                    <button onclick="resendVerification('${result.email}')" class="btn-resend" style="background: #2196F3; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                        Resend Verification Email
                    </button>
                `;
                errorMessage.classList.add('show');
            } else {
                errorMessage.textContent = result.message || 'Login failed. Please check your credentials.';
                errorMessage.classList.add('show');
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.classList.add('show');
    }
});

// Resend verification email
async function resendVerification(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/resend-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();
        
        if (result.success) {
            errorMessage.innerHTML = '<span style="color: #4CAF50;">✓ ' + result.message + '</span>';
            errorMessage.classList.add('show');
        } else {
            errorMessage.textContent = result.message || 'Failed to resend verification email.';
            errorMessage.classList.add('show');
        }
    } catch (error) {
        console.error('Resend error:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.classList.add('show');
    }
}

// Signup Form Submit
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    signupErrorMessage.classList.remove('show');
    
    const formData = new FormData(signupForm);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        signupErrorMessage.textContent = 'Please enter a valid email address.';
        signupErrorMessage.classList.add('show');
        return;
    }
    
    // Validate phone format
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    if (!phoneRegex.test(phone) || digitsOnly.length < 10) {
        signupErrorMessage.textContent = 'Please enter a valid phone number (at least 10 digits).';
        signupErrorMessage.classList.add('show');
        return;
    }
    
    // Validate passwords match
    if (password !== confirmPassword) {
        signupErrorMessage.textContent = 'Passwords do not match.';
        signupErrorMessage.classList.add('show');
        return;
    }
    
    const data = {
        username: formData.get('username'),
        email: email,
        phone: phone,
        password: password,
        user_type: 'admin'
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✓ ' + result.message + '\n\nPlease check your email inbox (and spam folder) for the verification link.');
            signupModal.classList.remove('show');
            signupForm.reset();
        } else {
            signupErrorMessage.textContent = result.message || 'Signup failed. Please try again.';
            signupErrorMessage.classList.add('show');
        }
    } catch (error) {
        console.error('Signup error:', error);
        signupErrorMessage.textContent = 'An error occurred. Please try again.';
        signupErrorMessage.classList.add('show');
    }
});
