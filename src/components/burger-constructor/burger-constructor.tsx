import { FC, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { resetConstructor } from '../../services/burgerConstructorSlice';
import { clearNewOrderModal } from '../../services/orderSlice';
import { createOrder } from '../../services/orderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем данные из стора
  const constructorItems = useSelector(
    (state) => state.burgerConstructor.constructorItems
  );

  const orderRequest = useSelector((state) => state.orders.isLoading);
  const orderModalData = useSelector((state) => state.orders.newOrder);

  // Получаем информацию о пользователе
  const { user } = useSelector((state) => state.userProfile);

  const onOrderClick = () => {
    // Проверяем, авторизован ли пользователь
    if (!user) {
      navigate('/login');
      return;
    }

    // Проверка наличия булки и состояния запроса
    if (!constructorItems.bun || orderRequest) return;

    // Если пользователь авторизован и все условия выполнены, создаем заказ
    dispatch(
      createOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(clearNewOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
