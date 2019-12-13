import { h } from 'preact';
import { useState } from 'preact/hooks';
import styled from 'styled-components';

import { Card } from './Card';
import { Categories } from './Categories';
import { Header } from './Header';
import { validate } from '../../../helpers';

const ListComponent = styled.div`
  min-width: 280px;
`;

const ListContainer = styled.div`
  max-height: ${props => props.listHeight};
  overflow: auto;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 12px;
  grid-row-gap: 12px;
  overflow: auto;
`;

const ListEmpty = styled.div`
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  font-size: 14px;
  text-align: center;
  padding: 80px;
`;

export function Catalog({
  className,
  data: { categories, applications },
  callback,
  options = {}
}) {
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState(0);

  const {
    title = 'Add Widget',
    searchPlaceholder = 'Search',
    searchEnable = true,
    height = 'auto',
    promoReferral = '',
    promo = false,
    category: selectedCategory = ''
  } = options;

  const selectedCategoryName = !selectedCategory ? null
    : validate.inArray(selectedCategory.toLowerCase(), categories.map((category => category.name.toLowerCase())), null);

  if (selectedCategoryName) {
    const selectedCategory = categories.find(category => category.name.toLowerCase() === selectedCategoryName);

    applications = applications.filter(application => application.category_id === selectedCategory.id);
  }

  if (promo) {
    applications = applications.filter(application => !!application.promo_url);
  }

  const filteredApplication = applications.filter(application => {
    if (category) {
      return application.category_id === category;
    }

    if (!filter) {
      return true;
    }

    const filterLower = filter.toLowerCase();
    const objString = Object.values(application).join(' ').toLowerCase();

    return objString.includes(filterLower);
  });

  const onSearch = (value) => {
    setFilter(value);
    setCategory(0);
  };

  const onCategorySelect = (id) => {
    setFilter('');
    setCategory(id);
  };

  const listHeight = (() => (height === parseInt(height) ? `${height}px` : height))();

  return (
    <ListComponent
      className={className}
    >
      <Header
        title={title}
        searchPlaceholder={searchPlaceholder}
        searchEnable={searchEnable}
        onSearch={onSearch}
      />

      {!selectedCategory && !!categories.length && (
        <Categories
          categories={categories}
          selected={category}
          onSelect={onCategorySelect}
        />
      )}

      <ListContainer
        listHeight={listHeight}
      >
        {!filteredApplication.length && (
          <ListEmpty>No results for <b>{filter}</b>.</ListEmpty>
        )}

        {!!filteredApplication.length && (
          <ListGrid>
            {filteredApplication.length && filteredApplication.map(application => (
              <Card
                key={application.id}
                callback={callback}
                application={application}
                options={{
                  promoReferral,
                  promo,
                  button: !promo
                }}
              />
            ))}
          </ListGrid>
        )}
      </ListContainer>
    </ListComponent>
  );
}
