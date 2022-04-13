const form = document.querySelector('.form');
const registerButton = document.querySelector('.section-two');
const password2 = document.getElementById('password2');
const errorMessage = document.getElementById('error-message');

registerButton.onclick = (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        const requestBody = {
            name: form.name.value,
            username: form.username.value,
            email: form.email.value,
            locationId: form.location.value,
            password: form.password.value,
        };
        if (password2.value !== requestBody.password) {
            errorMessage.textContent = 'Passwords do not match.';
            return;
        }

        fetch('http://127.0.0.1:5000/api/v1/user', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = '../login.html';
            } else {
                response.text().then((data) => {
                    throw data;
                });
            }
        })
            .catch((error) => {
                // console.log(`Fetch error: ${error}`);
                errorMessage.textContent = JSON.parse(error.message).message;
            });
    } else {
        errorMessage.textContent = 'All field are required';
    }
};
