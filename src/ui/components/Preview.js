import { h } from 'preact';
import styled from 'styled-components';

import { parametrize } from '../../helpers';

const PreviewComponent = styled.div`
  width: 100%;
  height: ${props => props.previewHeight};
  border-radius: 10px;
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
  publicId,
  options = {}
}) {
  const {
    ref = '',
    height = '800px',
    templateId = null,
    hideTemplates = false
  } = options;

  const query = parametrize({
    ref,
    template_id: templateId,
    templates_hide: hideTemplates
  });

  const src = (() => `${BASE_URL}${publicId}${query ? `?${query}` : ''}`)();

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
