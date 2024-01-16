const formFields = [
  { type: 'text', id: 'name', name: 'name', labelText: 'Name:' },
  {
    type: 'text',
    id: 'address',
    name: 'address',
    labelText: 'Billing Address:',
  },
  { type: 'email', id: 'email', name: 'email', labelText: 'Email:' },
  { type: 'tel', id: 'phone', name: 'phone', labelText: 'Phone:' },
  {
    type: 'password',
    id: 'password',
    name: 'password',
    labelText: 'Password:',
  },
];

document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.querySelector('form');
  form.classList.add('register-form');

  formFields.forEach((field) => {
    const label = document.createElement('label');
    label.setAttribute('for', field.id);
    label.textContent = field.labelText;

    const input = document.createElement('input');
    input.setAttribute('type', field.type);
    input.setAttribute('id', field.id);
    input.setAttribute('name', field.name);

    form.appendChild(label);
    form.appendChild(document.createElement('br'));
    form.appendChild(input);
    form.appendChild(document.createElement('br'));
  });

  const submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('value', 'Register');
  submitButton.classList.add('button');

  form.appendChild(submitButton);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {
      name: document.querySelector('#name').value,
      address: document.querySelector('#address').value,
      email: document.querySelector('#email').value,
      phone: document.querySelector('#phone').value,
      password: document.querySelector('#password').value,
    };

    for (let key in data) {
      if (!data[key]) {
        window.alert(`Please fill in the ${key} field.`);
        return;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      window.alert('Please enter a valid email address.');
      return;
    }
    localStorage.setItem('formData', JSON.stringify(data));
    window.alert('Registration successful! You can now sign in.');
    window.location.href = '/pages/signin.html';
  });
});
