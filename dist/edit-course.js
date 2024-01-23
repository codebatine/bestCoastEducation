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
import { convertFormDataToJson, createForm } from './utils.js';
const saveEditedCourse = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const course = convertFormDataToJson(e.target);
    const http = new HttpClient('http://localhost:3000/courses');
    yield http.update(course.id, course);
    location.reload();
});
const initEditPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const http = new HttpClient('http://localhost:3000/courses');
    const course = yield http.get(courseId);
    const editContainer = document.querySelector('.edit-container');
    if (editContainer) {
        // Create a new div
        const newDiv = document.createElement('div');
        newDiv.id = 'edit-course-form';
        // Create a new form
        const editForm = document.createElement('form');
        editForm.id = 'editCourseForm';
        // Add the form to the new div
        newDiv.appendChild(editForm);
        // Add the new div to the edit container
        editContainer.appendChild(newDiv);
        // Use the createForm function to create the form fields and attach the submit event listener
        createForm(editForm, course, saveEditedCourse);
    }
});
document.addEventListener('DOMContentLoaded', initEditPage);
