export class HttpClient {
  #url: string;

  constructor(url: string) {
    this.#url = url;
  }

  async request(method: string, id: string = '', data: any = null): Promise<any> {
    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
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

  get(id: string = ''): Promise<any> {
    return this.request('GET', id);
  }

  add(data: any): Promise<any> {
    return this.request('POST', '', data);
  }

  update(id: string, data: any): Promise<any> {
    return this.request('PUT', id, data);
  }

  delete(id: string): Promise<any> {
    return this.request('DELETE', id);
  }
}