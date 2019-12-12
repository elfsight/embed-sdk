import {h, isValidElement} from 'preact';
import {useState} from 'preact/hooks';
import {createPortal} from 'preact/compat';
import {Parser} from 'html-to-react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2147483647;
  display: ${props => props.active ? 'block' : 'none'};
  opacity: ${props => props.active ? 1 : 0};
  visibility: ${props => props.active ? 'visible' : 'hidden'};
`;

const Wrapper = styled.div`
  display: flex;
  padding: 72px 0;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow-x: auto;
  transition: top .3s .3s;
  background: rgba(0,0,0,.4);
  backdrop-filter: blur(1px);
`;

const Inner = styled.div`
  overflow: hidden;
  flex-basis: auto;
  margin: auto;
  border-radius: 5px;
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  padding: 40px 40px;
  box-shadow: 0 22px 44px 0 rgba(0, 0, 0, 0.2);
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  color: #fff;
  opacity: .8;
  cursor: pointer;
  transform: rotate(45deg);
  transition: opacity .3s;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    background: currentColor;
    transition: all 0.25s ease;
  }
  
  &::before {
    width: 24px;
    height: 2px;
    margin: -1px 0 0 -12px;
  }
  
  &::after {
    width: 2px;
    height: 24px;
    margin: -12px 0 0 -1px;
  }
  
  &:hover {
    opacity: 1;
  }
`;

export function Popup({className, content}) {
  const [active, setActive] = useState(true);

  if (!content) {
    return setActive(false);
  }

  const popupContent = (() => {
    if (!isValidElement(content)) {
      content = (new Parser()).parse(content);
    }

    return content;
  })();

  const toggleActive = (state) => {
    setActive(state)
  };

  return createPortal(
    <Container
      className={className}
      onClick={() => toggleActive(false)}
      active={active}
    >
      <Wrapper>
        <Inner onClick={(e) => e.stopPropagation()}>
          {popupContent}
        </Inner>
      </Wrapper>

      <Close/>
    </Container>,
    document.body
  );
}
