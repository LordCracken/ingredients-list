import { useCallback, useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

import useSendIngredient from '../../hooks/useSendIngredient';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const { fetchedIngredient, sendIngredient } = useSendIngredient();

  useEffect(() => {
    if (fetchedIngredient) {
      setIngredients(prevIngredients => [...prevIngredients, fetchedIngredient]);
    }
  }, [fetchedIngredient]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    sendIngredient(ingredient);
  };

  const removeIngredientHandler = id => {
    setIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id));
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
