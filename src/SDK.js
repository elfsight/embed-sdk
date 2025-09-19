import { UI } from './ui';
import { API, Embed, Platform } from './api';

import {
  mergeParams,
  cleanReferralId,
  renderHTML,
  getPromoMode,
  makeQuery,
  checkIsPromoMode,
  checkIsAppCallback,
  getWindow,
  transformToModernAlias,
  addQueryParams
} from './helpers';

const BASE_URL = 'https://apps.elfsight.com';

const DEFAULT_QUERY_PARAMS = {
  utm_source: 'portals',
  utm_medium: 'sdk',
  utm_term: document ? document.location.host : null
};

const CONFIRM_REMOVE = 'Your widget will be removed from website. Are you sure?';

const ERROR_WIDGET_ID_REQUIRED = 'widgetId option required';
const ERROR_APP_ALIAS_REQUIRED = 'appAlias option required';
const ERROR_TYPE_REQUIRED = 'type option required';
const ERROR_APP_NOT_FOUND = 'application not found, check passed alias';
const ERROR_CALLBACK_INCORRECT = 'callback must be a function';

const TYPE_CREATE = 'create';
const TYPE_EDIT = 'edit';
const TYPE_REMOVE = 'remove';
const TYPE_CUSTOM = 'custom';

const MESSAGE_CREATE = 'addWidget';
const MESSAGE_EDIT = 'editWidget';

export class SDK {
  constructor() {
    this.api = new API();
    this.embed = new Embed();

    this.referralId = undefined;
    this.affiseParams = undefined;
    this.queryParams = {};

    Platform.init();
  }

  setReferral(ref) {
    if (!ref) {
      return;
    }

    this.referralId = cleanReferralId(ref);
  }

  setAffiseParams(pid, offerId = 3) {
    if (!pid) {
      return;
    }

    this.affiseParams = {
      pid,
      offer_id: offerId
    };
  }

  setQueryParams(params = {}) {
    this.queryParams = {
      ...this.queryParams,
      ...params
    };
  }

  getQueryParams(params = {}) {
    return {
      ...DEFAULT_QUERY_PARAMS,
      ...params,
      ref: this.referralId,
      ...(this.affiseParams || {}),
      ...this.queryParams
    };
  }

  static widgetResponse(widgetId) {
    return {
      id: widgetId,
      url: `${BASE_URL}/widget/${widgetId}`,
      code: `<div class="elfsight-app-${widgetId}"></div>`,
      element: renderHTML(`<div class="elfsight-app-${widgetId}"></div>`)
    };
  }

  async createWidget(appAlias, callback) {
    let application = await this.api.getApplication(appAlias);

    if (!application) {
      const applications = await this.api.getApplications();
      const categories = await this.api.getCategories();

      application = await UI.selectApplication({ applications, categories });
    }

    return this.embed
      .open('application', {
        appAlias: transformToModernAlias(application.alias),
        withTracking: !!this.affiseParams?.pid,
        queryParams: this.getQueryParams({
          utm_campaign: transformToModernAlias(application.alias),
          utm_content: 'embed'
        })
      })
      .observe(MESSAGE_CREATE, (response) => callback({
        ...SDK.widgetResponse(response.widgetId),
        app: application.alias
      }));
  }

  async removeWidget(widgetId, callback) {
    if (confirm(CONFIRM_REMOVE)) {
      callback();
    }
  }

  async editWidget(widgetId, callback) {
    return this.embed
      .open('widget.edit', {
        widgetId,
        withTracking: !!this.affiseParams?.pid,
        queryParams: this.getQueryParams({
          utm_campaign: 'widget_edit',
          utm_content: 'embed',
          edit_mode: true
        })
      })
      .observe(MESSAGE_EDIT, () => {
        Platform.callWidgetReset(widgetId);
        callback(widgetId);
      });
  }

  displayButton(container, callback, options = {}) {
    const { type, appAlias = null, widgetId = null } = options;

    if ([TYPE_EDIT, TYPE_REMOVE].includes(type) && !widgetId) {
      throw new Error(ERROR_WIDGET_ID_REQUIRED);
    }

    return UI.displayButton(
      container,
      this.handleCallback(type, callback, { appAlias, widgetId }),
      options
    );
  }

  displayPanel(container, callbacks = {}, options = {}) {
    const { widgetId, appAlias } = options;
    const { onEdit, onRemove } = callbacks;

    if (!widgetId) {
      throw new Error(ERROR_WIDGET_ID_REQUIRED);
    }

    return UI.displayPanel(
      container,
      {
        onEdit: this.handleCallback(TYPE_EDIT, onEdit, { widgetId, appAlias }),
        onRemove: this.handleCallback(TYPE_REMOVE, onRemove, { widgetId })
      },
      options
    );
  }

  async displayCatalog(container, callback, options = {}) {
    const applications = await this.api.getApplications();
    const categories = await this.api.getCategories();

    const promoMode = getPromoMode(options);

    const filteredApplications = promoMode === 'link'
      ? applications.filter((app) => !!app.promo_url)
      : applications;

    this.setReferral(options.promoReferral);

    return UI.displayCatalog(
      container,
      (app) => this.handleAppCallback(app, callback, promoMode),
      {
        applications: filteredApplications,
        categories
      },
      {
        ...options,
        buttonEnable: !promoMode
      }
    );
  }

  async displayCard(container, callback, options = {}) {
    const { appAlias } = options;

    if (!appAlias) {
      throw new Error(ERROR_APP_ALIAS_REQUIRED);
    }

    const application = await this.api.getApplication(appAlias);

    if (!application) {
      throw new Error(ERROR_APP_NOT_FOUND);
    }

    const promoMode = getPromoMode(options);

    this.setReferral(options.promoReferral);

    return UI.displayCard(
      container,
      (app) => this.handleAppCallback(app, callback, promoMode),
      application,
      {
        ...options,
        buttonEnable: !promoMode
      }
    );
  }

  async displayPreview(container, options) {
    const { appAlias } = options;

    if (!appAlias) {
      throw new Error(ERROR_APP_ALIAS_REQUIRED);
    }

    const application = await this.api.getApplication(appAlias);

    if (!application) {
      throw new Error(ERROR_APP_NOT_FOUND);
    }

    this.setReferral(options.ref);

    return UI.displayPreview(
      container,
      application,
      {
        ...options,
        withTracking: !!this.affiseParams?.pid,
        queryParams: this.getQueryParams({
          utm_campaign: application.alias,
          utm_content: 'demo'
        })
      }
    );
  }

  displayWidget(container, widgetId) {
    if (!widgetId) {
      throw new Error(ERROR_WIDGET_ID_REQUIRED);
    }

    return UI.displayWidget(
      container,
      widgetId
    );
  }

  displayPopup(content) {
    return UI.displayPopup(content);
  }

  callWidgetReset(widgetId, iframe = null) {
    return Platform.callWidgetReset(widgetId, getWindow(iframe));
  }

  handleAppCallback(application, callback, promoMode) {
    if (promoMode === 'demo') {
      return UI.openPreview(application, {
        queryParams: this.getQueryParams({
          utm_campaign: application.alias,
          utm_content: 'demo'
        })
      });
    }

    if (promoMode === 'link') {
      const { promo_url } = application;

      if (promo_url) {
        window.open(addQueryParams(promo_url, this.getQueryParams({
          utm_campaign: application.alias,
          utm_content: 'promo'
        })), '_blank');
      }

      return callback && callback(application);
    }

    return this.handleCallback(TYPE_CREATE, callback, {
      appAlias: application.alias
    })();
  }

  handleCallback(
    type,
    callback = () => {},
    {
      appAlias,
      widgetId
    } = {}
  ) {
    if (!type) {
      throw new Error(ERROR_TYPE_REQUIRED);
    }

    if (typeof callback !== 'function') {
      throw new Error(ERROR_CALLBACK_INCORRECT);
    }

    switch (type) {
      case TYPE_CREATE:
        return () => this.createWidget(appAlias, callback);
      case TYPE_EDIT:
        return () => this.editWidget(widgetId, callback);
      case TYPE_REMOVE:
        return () => this.removeWidget(widgetId, callback);
      case TYPE_CUSTOM:
      default:
        return callback;
    }
  }
}
