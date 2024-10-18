//Validation 

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission until validation passes

    // Get form elements
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const phone = document.getElementById('phone');
    const genderMale = document.getElementById('male');
    const genderFemale = document.getElementById('female');

    // Reset previous error messages
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.remove());

    // Helper function to show error messages
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error text-danger';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    // Validation flags
    let isValid = true;

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.value === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!email.value.match(emailPattern)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Name validation
    if (name.value === '') {
        showError(name, 'Name is required');
        isValid = false;
    }

    // Password validation
    if (password.value === '') {
        showError(password, 'Password is required');
        isValid = false;
    }

    // Confirm Password validation
    if (confirmPassword.value === '') {
        showError(confirmPassword, 'Password confirmation is required');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    // Phone number validation (simple numeric check)
    const phonePattern = /^[0-9]{10,15}$/;
    if (phone.value === '') {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!phone.value.match(phonePattern)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Gender validation (if necessary)
    if (!genderMale.checked && !genderFemale.checked) {
        showError(genderMale.parentElement, 'Please select a gender');
        isValid = false;
    }

    // If all fields are valid, submit the form
    if (isValid) {
        alert('Form submitted successfully!');
        e.target.submit(); // Manually submit the form
    }
});