// const convertFormDataToJson = (formData) => {
//   const data = Object.fromEntries(formData.entries());
//   return data;
// };

// class HttpClient {
//   #url = '';

//   constructor(url) {
//     this.#url = url;
//   }
//   async get() {
//     try {
//       const response = await fetch(this.#url);

//       if (response.ok) {
//         const result = await response.json();
//         return result;
//       } else {
//         throw new Error(`${response.status} ${response.statusText}`);
//       }
//     } catch (error) {
//       throw new Error(`Ett fel inträffade i get metoden: ${error}`);
//     }
//   }

//   async add(data) {
//     try {
//       const response = await fetch(this.#url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         return result;
//       } else {
//         throw new Error(`${response.status} ${response.statusText}`);
//       }
//     } catch (error) {
//       throw new Error(`Ett fel inträffade i add metoden: ${error}`);
//     }
//   }

//   async update(id, data) {
//     try {
//       const response = await fetch(`${this.#url}/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         return result;
//       } else {
//         throw new Error(`${response.status} ${response.statusText}`);
//       }
//     } catch (error) {
//       throw new Error(`An error occurred in the update method: ${error}`);
//     }
//   }

//   async delete(id) {
//     try {
//       const response = await fetch(`${this.#url}/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         const result = await response.json();
//         return result;
//       } else {
//         throw new Error(`${response.status} ${response.statusText}`);
//       }
//     } catch (error) {
//       throw new Error(`An error occurred in the delete method: ${error}`);
//     }
//   }
// }

// const initPage = async () => {
//   const url = 'http://localhost:3000/courses';
//   const http = new HttpClient(url);

//   const courses = await http.get();
//   const courseList = document.querySelector('#courses');

//   if (courseList) {
//     // Check if the courses element exists
//     courses.forEach((course) => {
//       const listItem = document.createElement('li');
//       listItem.textContent = course.title;
//       listItem.addEventListener('click', () => {
//         location.href = `../edits/edit-course.html?id=${course.id}`;
//       });
//       courseList.appendChild(listItem);
//     });
//   }
// };

// document.addEventListener('DOMContentLoaded', initPage);

// const selectedCourse = (e) => {
//   let courseId = 0;
//   if (e.target.localName === 'div') {
//     courseId = e.target.getAttribute('courseid');
//   } else if (e.target.localName === 'span') {
//     courseId = e.target.parentElement.getAttribute('courseid');
//   }

//   location.href = `./edit-course.html?id=${courseId}`;
// };

// document.addEventListener('DOMContentLoaded', initPage);

// const form = document.querySelector('#addCourseForm');

// const addCourse = async (e) => {
//   e.preventDefault();

//   const course = new FormData(form);
//   const obj = convertFormDataToJson(course);
//   saveCourse(obj);
// };

// const saveCourse = async (course) => {
//   const url = 'http://localhost:3000/courses';
//   const http = new HttpClient(url);
//   await http.add(course);
//   location.href = './index.html';
// };

// form.addEventListener('submit', addCourse);

// function initPageDetails() {
//   const courseId = location.search.split('=')[1];
//   displayCourseDetails(courseId);
// }

// async function displayCourseDetails(id) {
//   const url = 'http://localhost:3000/courses/' + id;
//   const http = new HttpClient(url);
//   const course = await http.get();
//   console.log(course);
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('#addCourseForm');
//   if (form) {
//     form.addEventListener('submit', addCourse);
//   }
//   const courseTemplate = {
//     id: '',
//     title: '',
//     duration: '',
//     img: '',
//     alt: '',
//     date: '',
//     remote: '',
//     rating: '',
//     details: '',
//   };

//   Object.keys(courseTemplate).forEach((key) => {
//     const label = document.createElement('label');
//     label.textContent = key;
//     label.htmlFor = key;

//     let input;
//     if (key === 'remote') {
//       input = document.createElement('input');
//       input.type = 'checkbox';
//     } else if (key === 'duration' || key === 'rating') {
//       input = document.createElement('input');
//       input.type = 'number';
//     } else if (key === 'date') {
//       input = document.createElement('input');
//       input.type = 'date';
//     } else {
//       input = document.createElement('input');
//       input.type = 'text';
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

//   form.addEventListener('submit', addCourse);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('#editCourseForm');

//   if (form) {
//     populateForm(form);
//   }
// });

// function getCourseIdFromUrl() {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get('id');
// }

// async function populateForm(form) {
//   let courseTemplate = {
//     id: '',
//     title: '',
//     duration: '',
//     img: '',
//     alt: '',
//     date: '',
//     remote: '',
//     rating: '',
//     details: '',
//   };

//   // Fetch course data from server
//   const courseId = getCourseIdFromUrl();
//   const url = 'http://localhost:3000/courses/' + courseId;
//   const http = new HttpClient(url);
//   let courseData;

//   try {
//     courseData = await http.get();
//   } catch (error) {
//     console.error(`GET request failed: ${error}`);
//   }

//   // Merge the fetched data into the courseTemplate object
//   courseTemplate = { ...courseTemplate, ...courseData };

//   // If we're editing a course, fetch the course data and populate the form with it
//   if (form.id === 'editCourseForm') {
//     // Merge the course data with the course template
//     Object.assign(courseTemplate, courseData);
//   }

//   Object.keys(courseTemplate).forEach((key) => {
//     const label = document.createElement('label');
//     label.textContent = key;
//     label.htmlFor = key;

//     let input;
//     if (key === 'remote') {
//       input = document.createElement('input');
//       input.type = 'checkbox';
//       input.checked = courseTemplate[key];
//     } else if (key === 'duration' || key === 'rating') {
//       input = document.createElement('input');
//       input.type = 'number';
//       input.value = courseTemplate[key];
//     } else if (key === 'date') {
//       input = document.createElement('input');
//       input.type = 'date';
//       input.value = courseTemplate[key];
//     } else {
//       input = document.createElement('input');
//       input.type = 'text';
//       input.value = courseTemplate[key];
//     }

//     input.id = key;
//     input.name = key;

//     form.appendChild(label);
//     form.appendChild(input);
//   });

//   const submitButton = document.createElement('button');
//   submitButton.type = 'submit';
//   submitButton.textContent =
//     form.id === 'editCourseForm' ? 'Edit Course' : 'Add Course';
//   form.appendChild(submitButton);
// }

// const convertFormDataToJson = (formData) =>
//   Object.fromEntries(formData.entries());

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

//   update(id, data) {
//     return this.request('PUT', id, data);
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

//     const input = document.createElement('input');
//     input.id = key;
//     input.name = key;
//     input.type = ['duration', 'rating'].includes(key)
//       ? 'number'
//       : key === 'date'
//       ? 'date'
//       : key === 'remote'
//       ? 'checkbox'
//       : 'text';
//     input.value = data[key];
//     if (key === 'remote') input.checked = data[key];

//     form.appendChild(label);
//     form.appendChild(input);
//   });

//   const submitButton = document.createElement('button');
//   submitButton.type = 'submit';
//   submitButton.textContent =
//     submitHandler === saveCourse ? 'Add Course' : 'Edit Course';
//   form.appendChild(submitButton);

//   form.addEventListener('submit', submitHandler);
// };

// const saveCourse = async (e) => {
//   e.preventDefault();
//   const course = convertFormDataToJson(new FormData(e.target));
//   const http = new HttpClient('http://localhost:3000/courses');
//   await http.add(course);
//   location.href = './index.html';
// };

// const updateCourse = async (e) => {
//   e.preventDefault();
//   const course = convertFormDataToJson(new FormData(e.target));
//   const http = new HttpClient('http://localhost:3000/courses');
//   await http.update(course.id, course);
//   location.href = './index.html';
// };

// const initPage = async () => {
//   const http = new HttpClient('http://localhost:3000/courses');
//   const courses = await http.get();
//   const courseContainer = document.querySelector('#courses');

//   if (courseContainer) {
//     courses.forEach((course) => {
//       const courseDiv = document.createElement('div');
//       courseDiv.textContent = course.title;
//       courseDiv.style.cursor = 'pointer';
//       courseDiv.style.marginBottom = '10px';

//       const deleteButton = document.createElement('button');
//       deleteButton.textContent = 'Delete';
//       deleteButton.addEventListener('click', (e) => {
//         e.stopPropagation(); // Prevent the click event from bubbling up to the div
//         http
//           .delete(course.id)
//           .then(() => {
//             courseDiv.remove(); // Remove the div from the DOM
//           })
//           .catch((error) => {
//             console.error(`Failed to delete course: ${error}`);
//           });
//       });

//       courseDiv.appendChild(deleteButton);

//       courseDiv.addEventListener('click', () => {
//         location.href = `../edits/edit-course.html?id=${course.id}`;
//       });

//       courseContainer.appendChild(courseDiv);
//     });
//   }

//   const addForm = document.querySelector('#addCourseForm');
//   if (addForm) createForm(addForm, courseTemplate, saveCourse);

//   const editForm = document.querySelector('#editCourseForm');
//   if (editForm) {
//     const courseId = new URLSearchParams(window.location.search).get('id');
//     const courseData = await http.get(courseId);
//     createForm(editForm, { ...courseTemplate, ...courseData }, updateCourse);
//   }
// };

// document.addEventListener('DOMContentLoaded', initPage);

const convertFormDataToJson = (formData) =>
  Object.fromEntries(formData.entries());

class HttpClient {
  #url = '';

  constructor(url) {
    this.#url = url;
  }

  async request(method, id = '', data = null) {
    const options = {
      method,
      headers: data ? { 'Content-Type': 'application/json' } : {},
      body: data ? JSON.stringify(data) : null,
    };

    try {
      const response = await fetch(`${this.#url}/${id}`, options);
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      throw new Error(`An error occurred in the ${method} method: ${error}`);
    }
  }

  get(id = '') {
    return this.request('GET', id);
  }

  add(data) {
    return this.request('POST', '', data);
  }

  delete(id) {
    return this.request('DELETE', id);
  }
}

const courseTemplate = {
  id: '',
  title: '',
  duration: '',
  img: '',
  alt: '',
  date: '',
  remote: '',
  rating: '',
  details: '',
};

const createForm = (form, data, submitHandler) => {
  Object.keys(data).forEach((key) => {
    const label = document.createElement('label');
    label.textContent = key;
    label.htmlFor = key;

    let input;
    if (key === 'details') {
      input = document.createElement('textarea');
      input.textContent = data[key];
    } else {
      input = document.createElement('input');
      input.type = ['duration', 'rating'].includes(key)
        ? 'number'
        : key === 'date'
        ? 'date'
        : key === 'remote'
        ? 'checkbox'
        : 'text';
      input.value = data[key];
      if (key === 'remote') input.checked = data[key];
    }

    input.id = key;
    input.name = key;

    form.appendChild(label);
    form.appendChild(input);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Add Course';
  form.appendChild(submitButton);

  form.addEventListener('submit', submitHandler);
};

const saveCourse = async (e) => {
  e.preventDefault();
  const course = convertFormDataToJson(new FormData(e.target));
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
};

document.addEventListener('DOMContentLoaded', initPage);
