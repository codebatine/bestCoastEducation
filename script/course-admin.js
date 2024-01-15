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

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error occurred in add method: ${error}`);
    }
  }

  async delete() {
    try {
      const response = await fetch(this.#url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error occurred in delete method: ${error}`);
    }
  }

  async update(data) {
    try {
      const response = await fetch(this.#url, {
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
      throw new Error(`Error occurred in update method: ${error}`);
    }
  }
}

let courses = [];

const initPage = async () => {
  const url = 'http://localhost:3000/courses';
  const httpClient = new HttpClient(url);

  courses = await httpClient.get();
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

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteCourse(course.id);
    });

    courseItem.appendChild(deleteButton);
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

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'save-button';
    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      updateCourse(courseId, form);
    });

    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      updateCourse(courseId, form);
    });
  });

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'save-button';
  saveButton.addEventListener('click', () => updateCourse(courseId, form));

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

const updateCourse = async (courseId, form) => {
  // Get the current course data
  const currentCourse = courses.find((course) => course.id === courseId);

  // Create the updated course object from the current course data
  const updatedCourse = { ...currentCourse };

  // Update the updatedCourse object with the values from the form
  Array.from(form.elements).forEach((element) => {
    if (element.name) {
      updatedCourse[element.name] = element.value;
    }
  });

  const httpClient = new HttpClient(
    `http://localhost:3000/courses/${courseId}`,
  );
  await httpClient.update(updatedCourse);

  courses = await httpClient.get();
  displayCourses(courses, document.querySelector('.courses-container'));
};

const deleteCourse = async (courseId) => {
  const httpClient = new HttpClient(
    `http://localhost:3000/courses/${courseId}`,
  );
  await httpClient.delete();

  courses = await httpClient.get();
  displayCourses(courses, document.querySelector('.courses-container'));
};

const addCourse = async (course) => {
  const httpClient = new HttpClient('http://localhost:3000/courses');
  await httpClient.add(course);

  courses = await httpClient.get();
  displayCourses(courses, document.querySelector('.courses-container'));
};

document.addEventListener('DOMContentLoaded', initPage);
