var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpClient } from './Http.js';
import { convertFormDataToJson, courseTemplate, createForm } from './utils.js';
const saveCourse = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const course = convertFormDataToJson(e.target);
    const http = new HttpClient('http://localhost:3000/courses');
    yield http.add(course);
    location.reload();
});
const initPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const http = new HttpClient('http://localhost:3000/courses');
    const courses = yield http.get();
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
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-button';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                // Redirect to the edit page with the course ID as a URL parameter
                window.location.href = `edit-course.html?id=${course.id}`;
            });
            courseDiv.appendChild(editButton);
            courseContainer.appendChild(courseDiv);
            courseDiv.appendChild(deleteButton);
            courseContainer.appendChild(courseDiv);
        });
    }
    const addForm = document.querySelector('#addCourseForm');
    if (addForm)
        createForm(addForm, courseTemplate, saveCourse);
    displayUsers();
});
const displayUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const httpUsers = new HttpClient('http://localhost:3000/users');
    const httpCourses = new HttpClient('http://localhost:3000/courses');
    const users = yield httpUsers.get();
    const usersContainer = document.querySelector('#users');
    if (usersContainer) {
        users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
            const userDiv = document.createElement('div');
            userDiv.textContent = `${user.name}: `;
            if (user.bookedCourses.length > 0) {
                let coursesText = '';
                for (let i = 0; i < user.bookedCourses.length; i++) {
                    const course = yield httpCourses.get(user.bookedCourses[i]);
                    coursesText += (i > 0 ? ', ' : '') + course.title;
                }
                const coursesSpan = document.createElement('span');
                coursesSpan.textContent = coursesText;
                userDiv.appendChild(coursesSpan);
            }
            else {
                userDiv.textContent += 'No booked courses.';
            }
            usersContainer.appendChild(userDiv);
        }));
    }
});
document.addEventListener('DOMContentLoaded', initPage);
