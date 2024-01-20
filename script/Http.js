export class HttpClient {
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
