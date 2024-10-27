import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store'; // Используем типизированный useSelector
import { fetchIngredients } from '../../services/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { items, isLoading, hasError } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    if (items.length === 0) {
      // Если ингредиенты еще не загружены, инициируем их загрузку
      dispatch(fetchIngredients());
    }
  }, [items, dispatch]);

  const ingredientData = items.find((ingredient) => ingredient._id === id);

  if (isLoading) {
    return <Preloader />;
  }

  if (hasError) {
    return <div>Ошибка загрузки ингредиентов</div>;
  }

  if (!ingredientData) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
