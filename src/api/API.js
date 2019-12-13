import { Storage } from './Storage';

const ENDPOINTS = {
  'applications.get': ['get', '/api/v1/public/applications/'],
  'categories.get': ['get', '/api/v1/public/categories/']
};

const BASE_URL = 'https://apps.elfsight.com';

const CATEGORY_ALL = {
  id: 0,
  name: 'All'
};

export class API {
  constructor() {
    this.storage = new Storage();
  }

  async getApplications() {
    return await this.storage.get('applications', async () => await API.call('applications.get'));
  }

  async getCategories() {
    const categories = await this.storage.get('categories', async () => await API.call('categories.get'));

    return [CATEGORY_ALL, ...categories];
  }

  async getApplication(alias) {
    if (!alias) {
      return false;
    }

    const applications = await this.getApplications();

    return applications.find(item => item.alias === alias);
  }

  static async call(endpoint, params = {}) {
    const {
      method,
      url,
    } = this.getEndpoint(endpoint, params);

    const request = await this.request(url, { method });

    return request.data;
  }

  static async request(url, { method }) {
    const response = await fetch(url, {
      method
    });

    return await response.json();
  }

  static getEndpoint(entity, params = {}) {
    if (!ENDPOINTS[entity]) {
      throw new Error('Endpoint not exist');
    }

    let [method, url] = ENDPOINTS[entity];

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        url = url.replace(`<${key}>`, params[key]);
      }
    }

    return {
      method,
      url: BASE_URL + url
    };
  }
}
