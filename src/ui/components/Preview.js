import styled from 'styled-components';
import { addQueryParams, transformToModernAlias } from '../../helpers';

const BASE_URL = 'https://dash.elfsight.com/demo/';
const GO_URL = 'https://go.elfsight.io/click?path=/d/';

export function Preview({
  className,
  application,
  options = {}
}) {
  const { alias } = application;
  const {
    height = '800px',
    templateId = null,
    hideTemplates = false,
    hideInstall = false,
    queryParams = {},
    withTracking = false
  } = options;

  const baseURL = withTracking ? GO_URL : BASE_URL;
  const src = addQueryParams(
    `${baseURL}${transformToModernAlias(alias)}`,
    {
      ...queryParams,
      template_id: templateId,
      templates_hide: hideTemplates,
      install_hide: hideInstall
    }
  );

  const previewHeight = (() => `${parseInt(height)}px`)();

  return (
    <PreviewComponent
      className={className}
      previewHeight={previewHeight}
    >
      <PreviewIframe
        src={src}
      />
    </PreviewComponent>
  );
}

const PreviewComponent = styled.div`
  width: 100%;
  height: ${(props) => props.previewHeight};
  border-radius: 5px;
  overflow: hidden;
`;

const PreviewIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;
