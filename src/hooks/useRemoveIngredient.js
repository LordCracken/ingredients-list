import { useEffect, useState } from 'react';

const url =
  'https://react-hooks-ingredients-bddee-default-rtdb.europe-west1.firebasedatabase.app/ingredients';

const useSendIngredient = () => {
  const [ingredientId, setIngredientId] = useState('');

  const removeIngredient = async () => {
    await fetch(`${url}/${ingredientId}.json`, { method: 'DELETE' });
  };

  useEffect(() => {
    if (ingredientId) {
      removeIngredient();
    }
  }, [ingredientId]);

  return {
    ingredientId,
    removeIngredient: id => {
      setIngredientId(id);
    },
  };
};

export default useSendIngredient;
