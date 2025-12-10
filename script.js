function displayInput() {
            // Get values from input fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const age = document.getElementById('age').value;
            const message = document.getElementById('message').value;
            
            // Display the values
            document.getElementById('displayName').textContent = name;
            document.getElementById('displayEmail').textContent = email;
            document.getElementById('displayAge').textContent = age;
            document.getElementById('displayMessage').textContent = message;
            
            // Show the output section
            document.getElementById('output').style.display = 'block';
        }