export const convertFormDataToJson = (form) => {
  const data = {};
  for (let key of form.elements) {
    if (key.name) {
      if (key.type === 'checkbox') {
        data[key.name] = key.checked;
      } else {
        data[key.name] =
          key.name === 'remote' ? key.value === 'true' : key.value;
      }
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
  price: '',
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
  submitButton.className = 'button';
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  form.appendChild(submitButton);

  form.addEventListener('submit', submitHandler);
};
