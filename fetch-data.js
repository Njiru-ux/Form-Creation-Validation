// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the async function
    async function fetchUserData() {
        // Define the API URL
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';
        
        // Select the data container element
        const dataContainer = document.getElementById('api-data');
        const loadingSpinner = document.getElementById('loading-spinner');
        const refreshBtn = document.getElementById('refresh-btn');
        const statsContainer = document.getElementById('stats');
        
        // Show loading spinner and disable refresh button
        loadingSpinner.classList.remove('hidden');
        refreshBtn.disabled = true;
        
        try {
            // Fetch data using await
            const response = await fetch(apiUrl);
            
            // Check if response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Convert response to JSON
            const users = await response.json();
            
            // Clear the loading message
            dataContainer.innerHTML = '';
            
            // Create and append user list
            const userList = document.createElement('ul');
            userList.className = 'user-list';
            
            // Loop through users and create list items
            users.forEach(user => {
                const listItem = document.createElement('li');
                
                // Create avatar with first letter of name
                const avatar = document.createElement('div');
                avatar.className = 'user-avatar';
                avatar.textContent = user.name.charAt(0).toUpperCase();
                
                // Create user info container
                const userInfo = document.createElement('div');
                userInfo.className = 'user-info';
                
                // Create name element
                const userName = document.createElement('div');
                userName.className = 'user-name';
                userName.textContent = user.name;
                
                // Create email element
                const userEmail = document.createElement('a');
                userEmail.className = 'user-email';
                userEmail.href = `mailto:${user.email}`;
                userEmail.textContent = user.email;
                
                // Create company element
                const userCompany = document.createElement('div');
                userCompany.className = 'user-company';
                userCompany.textContent = `Company: ${user.company.name}`;
                
                // Create website element
                const userWebsite = document.createElement('a');
                userWebsite.className = 'user-website';
                userWebsite.href = `https://${user.website}`;
                userWebsite.target = '_blank';
                userWebsite.textContent = `Ìºê ${user.website}`;
                
                // Assemble the user info
                userInfo.appendChild(userName);
                userInfo.appendChild(userEmail);
                userInfo.appendChild(userCompany);
                userInfo.appendChild(userWebsite);
                
                // Assemble the list item
                listItem.appendChild(avatar);
                listItem.appendChild(userInfo);
                
                // Append list item to user list
                userList.appendChild(listItem);
            });
            
            // Append user list to data container
            dataContainer.appendChild(userList);
            
            // Update statistics
            statsContainer.innerHTML = `
                <strong>${users.length}</strong> users loaded successfully 
                | Fetched from: <strong>${apiUrl}</strong>
                | Last updated: <strong>${new Date().toLocaleTimeString()}</strong>
            `;
            
        } catch (error) {
            // Error handling
            console.error('Error fetching user data:', error);
            
            // Clear the existing content
            dataContainer.innerHTML = '';
            
            // Create error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
                <h3>Failed to load user data</h3>
                <p>Error: ${error.message}</p>
                <p>Please check your internet connection and try again.</p>
            `;
            
            // Append error message to data container
            dataContainer.appendChild(errorMessage);
            
            // Update statistics with error
            statsContainer.innerHTML = `
                <strong>Error loading data</strong> 
                | Failed to fetch from: <strong>${apiUrl}</strong>
                | Time: <strong>${new Date().toLocaleTimeString()}</strong>
            `;
            statsContainer.style.color = '#dc3545';
            
        } finally {
            // Hide loading spinner and enable refresh button
            loadingSpinner.classList.add('hidden');
            refreshBtn.disabled = false;
        }
    }
    
    // Add event listener to refresh button
    document.getElementById('refresh-btn').addEventListener('click', fetchUserData);
    
    // Initial fetch when DOM is loaded
    fetchUserData();
});
