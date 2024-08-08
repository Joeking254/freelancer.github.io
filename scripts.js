document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for form submission
    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const confirmEmail = document.getElementById("confirm-email").value;
        const password = document.getElementById("password").value;

        if (validateEmail(email) && email === confirmEmail && validatePassword(password)) {
            alert("Sign Up successful!");
            // Redirect or handle sign up logic
        } else {
            alert("Please ensure emails match and both email and password are valid.");
        }
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return re.test(String(password));
    }
});
