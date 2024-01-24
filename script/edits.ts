import { HttpClient } from './Http.js';
import { convertFormDataToJson, courseTemplate, createForm } from './utils.js';

interface Course {
  id: string;
  title: string;
}

interface User {
  name: string;
  bookedCourses: string[];
}

const saveCourse = async (e: Event) => {
  e.preventDefault();
  const course = convertFormDataToJson((e.target as HTMLFormElement));
  const http = new HttpClient('http://localhost:3000/courses');
  await http.add(course);
  location.reload();
};

const initPage = async () => {
  const http = new HttpClient('http://localhost:3000/courses');
  const courses: Course[] = await http.get();
  const courseContainer = document.querySelector('#courses');

  if (courseContainer) {
    courses.forEach((course: Course) => {
      const courseDiv = document.createElement('div');
      courseDiv.style.marginBottom = '10px';

      const courseTitle = document.createElement('h3');
      courseTitle.textContent = course.title;
      courseDiv.appendChild(courseTitle);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        http
          .delete(course.id)
          .then(() => {
            courseDiv.remove();
          })
          .catch((error: Error) => {
            console.error(`Failed to delete course: ${error}`);
          });
      });

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'edit-button';
      editButton.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        window.location.href = `edit-course.html?id=${course.id}`;
      });

      courseDiv.appendChild(editButton);
      courseContainer.appendChild(courseDiv);

      courseDiv.appendChild(deleteButton);
      courseContainer.appendChild(courseDiv);
    });
  }

  const addForm = document.querySelector('#addCourseForm') as HTMLFormElement;
  if (addForm) createForm(addForm, courseTemplate, saveCourse);
  displayUsers();
};

const displayUsers = async () => {
  const httpUsers = new HttpClient('http://localhost:3000/users');
  const httpCourses = new HttpClient('http://localhost:3000/courses');
  const users: User[] = await httpUsers.get();
  const usersContainer = document.querySelector('#users');

  if (usersContainer) {
    users.forEach(async (user: User) => {
      const userDiv = document.createElement('div');
      userDiv.textContent = `${user.name}: `;

      if (user.bookedCourses && user.bookedCourses.length) {
        let coursesText = '';
        for (let i = 0; i < user.bookedCourses.length; i++) {
          const course: Course = await httpCourses.get(user.bookedCourses[i]);
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