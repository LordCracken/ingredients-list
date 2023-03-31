import { useCallback, useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

import useSendIngredient from '../../hooks/useSendIngredient';
import useRemoveIngredient from '../../hooks/useRemoveIngredient';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const {
    fetchedIngredient,
    isLoading: isSendLoading,
    error: sendError,
    sendIngredient,
    clearError: clearSendError,
  } = useSendIngredient();
  const {
    ingredientId,
    isLoading: isRemoveLoading,
    error: removeError,
    removeIngredient,
    clearError: clearRemoveError,
  } = useRemoveIngredient();

  const isLoading = isSendLoading || isRemoveLoading;
  const isError = Boolean(sendError || removeError);

  useEffect(() => {
    if (fetchedIngredient) {
      setIngredients(prevIngredients => [...prevIngredients, fetchedIngredient]);
    }
  }, [fetchedIngredient]);

  useEffect(() => {
    if (ingredientId) {
      setIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== ingredientId));
    }
  }, [ingredientId]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    sendIngredient(ingredient);
  };

  const removeIngredientHandler = id => {
    removeIngredient(id);
  };

  const clearErrors = () => {
    clearSendError();
    clearRemoveError();
  };

  return (
    <div className="App">
      {isError && <ErrorModal onClose={clearErrors}>{sendError || removeError}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
};

export default Ingredients;
