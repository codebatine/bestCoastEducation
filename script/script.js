import { bookCourse } from './course.js';

document.addEventListener('DOMContentLoaded', (event) => {
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      processData(data.courses);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function processData(data) {
    data.forEach(createCourseCard);
  }

  fetchData('/data.json');

  function createCourseCard(course) {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';

    courseCard.addEventListener('mouseover', () => {
      courseCard.style.backgroundColor = '#f1f1f1';
    });

    courseCard.addEventListener('mouseout', () => {
      courseCard.style.backgroundColor = '';
    });

    const image = document.createElement('img');
    image.src = course.img;
    image.alt = course.alt;
    courseCard.appendChild(image);

    const title = document.createElement('h2');
    title.className = 'course-title';
    title.textContent = course.title;
    courseCard.appendChild(title);

    const details = document.createElement('p');
    details.className = 'course-details';
    details.textContent = `Course ID: ${course.id} | Duration: ${course.duration} days`;
    courseCard.appendChild(details);

    const availability = document.createElement('p');
    availability.className = 'course-availability';
    const availabilityText = course.remote
      ? 'Available remotely'
      : 'Not available remotely';
    availability.textContent = `Availability: ${availabilityText}`;
    courseCard.appendChild(availability);

    const date = document.createElement('p');
    date.className = 'course-date';
    date.textContent = `Start date: ${course.date}`;
    courseCard.appendChild(date);

    const rating = document.createElement('p');
    rating.className = 'course-rating';
    rating.textContent = `Rating: ${course.rating}`;
    courseCard.appendChild(rating);

    const readMoreButton = document.createElement('button');
    readMoreButton.className = 'button';
    readMoreButton.textContent = 'Read More';
    readMoreButton.addEventListener('click', () => {
      const modal = document.querySelector('#course-modal');
      document.querySelector('#modal-title').textContent = course.title;
      document.querySelector('#modal-image').src = course.img;
      document.querySelector(
        '#modal-details',
      ).textContent = `Course ID: ${course.id} | Duration: ${course.duration} days`;
      document.querySelector(
        '#modal-availability',
      ).textContent = `Availability: ${
        course.remote ? 'Available remotely' : 'Not available remotely'
      }`;
      document.querySelector(
        '#modal-date',
      ).textContent = `Start date: ${course.date}`;
      document.querySelector(
        '#modal-rating',
      ).textContent = `Rating: ${course.rating}`;
      document.querySelector(
        '#modal-course-details',
      ).textContent = `Details: ${course.details}`;
      modal.style.display = 'block';
    });
    courseCard.appendChild(readMoreButton);

    const bookButton = document.createElement('button');
    bookButton.className = 'button';
    bookButton.textContent = 'Book Course';
    bookButton.addEventListener('click', () => {
      const userId = localStorage.getItem('userId');
      const courseId = course.id;
      bookCourse(userId, courseId);
    });
    courseCard.appendChild(bookButton);

    document.querySelector('.courses-container').appendChild(courseCard);

    document.querySelector('.close').addEventListener('click', () => {
      document.querySelector('#course-modal').style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      const modal = document.querySelector('#course-modal');
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  }
});
