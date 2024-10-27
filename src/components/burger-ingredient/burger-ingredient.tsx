import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { nanoid } from 'nanoid';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addIngredient, setBun } from '../../services/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      // Генерация уникального id для каждого нового ингредиента
      const ingredientWithId = { ...ingredient, id: nanoid() };

      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredientWithId));
      } else {
        dispatch(addIngredient(ingredientWithId));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
