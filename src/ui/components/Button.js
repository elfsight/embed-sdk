import styled from 'styled-components';
import {
  getDependentValue,
  validate
} from '../../helpers';
import { Icon } from './index';

const SIZES = ['small', 'medium', 'big'];

export function Button({
  className, options = {}, callback = () => {}
}) {
  options.size = validate.inArray(options.size, SIZES, 'big');

  const {
    size,
    backgroundColor = '#f93262',
    textColor = '#fff',
    borderColor = false,
    text = 'Add Widget',
    icon = 'glyph',
    copyright
  } = options;

  const isBig = (() => size === 'big')();
  const hasText = (() => !!text)();
  const showCopyright = (() => isBig && text && copyright)();

  const iconOffset = (() => (!hasText ? '0'
    : getDependentValue(size, {
      big: '10px',
      medium: '8px',
      small: '6px'
    }))
  )();

  const iconSize = (() => getDependentValue(size, {
    big: '24px',
    medium: '20px',
    small: '16px'
  }))();

  const buttonSize = (() => (hasText ? size : 'icon'))();

  return (
    <ButtonComponent
      backgroundColor={backgroundColor}
      textColor={textColor}
      borderColor={borderColor}
      buttonSize={buttonSize}
      onClick={callback}
      className={className}
    >
      {icon && (
        <Icon
          type={icon}
          offset={iconOffset}
          size={iconSize}
          color={textColor}
        />
      )}

      <span>
        <ButtonLabel>{text}</ButtonLabel>
        {showCopyright && (
          <ButtonCopyright>by Elfsight</ButtonCopyright>
        )}
      </span>

      <ButtonOverlay />
    </ButtonComponent>
  );
}


const ButtonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,.2);
  transition: all .3s;
  opacity: 0;
  visibility: hidden;
`;

const ButtonLabel = styled.div``;

const ButtonCopyright = styled.div`
  line-height: 0.8em;
  font-size: 11px;
  font-weight: normal;
`;

const ButtonComponent = styled.button`
  position: relative;
  overflow: hidden;
  align-items: center;
  outline: none;
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  color: ${props => props.textColor};
  border-radius: 6px;
  box-sizing: border-box;
  border: ${props => (props.borderColor ? `1px solid ${props.borderColor}` : 'none')};
  background: ${props => (props.backgroundColor ? props.backgroundColor : 'none')};
  text-align: left;
  padding: ${props => getDependentValue(props.buttonSize, {
    big: '8px 16px',
    medium: '8px 12px',
    small: '4px 8px',
    icon: '4px 4px'
  })};
  line-height: 16px;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  font-weight: bold;
  font-size: ${props => getDependentValue(props.buttonSize, {
    default: '14px',
    small: '12px'
  })};

  &:hover ${ButtonOverlay} {
    opacity: 1;
    visibility: visible;
  }

  & span {
    flex-grow: 1;
  }
`;
