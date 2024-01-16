class HttpClient {
  #url = '';

  constructor(url) {
    this.#url = url;
  }

  async get() {
    try {
      const response = await fetch(this.#url);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error occurred in get method: ${error}`);
    }
  }

  async add(data) {
    try {
      const response = await fetch(this.#url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(`Error occurred in add method: ${error}`);
    }
  }

  async delete(courseId) {
    try {
      const response = await fetch(`${this.#url}/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error occurred in delete method: ${error}`);
    }
  }

  async update(courseId, data) {
    try {
      const response = await fetch(`${this.#url}/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating course: ${error}`);
      throw new Error(`Error occurred in update method: ${error}`);
    }
  }
}

const httpClient = new HttpClient('http://localhost:3000/courses');

let courses = [];

const initPage = async () => {
  const url = 'http://localhost:3000/courses';
  const httpClient = new HttpClient(url);

  courses = await httpClient.get();

  console.log('Fetched courses:', courses);
  displayCourses(courses, document.querySelector('.courses-container'));

  const courseItems = document.querySelectorAll(
    '.courses-container .course-item',
  );
  courseItems.forEach((courseItem) => {
    courseItem.addEventListener('click', openAdminModal);
  });
};

const displayCourses = (courses, container) => {
  container.innerHTML = '';
  courses.forEach((course) => {
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.dataset.courseId = course.id;
    courseItem.addEventListener('click', openAdminModal);

    const courseTitle = document.createElement('div');
    courseTitle.textContent = course.title;
    courseItem.appendChild(courseTitle);

    container.appendChild(courseItem);
  });
};

const openAdminModal = (e) => {
  const courseId = Number(e.currentTarget.dataset.courseId);
  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    console.error(`Course with id ${courseId} not found`);
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'admin-modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'admin-modal-content';

  const closeButton = document.createElement('span');
  closeButton.textContent = 'X';
  closeButton.className = 'close';
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  modalContent.appendChild(closeButton);

  const form = document.createElement('form');
  Object.keys(course).forEach((key) => {
    const label = document.createElement('label');
    label.textContent = key;
    label.htmlFor = key;

    const input = document.createElement('input');
    input.id = key;
    input.name = key;
    input.value = course[key];

    label.appendChild(input);
    form.appendChild(label);
  });

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'save-button';
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    updateCourse(courseId, form);
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', () => deleteCourse(courseId));

  form.appendChild(saveButton);
  form.appendChild(deleteButton);

  modalContent.appendChild(form);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  modal.style.display = 'block';
};

const openAddCourseModal = () => {
  const modal = document.createElement('div');
  modal.className = 'admin-modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'admin-modal-content';

  const closeButton = document.createElement('span');
  closeButton.textContent = 'X';
  closeButton.className = 'close';
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  modalContent.appendChild(closeButton);

  const form = document.createElement('form');
  [
    'id',
    'title',
    'duration',
    'img',
    'alt',
    'date',
    'remote',
    'rating',
    'details',
  ].forEach((key) => {
    const label = document.createElement('label');
    label.textContent = key;
    label.htmlFor = key;

    let input;
    if (key === 'remote') {
      input = document.createElement('input');
      input.type = 'checkbox';
    } else if (key === 'rating') {
      input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.max = '5';
    } else {
      input = document.createElement('input');
      input.type = 'text';
    }
    input.id = key;
    input.name = key;

    label.appendChild(input);
    form.appendChild(label);
  });

  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.className = 'add-course-button';
  addButton.addEventListener('click', (e) => {
    e.preventDefault();
    addCourse(form);
  });

  form.appendChild(addButton);

  modalContent.appendChild(form);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  modal.style.display = 'block';
};

const deleteCourse = async (courseId) => {
  console.log(`Deleting course with ID: ${courseId}`);
  const httpClient = new HttpClient('http://localhost:3000/courses');
  await httpClient.delete(courseId);

  courses = await httpClient.get();
  displayCourses(courses, document.querySelector('.courses-container'));
};

const updateCourse = async (courseId, form) => {
  console.log(`Updating course with ID: ${courseId}`);

  const formData = new FormData(form);
  let updatedCourse = Object.fromEntries(formData);

  ['id', 'duration', 'rating'].forEach((key) => {
    if (updatedCourse[key]) {
      updatedCourse[key] = Number(updatedCourse[key]);
    }
  });

  if (updatedCourse.remote) {
    updatedCourse.remote = updatedCourse.remote === 'true';
  }

  console.log(`Updated course data:`, updatedCourse);

  const httpClient = new HttpClient('http://localhost:3000/courses');
  await httpClient.update(courseId, updatedCourse);

  courses = await httpClient.get();
  displayCourses(courses, document.querySelector('.courses-container'));
};

const addCourse = async (form) => {
  const formData = new FormData(form);
  let data = Object.fromEntries(formData);

  ['id', 'duration', 'rating'].forEach((key) => {
    if (data[key]) {
      data[key] = Number(data[key]);
    }
  });

  if (data.remote) {
    data.remote = data.remote === 'true';
  }

  const httpClient = new HttpClient('http://localhost:3000/courses');
  await httpClient.add(data);

  courses = await httpClient.get();
  displayCourses(courses, document.querySelector('.courses-container'));
};

document.addEventListener('DOMContentLoaded', initPage);
document
  .getElementById('add-course-button')
  .addEventListener('click', openAddCourseModal);
