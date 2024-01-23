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
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const user = yield response.json();
            localStorage.setItem('userId', user.id);
            window.alert('Registration successful! You can now sign in.');
            window.location.href = '/pages/signin.html';
        }
        else {
            window.alert('Registration failed. Please try again.');
        }
        // if (response.ok) {
        //   window.alert('Registration successful! You can now sign in.');
        //   window.location.href = '/pages/signin.html';
        // } else {
        //   window.alert('Registration failed. Please try again.');
        // }
    }));
});
