import { memo, useEffect, useRef, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const url = 'https://react-hooks-ingredients-bddee-default-rtdb.europe-west1.firebasedatabase.app';

const Search = ({ fetchIngredients, onLoadIngredients }) => {
  const [filter, setFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const query = filter.length ? `?orderBy="title"&equalTo="${filter}"` : '';

        fetchIngredients({ url: `${url}/ingredients.json${query}` }, data => {
          const loadedIngredients = [];

          for (const key in data) {
            loadedIngredients.push({
              id: key,
              title: data[key].title,
              amount: data[key].amount,
            });
          }

          onLoadIngredients(loadedIngredients);
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, onLoadIngredients, inputRef]);

  const filterChangeHandler = event => {
    setFilter(event.target.value);
  };

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={filter} onChange={filterChangeHandler} />
        </div>
      </Card>
    </section>
  );
};

export default memo(Search);
