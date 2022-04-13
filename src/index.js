const loginButton = document.getElementById('loginButton');
const createButton = document.getElementById('SignButton');
const searchAdsButton = document.getElementById('SearchAds');

createButton.onclick = (e) => {
    e.preventDefault();
    window.location.href = '../registration.html';
};

loginButton.onclick = (e) => {
    e.preventDefault();
    window.location.href = '../login.html';
};
searchAdsButton.onclick = (e) => {
    e.preventDefault();
    window.location.href = '../ads.html';
    // in process
};
