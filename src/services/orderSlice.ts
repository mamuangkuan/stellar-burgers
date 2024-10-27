import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getOrderByNumberApi,
  orderBurgerApi
} from '../utils/burger-api';

export interface TOrderState {
  orders: TOrder[];
  newOrder: TOrder | null;
  selectedOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: TOrderState = {
  orders: [],
  newOrder: null,
  selectedOrder: null,
  isLoading: false,
  error: null
};

export const fetchOrders = createAsyncThunk(
  'orders/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      return rejectWithValue('Не удалось получить заказы');
    }
  }
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(orderData);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка создания заказа');
    }
  }
);

export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(id);
      return response;
    } catch (error) {
      return rejectWithValue('Не удалось получить заказ');
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearNewOrderModal: (state) => {
      state.newOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.newOrder = action.payload.order;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedOrder = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export const { clearNewOrderModal } = orderSlice.actions;

export default orderSlice.reducer;
