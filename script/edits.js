// const convertFormDataToJson = (form) => {
//   const formData = new FormData(form);
//   const data = {};

//   for (let [key, value] of formData.entries()) {
//     if (form.elements[key].type === 'checkbox') {
//       data[key] = form.elements[key].checked;
//     } else {
//       data[key] = value;
//     }
//   }

//   return data;
// };

// class HttpClient {
//   #url = '';

//   constructor(url) {
//     this.#url = url;
//   }

//   async request(method, id = '', data = null) {
//     const options = {
//       method,
//       headers: data ? { 'Content-Type': 'application/json' } : {},
//       body: data ? JSON.stringify(data) : null,
//     };

//     try {
//       const response = await fetch(`${this.#url}/${id}`, options);
//       if (!response.ok)
//         throw new Error(`${response.status} ${response.statusText}`);
//       return await response.json();
//     } catch (error) {
//       throw new Error(`An error occurred in the ${method} method: ${error}`);
//     }
//   }

//   get(id = '') {
//     return this.request('GET', id);
//   }

//   add(data) {
//     return this.request('POST', '', data);
//   }

//   delete(id) {
//     return this.request('DELETE', id);
//   }
// }

// const courseTemplate = {
//   id: '',
//   title: '',
//   duration: '',
//   img: '',
//   alt: '',
//   date: '',
//   remote: '',
//   rating: '',
//   details: '',
// };

// const createForm = (form, data, submitHandler) => {
//   Object.keys(data).forEach((key) => {
//     const label = document.createElement('label');
//     label.textContent = key;
//     label.htmlFor = key;

//     let input;
//     if (key === 'details') {
//       input = document.createElement('textarea');
//       input.textContent = data[key];
//     } else {
//       input = document.createElement('input');
//       input.type = ['duration', 'rating'].includes(key)
//         ? 'number'
//         : key === 'date'
//         ? 'date'
//         : key === 'remote'
//         ? 'checkbox'
//         : 'text';
//       input.value = data[key];
//       if (key === 'remote') input.checked = data[key];
//     }

//     input.id = key;
//     input.name = key;

//     form.appendChild(label);
//     form.appendChild(input);
//   });

//   const submitButton = document.createElement('button');
//   submitButton.type = 'submit';
//   submitButton.textContent = 'Add Course';
//   form.appendChild(submitButton);

//   form.addEventListener('submit', submitHandler);
// };

import { HttpClient } from './Http.js';
import { convertFormDataToJson, courseTemplate, createForm } from './utils.js';

const saveCourse = async (e) => {
  e.preventDefault();
  const course = convertFormDataToJson(e.target);
  const http = new HttpClient('http://localhost:3000/courses');
  await http.add(course);
  location.reload();
};

const initPage = async () => {
  const http = new HttpClient('http://localhost:3000/courses');
  const courses = await http.get();
  const courseContainer = document.querySelector('#courses');

  if (courseContainer) {
    courses.forEach((course) => {
      const courseDiv = document.createElement('div');
      courseDiv.textContent = course.title;
      courseDiv.style.marginBottom = '10px';

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the div
        http
          .delete(course.id)
          .then(() => {
            courseDiv.remove(); // Remove the div from the DOM
          })
          .catch((error) => {
            console.error(`Failed to delete course: ${error}`);
          });
      });

      courseDiv.appendChild(deleteButton);
      courseContainer.appendChild(courseDiv);
    });
  }

  const addForm = document.querySelector('#addCourseForm');
  if (addForm) createForm(addForm, courseTemplate, saveCourse);
  displayUsers();
};

const displayUsers = async () => {
  const httpUsers = new HttpClient('http://localhost:3000/users');
  const httpCourses = new HttpClient('http://localhost:3000/courses');
  const users = await httpUsers.get();
  const usersContainer = document.querySelector('#users');

  if (usersContainer) {
    users.forEach(async (user) => {
      const userDiv = document.createElement('div');
      userDiv.textContent = `${user.name}: `;

      if (user.bookedCourses.length > 0) {
        let coursesText = '';
        for (let i = 0; i < user.bookedCourses.length; i++) {
          const course = await httpCourses.get(user.bookedCourses[i]);
          coursesText += (i > 0 ? ', ' : '') + course.title;
        }
        const coursesSpan = document.createElement('span');
        coursesSpan.textContent = coursesText;
        userDiv.appendChild(coursesSpan);
      } else {
        userDiv.textContent += 'No booked courses.';
      }

      usersContainer.appendChild(userDiv);
    });
  }
};

document.addEventListener('DOMContentLoaded', initPage);
