import ordersHistoryReducer, {
  fetchOrdersHistory,
  initialState
} from './ordersHistorySlice';
import { TOrder } from '@utils-types';

describe('ordersHistorySlice', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-11-11T10:41:38.536Z',
      updatedAt: '2024-11-11T10:41:38.536Z',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    },
    {
      _id: '2',
      status: 'pending',
      name: 'Order 2',
      createdAt: '2024-11-11T10:41:38.536Z',
      updatedAt: '2024-11-11T10:41:38.536Z',
      number: 2,
      ingredients: ['ingredient3', 'ingredient4']
    }
  ];

  it('должен устанавливать isLoading в true при fetchOrdersHistory.pending', () => {
    const action = { type: fetchOrdersHistory.pending.type };
    const state = ordersHistoryReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });

  it('должен записывать данные в store и устанавливать isLoading в false при fetchOrdersHistory.fulfilled', () => {
    const action = {
      type: fetchOrdersHistory.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 10
      }
    };
    const state = ordersHistoryReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('должен устанавливать ошибку и isLoading в false при fetchOrdersHistory.rejected', () => {
    const action = {
      type: fetchOrdersHistory.rejected.type,
      payload: 'Failed to fetch orders'
    };
    const state = ordersHistoryReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed to fetch orders');
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });
});
