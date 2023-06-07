import { onReady } from '../helpers';

const PLATFORM_URL = 'https://static.elfsight.com/platform/platform.js';
const PM_PREFIX = 'EappsPlatform';

export class Platform {
  static init() {
    const platform = document.createElement('script');
    const platformStyle = document.createElement('style');

    platform.src = PLATFORM_URL;
    platformStyle.innerHTML = `
      .eapps-widget-toolbar{ display: none !important; }
    `;

    onReady(() => {
      document.head.appendChild(platform);
      document.head.appendChild(platformStyle);
    });
  }

  static callWidgetReset(widgetId, target = null) {
    Platform.sendPostMessage('widgetReset', { widgetId }, target);
  }

  static sendPostMessage(action, data, target = null) {
    (target || window).postMessage({
      action: `${PM_PREFIX}.${action}`,
      ...data
    }, '*');
  }
}
