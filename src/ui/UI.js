import { render, h } from 'preact';
import { useRef } from 'preact/hooks';
import { onReady } from '../helpers';
import {
  Button,
  Popup,
  Catalog,
  Card,
  Panel,
  Preview,
  Widget
} from './components';

const PREDEFINED_BUTTONS = {
  'create': {
    text: 'Add Widget',
    icon: 'glyph',
    backgroundColor: '#f93262',
    textColor: '#fff',
    copyright: true
  },
  'edit': {
    text: 'Edit Widget',
    icon: 'edit',
    style: 'secondary',
    backgroundColor: '#fafafa',
    textColor: '#333',
    copyright: false
  },
  'remove': {
    text: 'Remove Widget',
    icon: 'trash',
    style: 'secondary',
    backgroundColor: false,
    textColor: '#333',
    borderColor: '#fafafa',
    copyright: false
  },
};

const CLASS_PREFIX = 'elfsight-embed-sdk';

const ERROR_CONTAINER_EMPTY = 'Container to render UI is required';
const ERROR_CONTAINER_TYPE = 'Container must be a HTMLElement';

export class UI {
  static checkContainer(container) {
    if (!container) {
      throw new Error(ERROR_CONTAINER_EMPTY);
    }

    if (!container.nodeType) {
      throw new Error(ERROR_CONTAINER_TYPE);
    }

    return true;
  }

  static displayButton(container, callback, options = {}) {
    const { type } = options;
    const predefinedOptions = type && PREDEFINED_BUTTONS[type] ? PREDEFINED_BUTTONS[type] : {};

    return UI.checkContainer(container) && render(
      <Button
        className={`${CLASS_PREFIX}-button`}
        options={{
          ...predefinedOptions,
          ...options
        }}
        callback={callback}
      />,
      container
    );
  }

  static displayCatalog(container, callback, data, options = {}) {
    return UI.checkContainer(container) && render(
      <Catalog
        className={`${CLASS_PREFIX}-catalog`}
        data={data}
        callback={callback}
        options={options}
      />,
      container
    );
  }

  static displayCard(container, callback, application, options = {}) {
    return UI.checkContainer(container) && render(
      <Card
        className={`${CLASS_PREFIX}-card`}
        application={application}
        callback={callback}
        options={options}
      />,
      container
    );
  }

  static displayPanel(container, callbacks, options = {}) {
    return UI.checkContainer(container) && render(
      <Panel
        className={`${CLASS_PREFIX}-panel`}
        options={options}
        callbacks={callbacks}
      />,
      container
    );
  }

  static displayPreview(container, application, options = {}) {
    return UI.checkContainer(container) && render(
      <Preview
        className={`${CLASS_PREFIX}-preview`}
        application={application}
        options={options}
      />,
      container
    );
  }

  static displayWidget(container, widgetId) {
    return UI.checkContainer(container) && render(
      <Widget
        className={`elfsight-app-${widgetId}`}
        widgetId={widgetId}
      />,
      container
    );
  }

  static displayPopup(content = null, ref = null, props) {
    onReady(() => render(
      <Popup
        ref={ref}
        className={`${CLASS_PREFIX}-popup`}
        content={content}
        {...props}
      />,
      window.document.body
    ))
  }

  static async openPreview(application, options) {
    return new Promise(() => {
      const popupRef = useRef();

      UI.displayPopup(
        <Preview
          className={`${CLASS_PREFIX}-preview`}
          application={application}
          options={options}
        />,
        popupRef,
        {
          style: {
            padding: 0,
            maxWidth: 'calc(100% - 80px)'
          }
        }
      );
    });
  }

  static async selectApplication(data) {
    return new Promise(resolve => {
      const popupRef = useRef();

      const callback = (application) => {
        if (popupRef && popupRef.current) {
          popupRef.current.setState({ active: false });
          popupRef.current.props.content = null;
        }

        return resolve(application);
      };

      UI.displayPopup(
        <Catalog
          data={data}
          callback={callback}
        />,
        popupRef
      );
    });
  }
}
