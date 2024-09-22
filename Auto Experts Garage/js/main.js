// Function to handle login
function handleLogin() {
    const uname = document.getElementById('uname').value;
    const pwd = document.getElementById('pwd').value;

    fetch('../js/users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            const user = users.find(user => user.username === uname && user.password === pwd);
            if (user) {
                sessionStorage.setItem('username', user.username); // Store username in sessionStorage
                window.location.href = './home.html'; // Redirect to home page after login
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('An error occurred while logging in. Please try again later.');
        });
}

// Function to set up event listeners for service buttons
function setupServiceButtons() {
    const preventiveButton = document.querySelector('.preventive');
    const bodyRepairButton = document.querySelector('.body-repair');
    const carCareButton = document.querySelector('.car-care');

    // Add event listeners to buttons
    if (preventiveButton) {
        preventiveButton.addEventListener('click', function() {
            window.location.href = './preventive-maintenance-service.html';
        });
    }

    if (bodyRepairButton) {
        bodyRepairButton.addEventListener('click', function() {
            window.location.href = './body-repair-service.html';
        });
    }

    if (carCareButton) {
        carCareButton.addEventListener('click', function() {
            window.location.href = './car-care-service.html';
        });
    }
}

// Function to initialize the application
function init() {
    // Handle the login functionality
    const loginButton = document.querySelector('input[type="button"]');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }

    // Handle 'Explore More' button on home page
    const exploreMoreButton = document.querySelector('.explore-more'); // Ensure this class exists in home.html
    if (exploreMoreButton) {
        exploreMoreButton.addEventListener('click', function() {
            window.location.href = './services.html'; // Redirect to services page
        });
    }

    // Setup service buttons only on the services page
    if (document.title.includes('Services')) {
        setupServiceButtons();
        
        // Add event listener for Book Service button on preventive maintenance service page
        if (document.title.includes('Preventive Maintenance Service | AutoMob-Mechanic')) { // Check if on preventive maintenance page
            const bookServiceButton = document.querySelector('.book-service');
            if (bookServiceButton) {
                bookServiceButton.addEventListener('click', function() {
                    console.log("Book Service button clicked"); // Debug log
                    window.location.href = './booking.html'; // Redirect to booking page
                });
            }
        }
    }

    // Handle logout functionality
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function() {
            sessionStorage.removeItem('username');
            window.location.href = './login.html'; // Redirect to login page after logout
        });
    }

    // Display username on the home page if logged in
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('name').textContent = `Welcome, ${username}`;
        document.getElementById('login').style.display = 'none';
        logoutLink.style.display = 'inline';
    } else {
        logoutLink.style.display = 'none';
    }

    // Countdown Timer
    const offerDuration = 10 * 60; // 10 minutes in seconds
    let remainingTime = offerDuration;

    const countdownElement = document.getElementById('counter');

    function updateTimer() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        countdownElement.textContent = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

        if (remainingTime > 0) {
            remainingTime--;
        } else {
            clearInterval(timerInterval);
            alert("The offer has expired!");
        }
    }

    const timerInterval = setInterval(updateTimer, 1000); // Update timer every second
    updateTimer(); // Initialize the timer display
}

// Call init when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);