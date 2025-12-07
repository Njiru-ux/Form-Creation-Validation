// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form and feedback selection
    const form = document.getElementById('registration-form');
    const feedbackDiv = document.getElementById('form-feedback');
    
    // Input field selection
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Individual field feedback elements
    const usernameFeedback = document.getElementById('username-feedback');
    const emailFeedback = document.getElementById('email-feedback');
    const passwordFeedback = document.getElementById('password-feedback');
    
    // Form submission event listener
    form.addEventListener('submit', function(event) {
        // Prevent the form from submitting to the server
        event.preventDefault();
        
        // Reset all field feedback
        resetFieldFeedback();
        
        // Get and trim input values
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Initialize validation variables
        let isValid = true;
        let messages = [];
        
        // Username validation
        if (username.length < 3) {
            isValid = false;
            messages.push("Username must be at least 3 characters long.");
            usernameInput.classList.add('invalid');
            usernameFeedback.textContent = "Username must be at least 3 characters long.";
            usernameFeedback.classList.add('error');
        } else {
            usernameInput.classList.add('valid');
            usernameFeedback.textContent = "Username is valid.";
            usernameFeedback.classList.add('success');
        }
        
        // Email validation
        if (!email.includes('@') || !email.includes('.')) {
            isValid = false;
            messages.push("Please enter a valid email address (must contain '@' and '.').");
            emailInput.classList.add('invalid');
            emailFeedback.textContent = "Email must contain '@' and '.' characters.";
            emailFeedback.classList.add('error');
        } else {
            emailInput.classList.add('valid');
            emailFeedback.textContent = "Email format is valid.";
            emailFeedback.classList.add('success');
        }
        
        // Password validation
        if (password.length < 8) {
            isValid = false;
            messages.push("Password must be at least 8 characters long.");
            passwordInput.classList.add('invalid');
            passwordFeedback.textContent = "Password must be at least 8 characters long.";
            passwordFeedback.classList.add('error');
        } else {
            passwordInput.classList.add('valid');
            passwordFeedback.textContent = "Password meets length requirements.";
            passwordFeedback.classList.add('success');
        }
        
        // Display feedback
        feedbackDiv.style.display = "block";
        
        if (isValid) {
            // All validations passed
            feedbackDiv.textContent = "Registration successful!";
            feedbackDiv.className = "success";
            
            // Optional: Reset form after successful submission
            setTimeout(function() {
                form.reset();
                resetFieldFeedback();
                feedbackDiv.style.display = "none";
                clearFieldStyles();
            }, 3000);
        } else {
            // Validations failed - show error messages
            feedbackDiv.innerHTML = messages.join('<br>');
            feedbackDiv.className = "error";
        }
    });
    
    // Helper function to reset field feedback
    function resetFieldFeedback() {
        usernameFeedback.textContent = "";
        emailFeedback.textContent = "";
        passwordFeedback.textContent = "";
        
        usernameFeedback.className = "field-feedback";
        emailFeedback.className = "field-feedback";
        passwordFeedback.className = "field-feedback";
    }
    
    // Helper function to clear field styles
    function clearFieldStyles() {
        usernameInput.className = "";
        emailInput.className = "";
        passwordInput.className = "";
    }
    
    // Add input event listeners for real-time validation feedback (optional enhancement)
    usernameInput.addEventListener('input', function() {
        const username = usernameInput.value.trim();
        if (username.length > 0 && username.length < 3) {
            usernameInput.classList.remove('valid');
            usernameInput.classList.add('invalid');
            usernameFeedback.textContent = "Username must be at least 3 characters long.";
            usernameFeedback.className = "field-feedback error";
        } else if (username.length >= 3) {
            usernameInput.classList.remove('invalid');
            usernameInput.classList.add('valid');
            usernameFeedback.textContent = "Username is valid.";
            usernameFeedback.className = "field-feedback success";
        } else {
            usernameInput.className = "";
            usernameFeedback.textContent = "";
            usernameFeedback.className = "field-feedback";
        }
    });
    
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (email.length > 0 && (!email.includes('@') || !email.includes('.'))) {
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
            emailFeedback.textContent = "Email must contain '@' and '.' characters.";
            emailFeedback.className = "field-feedback error";
        } else if (email.length > 0 && email.includes('@') && email.includes('.')) {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailFeedback.textContent = "Email format is valid.";
            emailFeedback.className = "field-feedback success";
        } else {
            emailInput.className = "";
            emailFeedback.textContent = "";
            emailFeedback.className = "field-feedback";
        }
    });
    
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        if (password.length > 0 && password.length < 8) {
            passwordInput.classList.remove('valid');
            passwordInput.classList.add('invalid');
            passwordFeedback.textContent = "Password must be at least 8 characters long.";
            passwordFeedback.className = "field-feedback error";
        } else if (password.length >= 8) {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.add('valid');
            passwordFeedback.textContent = "Password meets length requirements.";
            passwordFeedback.className = "field-feedback success";
        } else {
            passwordInput.className = "";
            passwordFeedback.textContent = "";
            passwordFeedback.className = "field-feedback";
        }
    });
});