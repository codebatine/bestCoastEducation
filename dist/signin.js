"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const response = yield fetch('http://localhost:3000/users');
        const users = yield response.json();
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            window.alert("Welcome! You're signed in and ready for some amazing courses!");
            window.location.href = '../index.html'; // Redirect to index.html
        }
        else {
            console.log('Invalid email or password');
        }
    }));
});
