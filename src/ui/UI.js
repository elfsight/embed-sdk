
import { render, h } from 'preact';
import { useRef } from 'preact/hooks';
import {
  Button,
  Popup,
  Catalog,
  Card,
  Panel,
  Preview
} from './components';

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
    return UI.checkContainer(container) && render(
      <Button
        className={`${CLASS_PREFIX}-button`}
        options={options}
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

  static displayPreview(container, appPublicId, options = {}) {
    return UI.checkContainer(container) && render(
      <Preview
        className={`${CLASS_PREFIX}-preview`}
        publicId={appPublicId}
        options={options}
      />,
      container
    );
  }

  static displayPopup(content = null) {
    const popup = useRef(null);

    render(
      <Popup
        ref={popup}
        className={`${CLASS_PREFIX}-popup`}
        content={content}
      />,
      document.body
    );

    return popup;
  }

  static async selectApplication(data) {
    return new Promise(resolve => {
      const callback = (application) => {
        if (popup && popup.current) {
          popup.current.setState({ active: false });
          popup.current.props.content = null;
        }

        return resolve(application);
      };

      const popup = UI.displayPopup(
        <Catalog
          data={data}
          callback={callback}
        />
      );
    });
  }
}
