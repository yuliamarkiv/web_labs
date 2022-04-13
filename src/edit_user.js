const errorMessage = document.getElementById('error-message');
const logoutButton = document.getElementById('logout_button');
const submitButton = document.getElementById('loginButton');
const currentUser = window.localStorage.getItem('logged_in_user');
const deleteButton = document.getElementById('deleteButton');

function getCurrentUserCreds() {
    return atob(window.localStorage.getItem('logged_in_user')).split(':');
}
// console.log(currentUser);
if (!currentUser) {
    window.location.href = '../login.html';
}

function getUser() {
    const headers = new Headers();
    headers.set('Authorization', `Basic ${window.localStorage.getItem('logged_in_user')}`);
    headers.set('content-type', 'application/json');
    fetch(`http://127.0.0.1:5000/api/v1/user/${getCurrentUserCreds()[0]}`, {
        method: 'GET',
        headers,
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    }).then((data) => {
        const name = document.getElementById('name');
        name.value = data.name;
        const username = document.getElementById('username');
        username.value = data.username;
        const email = document.getElementById('email');
        email.value = data.email;
        const locationId = document.getElementById('location');
        locationId.value = data.locationId;
        const password = document.getElementById('password');
        password.value = '';
        const confirmPassword = document.getElementById('confirm_password');
        confirmPassword.value = '';
    });
}
function updateUser(userData) {
    const headers = new Headers();
    headers.set('Authorization', `Basic ${window.localStorage.getItem('logged_in_user')}`);
    headers.set('content-type', 'application/json');
    return fetch(`http://127.0.0.1:5000/api/v1/user/${getCurrentUserCreds()[0]}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers,
    });
}
function deleteUser() {
    const headers = new Headers();
    headers.set('Authorization', `Basic ${window.localStorage.getItem('logged_in_user')}`);
    headers.set('content-type', 'application/json');
    fetch(`http://127.0.0.1:5000/api/v1/user/${getCurrentUserCreds()[0]}`, {
        method: 'DELETE',
        headers,
    }).then(() => {
        window.localStorage.removeItem('logged_in_user');
        window.location.href = '../index.html';
    });
}
async function saveButtonHandler(event) {
    event.preventDefault();
    const name = document.getElementById('name');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const locationId = document.getElementById('location');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    if (password.value !== confirmPassword.value) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }
    const userData = {
        name: name.value,
        username: username.value,
        locationId: locationId.value,

    };
    if (email.value !== '') {
        errorMessage.textContent = 'Email can`t be changed';
        return;
    }

    if (password.value !== '') {
        userData.password = password.value;
    }
    updateUser(userData)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(await response.text());
            }
            let token;

            if (typeof userData.password !== 'undefined') {
                token = `${userData.username}:${userData.password}`;
            } else {
                token = `${userData.username}:${getCurrentUserCreds()[1]}`;
            }

            const hash = btoa(token);
            window.localStorage.setItem('logged_in_user', hash);
            window.location.href = '../edit_user.html';

            return response.text();
        })
        .catch((error) => {
            // console.log(`Fetch error: ${error}`);
            errorMessage.textContent = JSON.parse(error.message).message;
        });
}
logoutButton.onclick = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('logged_in_user');
    window.location.href = '../login.html';
};
deleteButton.onclick = (e) => {
    e.preventDefault();
    deleteUser();
};
submitButton.addEventListener('click', saveButtonHandler);
window.addEventListener('load', getUser);
