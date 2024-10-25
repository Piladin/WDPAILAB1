import { displayUsers } from './getRequest.js';

const API_URL = "http://localhost:8000/";

document.getElementsByClassName('submit-button')[0].addEventListener('click', function(event) {
    event.preventDefault();
    sendPostRequest();
});

async function sendPostRequest() {
    const userData = gatherUserData();

    const validationError = validateUserData(userData);
    if (validationError) {
        alert(validationError);
        return;
    }

    if (!validatePrivacyPolicy(userData.privacyPolicy)) {
        return;
    }

    try {
        const response = await sendRequest(API_URL, userData);
        const newUsers = await handleResponse(response);
        console.log(newUsers);
        displayUsers(newUsers);
    } catch (error) {
        handleError(error);
    }
}

function gatherUserData() {
    return {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        role: document.getElementById("role").value.trim(),
        privacyPolicy: document.getElementById("privacyPolicy").checked
    };
}

function validateUserData(userData) {
    if (!userData.firstName) {
        return "First name cannot be empty.";
    }
    if (!userData.lastName) {
        return "Last name cannot be empty.";
    }
    if (!userData.role) {
        return "Role cannot be empty.";
    }
    return null;
}

function validatePrivacyPolicy(isAgreed) {
    if (!isAgreed) {
        alert("You must agree to the privacy policy.");
        return false;
    }
    return true;
}

async function sendRequest(url, data) {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role
        })
    });
}

async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

function handleError(error) {
    console.error('Error:', error);
}
