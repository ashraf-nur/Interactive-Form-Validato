const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const phone = document.getElementById('phone');
const age = document.getElementById('age');
const submitBtn = document.getElementById('submitBtn');
const togglePassword = document.getElementById('togglePassword');
const usernameCounter = document.getElementById('username-counter');

const validators = {
  username: value => /^[a-zA-Z0-9_]{3,15}$/.test(value),
  password: value => value.length >= 8,
  confirmPassword: value => value === password.value && value.length >= 8,
  phone: value => value === '' || /^\d{11}$/.test(value),
  age: value => value >= 18 && value <= 100
};

function setStatus(input, message, isValid) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  if (isValid) {
    formControl.classList.remove('error');
    formControl.classList.add('success');
    small.innerText = '';
  } else {
    formControl.classList.remove('success');
    formControl.classList.add('error');
    small.innerText = message;
  }
}

function validateInput(input) {
  const id = input.id;
  const value = input.value.trim();
  let isValid = true;
  let message = '';

  switch (id) {
    case 'username':
      isValid = validators.username(value);
      message = isValid ? '' : 'Username must be 3-15 characters (letters, numbers, underscores).';
      break;
    case 'password':
      isValid = validators.password(value);
      message = isValid ? '' : 'Password must be at least 8 characters.';
      break;
    case 'confirmPassword':
      isValid = validators.confirmPassword(value);
      message = isValid ? '' : 'Passwords do not match.';
      break;
    case 'phone':
      isValid = validators.phone(value);
      message = isValid ? '' : 'Phone number must be 11 digits.';
      break;
    case 'age':
      isValid = validators.age(value);
      message = isValid ? '' : 'Age must be between 18 and 100.';
      break;
  }

  setStatus(input, message, isValid);
  updateSubmitButton();
}

function updateSubmitButton() {
  const allValid = [...form.querySelectorAll('input[required]')]
    .every(input => input.parentElement.classList.contains('success'));
  submitBtn.disabled = !allValid;
}

form.addEventListener('input', e => {
  if (e.target.tagName === 'INPUT') validateInput(e.target);
  if (e.target === username) {
    usernameCounter.textContent = ${e.target.value.length} / 15;
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Form submitted successfully!');
});

togglePassword.addEventListener('click', () => {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
});