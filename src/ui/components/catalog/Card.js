import { h, Fragment } from 'preact';
import styled from 'styled-components';

import { Button } from '../Button';
import { makeQuery } from '../../../helpers';

const BASE_URL = 'https://apps.elfsight.com';

const CardIcon = styled.img`
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  margin-right: 16px;
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #2d2d2d;
`;

const CardCaption = styled.div`
  margin: 4px 0;
  font-size: 14px;
  color: rgba(17, 17, 17, 0.7);
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
  overflow: hidden;
  transition: all .3s;
  position: relative;
  
  &:hover ${CardContent} {
    opacity: .7;
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
    icon
  } = application;

  const {
    buttonEnable = true,
    buttonIcon = 'plus',
    buttonText = 'ADD',
    promoMode = false,
    queryParams = {}
  } = options;

  const query = makeQuery(queryParams, {
    utm_campaign: application.alias
  });

  const url = (() => {
    if (!application.promo_url) {
      return '';
    }

    return application.promo_url + query;
  })();

  const onClick = (e) => {
    e.preventDefault();

    if (promoMode && url) {
      window.open(url, '_blank');
    }

    return callback(application);
  };

  return (
    <CardComponent
      className={className}
      onClick={onClick}
      rel="follow"
      target="_blank"
      hasButton={(() => !!buttonText)()}
      href={url}
    >
      <CardContent>
        <CardIcon
          src={(() => (icon.includes('https://') ? icon : `${BASE_URL}${icon}`))()}
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
