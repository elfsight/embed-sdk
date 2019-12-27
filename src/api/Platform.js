import { onReady } from '../helpers';

const PLATFORM_URL = 'https://apps.elfsight.com/p/platform.js';

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

  static callWidgetReset(widgetId) {
    if (!window.eapps) {
      return false;
    }

    window.eapps.platform.resetWidget(widgetId);
  }
}
