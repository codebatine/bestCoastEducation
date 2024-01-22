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
      courseDiv.style.marginBottom = '10px';

      const courseTitle = document.createElement('h3');
      courseTitle.textContent = course.title;
      courseDiv.appendChild(courseTitle);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        http
          .delete(course.id)
          .then(() => {
            courseDiv.remove();
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
