import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrdersHistory } from '../../services/ordersHistorySlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.ordersHistory.orders);
  const isLoading = useSelector((state) => state.ordersHistory.isLoading);

  console.log(orders);

  useEffect(() => {
    if (orders.length === 0 && !isLoading) {
      dispatch(fetchOrdersHistory());
    }
  }, [dispatch, orders.length, isLoading]);

  // Функция для ручного обновления списка заказов
  const handleGetFeeds = () => {
    dispatch(fetchOrdersHistory());
  };

  // Показываем Preloader, если данные загружаются или если список заказов пуст
  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  // Возвращаем компонент FeedUI, если заказы загружены
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
