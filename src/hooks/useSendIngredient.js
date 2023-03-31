import { useEffect, useState } from 'react';

const url =
  'https://react-hooks-ingredients-bddee-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

const useSendIngredient = () => {
  const [ingredient, setIngredient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchedIngredient, setFetchedIngredient] = useState(null);

  const sendIngredient = async () => {
    setIsLoading(true);

    try {
      const { title, amount } = ingredient;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient),
      });
      const resData = await response.json();
      setFetchedIngredient({ id: resData.name, title, amount });
    } catch (_e) {
      setError('Something went wrong!');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (ingredient) {
      sendIngredient();
    }
  }, [ingredient]);

  return {
    fetchedIngredient,
    isLoading,
    error,
    sendIngredient: ingredient => {
      setIngredient(ingredient);
    },
    clearError: () => {
      setError('');
    },
  };
};

export default useSendIngredient;
