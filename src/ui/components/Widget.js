import { h } from 'preact';
import styled from 'styled-components';

const WidgetComponent = styled.div`
  width: 100%;
`;

export function Widget({
  className
}) {
  return (
    <div
      className={className}
    ></div>
  );
}
