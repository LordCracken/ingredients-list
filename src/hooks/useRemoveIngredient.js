import { useEffect, useState } from 'react';

const url =
  'https://react-hooks-ingredients-bddee-default-rtdb.europe-west1.firebasedatabase.app/ingredients';

const useSendIngredient = () => {
  const [ingredientId, setIngredientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const removeIngredient = async () => {
    setIsLoading(true);

    try {
      await fetch(`${url}/${ingredientId}.json`, { method: 'DELETE' });
    } catch (_e) {
      setError('Something went wrong!');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (ingredientId) {
      removeIngredient();
    }
  }, [ingredientId]);

  return {
    ingredientId,
    isLoading,
    error,
    removeIngredient: id => {
      setIngredientId(id);
    },
    clearError: () => {
      setError('');
    },
  };
};

export default useSendIngredient;
