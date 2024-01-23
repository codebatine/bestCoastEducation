import { loadCourseData } from './edit-course';

describe('Edit Course', () => {
  test('loadCourseData populates the form', async () => {
    document.body.innerHTML = `
      <div id="edit-course-form">
        <input name="title" />
        <input name="description" />
      </div>
    `;

    const mockData = { title: 'Test Course', description: 'Test Description' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    await loadCourseData();

    expect((document.querySelector('input[name="title"]') as HTMLInputElement).value).toBe(mockData.title);
    expect((document.querySelector('input[name="description"]') as HTMLInputElement).value).toBe(mockData.description);
  });
});