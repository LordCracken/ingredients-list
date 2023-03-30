import { memo, useEffect, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const url =
  'https://react-hooks-ingredients-bddee-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

const Search = ({ onLoadIngredients }) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const query = filter.length ? `?orderBy="title"&equalTo="${filter}"` : '';

    const getIngredients = async () => {
      const response = await fetch(url + query);
      const resData = await response.json();
      const loadedIngredients = [];

      for (const key in resData) {
        loadedIngredients.push({ id: key, title: resData[key].title, amount: resData[key].amount });
      }

      onLoadIngredients(loadedIngredients);
    };

    getIngredients();
  }, [filter, onLoadIngredients]);

  const filterChangeHandler = event => {
    setFilter(event.target.value);
  };

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={filter} onChange={filterChangeHandler} />
        </div>
      </Card>
    </section>
  );
};

export default memo(Search);
