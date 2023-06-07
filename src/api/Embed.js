import { addQueryParams } from '../helpers';

const DASH_PAGES = {
  'application': 'https://dash.elfsight.com/apps/<appAlias>',
  'widget.edit': 'https://dash.elfsight.com/widget/<widgetId>'
};

const GO_PAGES = {
  'application': 'https://go.elfsight.io/click?path=/dash/apps/<appAlias>',
  'widget.edit': 'https://go.elfsight.io/click?path=/dash/widget/<widgetId>'
};

const WINDOW_TARGET = 'elfsight-embed-sdk';
const WINDOW_SIZES = [1200, 800];

const REJECT_CLOSED = 'SDK Embed window is closed';
const REJECT_NEW_INSTANCE = 'SDK Embed window new instance';

export class Embed {
  constructor() {
    this.instance = {
      window: null,
      url: null
    };
    this.observeCallback = null;
  }

  open(page, params = {}) {
    const {
      window: instanceWindow
    } = this.instance;

    const url = Embed.getFullUrl(page, params);

    if (window.focus && this.sameInstance(url)) {
      instanceWindow.focus();
    } else {
      this.instance = Embed.openWindow(url);
    }

    return this; // chainable
  }

  watchClose(callback = () => {}) {
    const popupTick = setInterval(() => {
      if (!this.instance) {
        clearInterval(popupTick);
      } else if (this.instance.closed) {
        callback();
        this.instance = {};
      }
    }, 1000);
  }

  observe(message, callback) {
    if (this.observeCallback) {
      window.removeEventListener('message', this.observeCallback, true);
    }

    this.observeCallback = (response) => {
      const {
        data: { event, data }
      } = response;

      if (event === message) {
        callback(data);
        this.instance.window.close();
      }
    };

    window.addEventListener('message', this.observeCallback, true);
  }

  sameInstance(url) {
    const {
      window: instanceWindow,
      url: instanceUrl
    } = this.instance;

    const hasInstance = !!instanceWindow && !instanceWindow.closed;
    const sameUrl = !!instanceUrl && instanceUrl === url;

    return hasInstance && sameUrl;
  }

  static openWindow(url) {
    const {
      availLeft,
      availTop,
      availWidth,
      availHeight
    } = window.screen;

    const
      size = {
        width: WINDOW_SIZES[0],
        height: WINDOW_SIZES[1]
      };
    const location = {
      left: (availLeft + (availWidth / 2)) - (size.width / 2),
      top: (availTop + (availHeight / 2)) - (size.height / 2)
    };
    const options = [
      `width=${size.width}`,
      `height=${size.height}`,
      'menubar=no',
      'toolbar=no',
      'resizable=no',
      'scrollbars=yes',
      `left=${location.left}`,
      `top=${location.top}`
    ];

    return {
      url,
      window: window.open(url, WINDOW_TARGET, options.join(','))
    };
  }

  static getFullUrl(page, params = {}) {
    const { queryParams } = params;

    return addQueryParams(Embed.getPage(page, params), queryParams);
  }

  static getPage(entity, params = {}) {
    if (!DASH_PAGES[entity]) {
      throw new Error('Page not exist');
    }

    let page = DASH_PAGES[entity];
    if (params.withTracking) {
      page = GO_PAGES[entity];
    }

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        page = page.replace(`<${key}>`, params[key]);
      }
    }

    return page;
  }
}
