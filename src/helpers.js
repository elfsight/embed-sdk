export const cleanReferralId = (ref) => {
  const REFERRAL_BASE_URL = 'https://elfsight.com/?ref=';

  return ref.replace(REFERRAL_BASE_URL, '');
};

export const parametrize = (params) => Object.keys(params)
  .filter(key => !!params[key])
  .map(key => `${key}=${params[key]}`)
  .join('&');

export const mergeParams = (params = {}, extend = {}) => {
  const result = { ...params };

  for (const key in extend) {
    if (extend.hasOwnProperty(key)) {
      if (!result[key] && extend[key]) {
        result[key] = extend[key];
      }
    }
  }

  return result;
};

export const onReady = (callback) => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

export const renderHTML = (element) => {
  const tmp = document.implementation.createHTMLDocument('element');

  tmp.body.innerHTML = element;

  return document.importNode(tmp.body.children[0], true);
};

export const toPascalCase = (str) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, l => l.toUpperCase()).replace(/(-|\s)+/g, '');

export const getDependentValue = (key, values) => (values[key] ? values[key] : values[Object.keys(values)[0]]);

export const validate = {
  inArray: (option, array, defaultValue) => {
    if (!option) {
      return defaultValue;
    }

    return array.includes(option) ? option : defaultValue;
  },
  arrayLength: (array, length, defaultValue) => {
    const valid = Array.isArray(array) && array.length === length;

    return valid ? array : defaultValue;
  }
};

export const checkRequiredParams = (params) => {
  for (const key in params) {
    if (params.hasOwnProperty(key) && !params[key]) {
      throw new Error(`Parameter ${key} is required`);
    }
  }
};
