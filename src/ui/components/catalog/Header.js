import styled from 'styled-components';
import { Search } from './Search';

export function Header({
  title, searchPlaceholder, searchEnabled, onSearch
}) {
  return (
    <HeaderComponent>
      <HeaderTitle>{title}</HeaderTitle>

      {searchEnabled && (
        <Search
          searchPlaceholder={searchPlaceholder}
          onSearch={onSearch}
        />
      )}
    </HeaderComponent>
  );
}

const HeaderComponent = styled.div`
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  color: currentColor;
  line-height: 1;
`;

const HeaderTitle = styled.div`
  font-size: 20px;
  margin-right: 24px;
  flex-shrink: 0;
`;
