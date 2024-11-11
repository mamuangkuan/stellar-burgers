import orderReducer, {
  fetchOrders,
  createOrder,
  getOrderById,
  clearNewOrderModal,
  initialState
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
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
    },
    {
      _id: '3',
      status: 'in-progress',
      name: 'Order 3',
      createdAt: '2024-11-11T10:41:38.536Z',
      updatedAt: '2024-11-11T10:41:38.536Z',
      number: 3,
      ingredients: ['ingredient5', 'ingredient6']
    }
  ];

  it('должен устанавливать isLoading в true при fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
  });

  it('должен записывать заказы в store и устанавливать isLoading в false при fetchOrders.fulfilled', () => {
    const action = { type: fetchOrders.fulfilled.type, payload: mockOrders };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(mockOrders);
  });

  it('должен устанавливать ошибку и isLoading в false при fetchOrders.rejected', () => {
    const action = {
      type: fetchOrders.rejected.type,
      payload: 'Не удалось получить заказы'
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось получить заказы');
    expect(state.orders).toEqual([]);
  });

  it('должен устанавливать isLoading в true при createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать новый заказ и isLoading в false при createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrders[0] }
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.newOrder).toEqual(mockOrders[0]);
  });

  it('должен устанавливать ошибку и isLoading в false при createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Ошибка создания заказа'
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });

  it('должен устанавливать isLoading в true при getOrderById.pending', () => {
    const action = { type: getOrderById.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.selectedOrder).toBeNull();
  });

  it('должен устанавливать выбранный заказ и isLoading в false при getOrderById.fulfilled', () => {
    const action = {
      type: getOrderById.fulfilled.type,
      payload: { orders: [mockOrders[0]] }
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.selectedOrder).toEqual(mockOrders[0]);
  });

  it('должен устанавливать ошибку и isLoading в false при getOrderById.rejected', () => {
    const action = {
      type: getOrderById.rejected.type,
      payload: 'Не удалось получить заказ'
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось получить заказ');
    expect(state.selectedOrder).toBeNull();
  });

  it('должен очищать новый заказ при clearNewOrderModal', () => {
    const initialStateWithNewOrder = {
      ...initialState,
      newOrder: mockOrders[0]
    };
    const action = clearNewOrderModal();
    const state = orderReducer(initialStateWithNewOrder, action);

    expect(state.newOrder).toBeNull();
  });
});
