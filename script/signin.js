document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.querySelector('form');
  form.classList.add('signin-form');

  // FORM FIELDS
  const formFields = [
    { type: 'email', id: 'email', name: 'email', labelText: 'Email:' },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      labelText: 'Password:',
    },
  ];

  // FORM ACTION
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

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // GET FROM LOCALSTORAGE
    const storedData = localStorage.getItem('formData');
    const data = JSON.parse(storedData);

    // VALIDATE FROM STORED DATA
    if (
      document.querySelector('#email').value === data.email &&
      document.querySelector('#password').value === data.password
    ) {
      window.alert(
        "Welcome! You're signed in and ready for some amazing courses!",
      );
    } else {
      console.log('Invalid email or password');
    }
  });
});
