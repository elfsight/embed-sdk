import { UI } from './ui';
import { API, Embed, Platform } from './api';

import {
  mergeParams, cleanReferralId, renderHTML, parametrize
} from './helpers';

const BASE_URL = 'https://apps.elfsight.com';

const BUTTON_CREATE_OPTIONS = {
  type: 'add',
  text: 'Add Widget',
  icon: 'glyph',
  colors: ['#f93262', '#fff'],
  copyright: true
};
const BUTTON_EDIT_OPTIONS = {
  text: 'Edit Widget',
  icon: 'edit',
  style: 'secondary',
  colors: ['#fafafa', '#333'],
  copyright: false
};
const BUTTON_REMOVE_OPTIONS = {
  text: 'Remove Widget',
  icon: 'trash',
  style: 'secondary',
  colors: [false, '#333', '#fafafa'],
  copyright: false
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

    this.referral = '';
    this.utmString = '';

    Platform.init();
  }

  setReferral(ref) {
    this.referral = cleanReferralId(ref);
  }

  setUtmParams(utm = {}) {
    this.utmString = parametrize(utm);
  }

  setUtmString(utm) {
    this.utmString = utm;
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
        appAlias: application.alias,
        ref: this.referral,
        utmString: this.utmString
      })
      .observe(MESSAGE_CREATE, (response) => {
        callback(Object.assign(
          SDK.widgetResponse(response.widgetId),
          { app: application.alias }
        ));
      });
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
        editMode: true,
        utmString: this.utmString
      }).observe(MESSAGE_EDIT, () => {
        Platform.callWidgetReset(widgetId);
        callback();
      });
  }

  displayButton(container, callback, options = {}) {
    const { type, appAlias = null, widgetId = null } = options;

    return UI.displayButton(
      container,
      this.handleCallback(type, callback, { appAlias, widgetId }),
      options
    );
  }

  displayCreateButton(container, callback, options = {}) {
    const { appAlias = null } = options;

    return UI.displayButton(
      container,
      this.handleCallback(TYPE_CREATE, callback, { appAlias }),
      mergeParams(options, BUTTON_CREATE_OPTIONS)
    );
  }

  displayEditButton(container, callback, options = {}) {
    const { widgetId } = options;

    if (!widgetId) {
      throw new Error(ERROR_WIDGET_ID_REQUIRED);
    }

    return UI.displayButton(
      container,
      this.handleCallback(TYPE_EDIT, callback, { widgetId }),
      mergeParams(options, BUTTON_EDIT_OPTIONS)
    );
  }

  displayRemoveButton(container, callback, options = {}) {
    const { widgetId } = options;

    if (!widgetId) {
      throw new Error(ERROR_WIDGET_ID_REQUIRED);
    }

    return UI.displayButton(
      container,
      this.handleCallback(TYPE_REMOVE, callback, { widgetId }),
      mergeParams(options, BUTTON_REMOVE_OPTIONS)
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

    return UI.displayCatalog(
      container,
      application => this.handleCallback(TYPE_CREATE, callback, {
        appAlias: application.alias
      })(),
      { applications, categories },
      Object.assign(options, {
        promoReferral: options.promoReferral ? options.promoReferral : this.referral
      })
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

    return UI.displayCard(
      container,
      () => this.handleCallback(TYPE_CREATE, callback, { appAlias })(),
      application,
      Object.assign(options, {
        promoReferral: options.promoReferral ? options.promoReferral : this.referral
      })
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

    return UI.displayPreview(
      container,
      application.public_id,
      Object.assign(options, {
        ref: options.ref ? options.ref : this.referral
      })
    );
  }

  displayPopup(content) {
    return UI.displayPopup(content);
  }

  callWidgetReset(widgetId) {
    return Platform.callWidgetReset(widgetId);
  }

  handleCallback(
    type,
    callback = () => {
    },
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
