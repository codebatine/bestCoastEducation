import { HttpClient } from './Http.js';
import { convertFormDataToJson, courseTemplate, createForm } from './utils.js';

const saveEditedCourse = async (e) => {
  e.preventDefault();
  const course = convertFormDataToJson(e.target);
  const http = new HttpClient('http://localhost:3000/courses');
  await http.update(course.id, course);
  location.reload();
};

const initEditPage = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id');

  const http = new HttpClient('http://localhost:3000/courses');
  const course = await http.get(courseId);

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
    createForm(editForm, course, saveEditedCourse, 'Update Course');
  }
};

document.addEventListener('DOMContentLoaded', initEditPage);
