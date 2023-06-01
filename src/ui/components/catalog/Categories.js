import styled from 'styled-components';

export function Categories({ categories, selected, onSelect }) {
  return (
    <CategoriesComponent>
      {categories.map((category) => (
        <Category
          key={category.id}
          active={category.id === selected}
          onClick={() => onSelect(category.id)}
        >
          {category.name}
        </Category>
      ))}
    </CategoriesComponent>
  );
}

const CategoriesComponent = styled.div`
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  display: flex;
  flex-flow: row wrap;
  margin: 24px 0 16px;
`;

const Category = styled.div`
  font-size: 16px;
  line-height: 1.4;
  padding: 4px 8px;
  margin-right: 12px;
  margin-bottom: 8px;
  border-radius: 2px;
  cursor: pointer;
  transition: background .3s;
  white-space: nowrap;
  background: rgba(17, 17, 17, ${props => (props.active ? '0.08' : '0')});
  color: rgba(17, 17, 17, ${props => (props.active ? '1' : '0.7')});

  &:hover {
    background: rgba(17, 17, 17, .04);
  }
`;
