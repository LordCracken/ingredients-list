import { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

import useSendIngredient from '../../hooks/useSendIngredient';

const url =
  'https://react-hooks-ingredients-bddee-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const { fetchedIngredient, sendIngredient } = useSendIngredient();

  useEffect(() => {
    const getIngredients = async () => {
      const response = await fetch(url);
      const resData = await response.json();
      const loadedIngredients = [];

      for (const key in resData) {
        loadedIngredients.push({ id: key, title: resData[key].title, amount: resData[key].amount });
      }

      setIngredients(loadedIngredients);
    };

    getIngredients();
  }, []);

  useEffect(() => {
    if (fetchedIngredient) {
      setIngredients(prevIngredients => [...prevIngredients, fetchedIngredient]);
    }
  }, [fetchedIngredient]);

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
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
