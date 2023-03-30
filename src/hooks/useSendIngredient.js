import { useEffect, useState } from 'react';

const url =
  'https://react-hooks-ingredients-bddee-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

const useSendIngredient = () => {
  const [ingredient, setIngredient] = useState(null);
  const [fetchedIngredient, setFetchedIngredient] = useState(null);

  const sendIngredient = async () => {
    const { title, amount } = ingredient;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ingredient),
    });
    const resData = await response.json();
    setFetchedIngredient({ id: resData.name, title, amount });
  };

  useEffect(() => {
    if (ingredient) {
      sendIngredient();
    }
  }, [ingredient]);

  return {
    fetchedIngredient,
    sendIngredient: ingredient => {
      setIngredient(ingredient);
    },
  };
};

export default useSendIngredient;
