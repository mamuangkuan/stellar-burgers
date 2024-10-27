import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrders } from '../../services/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  // Извлекаем заказы из стора
  const orders: TOrder[] = useSelector((state) => state.orders.orders);
  const isLoading = useSelector((state) => state.orders.isLoading);

  // Загружаем заказы при монтировании компонента
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <>{isLoading ? <Preloader /> : <ProfileOrdersUI orders={orders} />}</>;
};
