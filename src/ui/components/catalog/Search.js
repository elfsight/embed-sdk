import {h} from 'preact';
import {useRef} from 'preact/hooks';
import styled from 'styled-components';

import {Icon} from './../Icon';

const SearchComponent = styled.div`
  position: relative;
  width: 100%;
  max-width: 230px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 4px 24px 4px 0;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  box-shadow: none;
  
  &::placeholder {
    color: #b8b8b8;
  }
`;

const SearchTrigger = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export function Search({searchPlaceholder, onSearch}) {
  const inputRef = useRef(null);

  const onChange = (e) => {
    e.preventDefault();

    setValue(e.target.value);
  };

  const searchTrigger = () => {
    return inputHasValue ? setValue('') : null;
  };

  const setValue = (value) => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }

    onSearch(value);
  };

  const inputHasValue = (() => {
    return inputRef.current && !!inputRef.current.value;
  })();

  return (
    <SearchComponent>
      <SearchInput
        ref={inputRef}
        placeholder={searchPlaceholder}
        onChange={onChange}
      />
      <SearchTrigger onClick={searchTrigger}>
        {inputHasValue ? (
          <Icon
            size='16px'
            type='close'
            color='#b8b8b8'
          />
        ) : (
          <Icon
            size='16px'
            type='search'
            color='#b8b8b8'
          />
        )}
      </SearchTrigger>
    </SearchComponent>
  );
}
