import {SDK} from './SDK';

const sdk = new SDK();

export const facade = {

  /*
      API Methods
   */

  getApplications: () => sdk.api.getApplications(),
  getApplication: (appAlias) => sdk.api.getApplication(appAlias),

  createWidget: (appAlias) => new Promise(resolve => sdk.createWidget(appAlias, resolve)),
  editWidget: (widgetId) => new Promise(resolve => sdk.editWidget(widgetId, resolve)),
  removeWidget: (widgetId) => new Promise(resolve => sdk.removeWidget(widgetId, resolve)),

  resetWidget: (widgetId) => sdk.callWidgetReset(widgetId),

  /*
      UI Methods
   */

  displayButton: (container, callback, options) => sdk.displayButton(container, callback, options),
  displayCreateButton: (container, callback, options) => sdk.displayCreateButton(container, callback, options),
  displayEditButton: (container, callback, options) => sdk.displayEditButton(container, callback, options),
  displayRemoveButton: (container, callback, options) => sdk.displayRemoveButton(container, callback, options),

  displayPreview: (container, options) => sdk.displayPreview(container, options),

  displayPanel: (container, callbacks, options) => sdk.displayPanel(container, callbacks, options),
  displayCatalog: (container, callback, options) => sdk.displayCatalog(container, callback, options),
  displayCard: (container, callback, options) => sdk.displayCard(container, callback, options),

  displayPopup: (content) => sdk.displayPopup(content),

  /*
      OTHER Methods
   */

  setReferral: (ref) => sdk.setReferral(ref),
  setUtmParams: (utmObject) => sdk.setUtmParams(utmObject),
  setUtmString: (utmString) => sdk.setUtmString(utmString)

};
