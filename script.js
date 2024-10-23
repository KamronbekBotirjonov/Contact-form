const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const general = document.getElementById('general');
const support = document.getElementById('support');
const message = document.getElementById('message');
const consent = document.getElementById('consent');

const errorFirstName = document.getElementById('error-first-name');
const errorLastName = document.getElementById('error-last-name');
const errorEmail = document.getElementById('error-email');
const errorQuery = document.getElementById('error-query');
const errorMessage = document.getElementById('error-msg');
const errorConsent = document.getElementById('error-consent');

document.getElementById('submit-btn').addEventListener('click', () => {
    resetErrors([firstName, lastName, email, message, consent]);

    let isValid = true;

    if (firstName.value.trim() === '') {
        showError(firstName, errorFirstName);
        isValid = false;
    }

    if (lastName.value.trim() === '') {
        showError(lastName, errorLastName);
        isValid = false;
    }

    if (email.value.trim() === '') {
        errorEmail.textContent = "This field is required";
        showError(email, errorEmail);
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        errorEmail.textContent = "Enter a valid email";
        showError(email, errorEmail);
        isValid = false;
    }

    if (!general.checked && !support.checked) {
        showError(null, errorQuery);
        isValid = false;
    }

    if (message.value.trim() === '') {
        showError(message, errorMessage);
        isValid = false;
    }

    if (!consent.checked) {
        showError(consent, errorConsent);
        isValid = false;
    }

    if (isValid) {
        document.getElementById('main').classList.remove('mt-[30px]');
        document.getElementById('submitted').classList.remove('hidden');
        clearForm();
    }
});

function clearForm() {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    message.value = '';
    general.checked = false;
    support.checked = false;
    consent.checked = false;
}

function resetErrors(inputs) {
    const errorMessages = document.querySelectorAll('span[id^="error-"]');
    errorMessages.forEach(message => message.classList.add('hidden'));
    inputs.forEach(input => {
        if (input) {
            input.classList.remove('outline-Red', 'text-Red');
        }
    });
    document.getElementById('main').classList.add('mt-[30px]');
    document.getElementById('submitted').classList.add('hidden');
}

function showError(input, message) {
    if (input) {
        input.classList.add('outline-Red', 'text-Red');
    }
    message.classList.remove('hidden');
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}