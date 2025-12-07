// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form Selection: Select the form with id="registration-form"
    const form = document.getElementById('registration-form');
    
    // Feedback Division Selection: Select the division with id="form-feedback"
    const feedbackDiv = document.getElementById('form-feedback');
    
    // Form Submission Event Listener
    form.addEventListener('submit', function(event) {
        // Prevent the form from submitting to the server
        event.preventDefault();
        
        // Retrieve User Inputs and Trimming
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Initialize Validation Variables
        let isValid = true;
        let messages = [];
        
        // Username Validation
        if (username.length < 3) {
            isValid = false;
            messages.push("Username must be at least 3 characters long.");
        }
        
        // Email Validation
        if (!email.includes('@') || !email.includes('.')) {
            isValid = false;
            messages.push("Please enter a valid email address (must contain '@' and '.').");
        }
        
        // Password Validation
        if (password.length < 8) {
            isValid = false;
            messages.push("Password must be at least 8 characters long.");
        }
        
        // Displaying Feedback
        // Make feedbackDiv visible by setting its style.display to "block"
        feedbackDiv.style.display = "block";
        
        if (isValid) {
            // If isValid remains true, set the textContent of feedbackDiv to "Registration successful!"
            feedbackDiv.textContent = "Registration successful!";
            // Set its style.color to "#28a745"
            feedbackDiv.style.color = "#28a745";
        } else {
            // If isValid is false, join messages with <br> to form a single string
            feedbackDiv.innerHTML = messages.join('<br>');
            // Set feedbackDiv.style.color to "#dc3545"
            feedbackDiv.style.color = "#dc3545";
        }
    });
});