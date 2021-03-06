import { h } from 'preact';
import styled from 'styled-components';

import { makeQuery } from '../../helpers';

const PreviewComponent = styled.div`
  width: 100%;
  height: ${props => props.previewHeight};
  border-radius: 5px;
  overflow: hidden;
`;

const PreviewIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

const BASE_URL = 'https://apps.elfsight.com/preview/';

export function Preview({
  className,
  application,
  options = {}
}) {
  const { public_id } = application;
  const {
    height = '800px',
    templateId = null,
    hideTemplates = false,
    hideInstall = false,
    queryParams = {}
  } = options;

  const query = makeQuery(queryParams, {
    template_id: templateId,
    templates_hide: hideTemplates,
    install_hide: hideInstall
  });

  const src = (() => `${BASE_URL}${public_id}${query}`)();

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
