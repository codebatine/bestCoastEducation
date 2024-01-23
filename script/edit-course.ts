import { HttpClient } from './Http.js';
import { convertFormDataToJson, courseTemplate, createForm } from './utils.js';

const saveEditedCourse = async (e: Event) => {
  e.preventDefault();
  const course = convertFormDataToJson((e.target as HTMLFormElement));
  const http = new HttpClient('http://localhost:3000/courses');
  await http.update(course.id, course);
  location.reload();
};

const initEditPage = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id');

  const http = new HttpClient('http://localhost:3000/courses');
  const course = await http.get(courseId as string);

  const editContainer = document.querySelector('.edit-container');
  if (editContainer) {

    const newDiv = document.createElement('div');
    newDiv.id = 'edit-course-form';

    const editForm = document.createElement('form');
    editForm.id = 'editCourseForm';

    newDiv.appendChild(editForm);

    editContainer.appendChild(newDiv);

    createForm(editForm, course, saveEditedCourse);
  }
};

document.addEventListener('DOMContentLoaded', initEditPage);