const form = document.querySelector('.main-form');
const submitButton = document.getElementById('loginButton');
const createButton = document.querySelector('.section-two');
const errorMessage = document.getElementById('error-message');
if (window.localStorage.getItem('logged_in_user')) {
    window.location.href = '../edit_user.html';
}

submitButton.onclick = (e) => {
    e.preventDefault();
    const requestBody = {
        username: form.username.value,
        password: form.password.value,
    };
    const hash = btoa(`${requestBody.username}:${requestBody.password}`);

    fetch('http://127.0.0.1:5000/api/v1/user/login', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        if (response.status === 200) {
            window.localStorage.setItem('logged_in_user', hash);
            window.location.href = '../edit_user.html';
        } else {
            response.text().then((data) => {
                errorMessage.textContent = data;
            });
        }
    })
        .catch((error) => {
            // console.log(`Fetch error: ${error}`);
            errorMessage.textContent = JSON.parse(error.message).message;
        });
};

createButton.onclick = (e) => {
    e.preventDefault();
    window.location.href = '../registration.html';
};
