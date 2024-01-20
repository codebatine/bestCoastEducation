export async function bookCourse(userId, courseId) {
  const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
  const user = await userResponse.json();

  const bookedCourses = user.bookedCourses || [];
  bookedCourses.push(courseId);

  const updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookedCourses }),
  });

  if (updateResponse.ok) {
    window.alert('Course booked successfully!');
  } else {
    window.alert('Failed to book course. Please try again.');
  }
}
