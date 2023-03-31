import { useCallback, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

import useHttp from '../../hooks/useHttp';

const url = 'https://react-hooks-ingredients-bddee-default-rtdb.europe-west1.firebasedatabase.app';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const { isLoading, error, sendRequest: fetchIngredients, clearError } = useHttp();

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    const { title, amount } = ingredient;
    const headers = { 'Content-Type': 'application/json' };
    fetchIngredients(
      { url: `${url}/ingredients.json`, method: 'POST', headers, body: ingredient },
      data => {
        console.log(data);
        const fetchedIngredient = { id: data.name, title, amount };
        setIngredients(prevIngredients => [...prevIngredients, fetchedIngredient]);
      },
    );
  };

  const removeIngredientHandler = id => {
    fetchIngredients({ url: `${url}/ingredients/${id}.json`, method: 'DELETE' }, () => {
      setIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id));
    });
  };

  return (
    <div className="App">
      {!!error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search fetchIngredients={fetchIngredients} onLoadIngredients={filterIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
