import { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {
  const [ingredients, setIngredient] = useState([]);

  const addIngredientHandler = ingredient => {
    setIngredient(prevIngredients => [...prevIngredients, { id: ingredient.title, ...ingredient }]);
  };

  const removeIngredientHandler = id => {
    setIngredient(prevIngredients => prevIngredients.filter(ig => ig.id !== id));
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
