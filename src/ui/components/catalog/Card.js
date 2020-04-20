import { h } from 'preact';
import styled from 'styled-components';

import { Button } from '../Button';

const BASE_URL = 'https://apps.elfsight.com';

const CardIcon = styled.img`
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  margin-right: 16px;
  font-size: 10px;
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: currentColor;
`;

const CardCaption = styled.div`
  margin: 4px 0;
  font-size: 14px;
  color: currentColor;
`;

const CardButtonContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
`;

const CardButton = styled(Button)`
  opacity: 0;
  transform: scale(0.8);
  transition: all .3s ease-in-out;
`;

const CardContent = styled.div`
  display: flex;
  align-items: start;
`;

const CardComponent = styled.a`
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  line-height: 1.4;
  display: inline-flex;
  padding: 12px 12px;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: none;
  outline: none;
  text-decoration: none;
  border-radius: 4px;
  border-bottom: 0;
  overflow: hidden;
  transition: all .3s;
  position: relative;
  color: rgba(17, 17, 17, 0.7);

  &:hover ${CardContent} {
    opacity: .7;
    color: rgba(17, 17, 17, 0.7);
  }

  &:hover ${CardButtonContainer} {
    backdrop-filter: blur(.5px);
    background: rgba(255, 255, 255, .6);
  }

  &:hover ${CardButton} {
    opacity: 1;
    transform: scale(1);
  }
`;

export function Card({
  className,
  application,
  callback = () => {},
  options = {}
}) {
  const {
    name,
    caption,
    icon,
    promo_url
  } = application;

  const {
    buttonEnable = true,
    buttonIcon = 'plus',
    buttonText = 'ADD',
  } = options;

  const iconUrl = (() => (icon.includes('https://') ? icon : `${BASE_URL}${icon}`))();

  return (
    <CardComponent
      className={className}
      onClick={(e) => {
        e.preventDefault();
        return callback(application);
      }}
      hasButton={buttonEnable && !!buttonText}
      rel="follow"
      target="_blank"
      href={promo_url}
    >
      <CardContent>
        <CardIcon
          alt={name}
          src={iconUrl}
        />

        <div>
          <CardTitle>{name}</CardTitle>
          <CardCaption>{caption}</CardCaption>
        </div>
      </CardContent>

      {buttonEnable && (
        <CardButtonContainer>
          <CardButton
            options={{
              size: 'small',
              icon: buttonIcon,
              text: buttonText
            }}
          />
        </CardButtonContainer>
      )}
    </CardComponent>
  );
}
