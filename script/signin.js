document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.querySelector('form');
  form.classList.add('signin-form');

  const formFields = [
    { type: 'email', id: 'email', name: 'email', labelText: 'Email:' },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      labelText: 'Password:',
    },
  ];

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
  submitButton.setAttribute('value', 'Sign In');
  submitButton.classList.add('button');

  form.appendChild(submitButton);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (user) {
      window.alert(
        "Welcome! You're signed in and ready for some amazing courses!",
      );
      window.location.href = '../index.html';
    } else {
      console.log('Invalid email or password');
    }
  });
});
