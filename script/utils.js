export const convertFormDataToJson = (form) => {
  const formData = new FormData(form);
  const data = {};

  for (let [key, value] of formData.entries()) {
    if (form.elements[key].type === 'checkbox') {
      data[key] = form.elements[key].checked;
    } else {
      data[key] = value;
    }
  }

  return data;
};

export const courseTemplate = {
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

export const createForm = (form, data, submitHandler) => {
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
