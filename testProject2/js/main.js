$(document).ready(function() {

    function validateEmail(email) {
        var emailvalidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailvalidate.test(email);
    }

    // Function to validate form data
    function validateForm(email, password) {
        if (email.trim() === "") {
            $('#response').html('<p style="color:red;">Email cannot be empty.</p>');
            return false;
        }

        if (password.trim() === "") {
            $('#response').html('<p style="color:red;">Password cannot be empty.</p>');
            return false;
        }

        if (!validateEmail(email)) {
            $('#response').html('<p style="color:red;">Invalid email format.</p>');
            return false;
        }

        if (password.length < 8) {
            $('#response').html('<p style="color:red;">Password must be at least 8 characters long.</p>');
            return false;
        }

        $('#response').html('');  // Clear the error message
        return true;
    }

    // Capture form submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault(); 

        // Get input values
        var email = $('#email').val();
        var password = $('#password').val();

        // Validate form data
        if (!validateForm(email, password)) {
            return;
        }

        // Ajax call
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts', 
            method: 'POST',
            data: JSON.stringify({
                email: email,
                password: password
            }),
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                alert('Form submitted successfully!\nResponse: ' + JSON.stringify(response));
                $('#email').val(''); 	  // Clear the email field
                $('#password').val('');  // Clear the password field
            },
            error: function(xhr, status, error) {
                alert('Error occurred: ' + error);
            }
        });
    });
});
