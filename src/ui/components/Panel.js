import {h} from 'preact';
import styled from 'styled-components';

import {Button, Icon} from './index';

const LINK_BASE = 'https://apps.elfsight.com/embed';
const PANEL_URL = 'https://apps.elfsight.com/panel/applications/';

const PanelComponent = styled.div`
  border-radius: 4px;
  margin-bottom: 4px;
  padding: 8px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: ${props => props.panelColor};
  width: ${props => props.panelSize === 'big' ? '100%' : 'fit-content'};
`;

const Link = styled.a`
  display: block;
  outline: none;
  box-shadow: none;
  margin-right: 40px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: ${props => props.panelSize === 'big' ? '100%' : 'fit-content'};
`;

const ButtonEdit = styled(Button)`
  font-weight: normal;
  font-size: 15px;
  margin-right: 12px;
`;

const ButtonRemove = styled(Button)`
  font-weight: normal;
  font-size: 15px;
  margin-left: auto;
`;

export function Panel({
  className,
  options: {
    size = 'big',
    icon = true,
    color = '#fafafa',
    appAlias = false
  },
  callbacks: {
    onEdit = () => {},
    onRemove = () => {},
  }
} = {}) {

  const iconLink = (() => appAlias ? `${LINK_BASE}/${appAlias}/` : PANEL_URL)();

  return (
    <PanelComponent
      panelSize={size}
      panelColor={color}
      className={className}
    >
      {icon && (
        <Link
          href={iconLink}
          target="_blank"
          rel="nofollow"
        >
          <Icon
            type='glyph'
            size='24px'
            offset='0'
            color='#f93262'
          />
        </Link>
      )}

      <ButtonsContainer
        panelSize={size}
      >
        <ButtonEdit
          callback={onEdit}
          options={{
            size: 'small',
            icon: 'edit',
            text: size === 'small' ? '' : 'Edit'
          }}
        />

        <ButtonRemove
          callback={onRemove}
          options={{
            size: 'small',
            icon: 'trash',
            colors: [false, '#111111', '#b8b8b8'],
            text: size === 'small' ? '' : 'Remove',
          }}
        />
      </ButtonsContainer>
    </PanelComponent>
  );
}
