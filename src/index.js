import { SDK } from './SDK';

const sdk = new SDK();

export const getApplications = () => sdk.api.getApplications();
export const getApplication = (appAlias) => sdk.api.getApplication(appAlias);

export const createWidget = (appAlias) => new Promise(resolve => sdk.createWidget(appAlias, resolve));
export const editWidget = (widgetId) => new Promise(resolve => sdk.editWidget(widgetId, resolve));
export const removeWidget = (widgetId) => new Promise(resolve => sdk.removeWidget(widgetId, resolve));

export const resetWidget = (widgetId, iframe) => sdk.callWidgetReset(widgetId, iframe);

/*
 UI Methods
*/

export const displayButton = (container, callback, options) => sdk.displayButton(container, callback, options);
export const displayCreateButton = (container, callback, options) => sdk.displayButton(container, callback, Object.assign(options, { type: 'create' }));
export const displayEditButton = (container, callback, options) => sdk.displayButton(container, callback, Object.assign(options, { type: 'edit' }));
export const displayRemoveButton = (container, callback, options) => sdk.displayButton(container, callback, Object.assign(options, { type: 'remove' }));

export const displayPreview = (container, options) => sdk.displayPreview(container, options);

export const displayPanel = (container, callbacks, options) => sdk.displayPanel(container, callbacks, options);
export const displayCatalog = (container, callback, options) => sdk.displayCatalog(container, callback, options);
export const displayCard = (container, callback, options) => sdk.displayCard(container, callback, options);

export const displayWidget = (container, widgetId) => sdk.displayWidget(container, widgetId);

export const displayPopup = (content) => sdk.displayPopup(content);

/*
 OTHER Methods
*/

export const setReferral = (ref) => sdk.setReferral(ref);
export const setQueryParams = (params) => sdk.setQueryParams(params);
