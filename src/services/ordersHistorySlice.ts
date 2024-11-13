import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

type OrdersHistoryState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

export const initialState: OrdersHistoryState = {
  isLoading: false,
  orders: [] as TOrder[],
  total: 0,
  totalToday: 0,
  error: null as string | null
};

// Асинхронное действие для получения данных с сервера всех заказов
export const fetchOrdersHistory = createAsyncThunk(
  'ordersHistory/fetchOrdersHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ordersHistorySlice = createSlice({
  name: 'ordersHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrdersHistory.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: TOrder[];
            total: number;
            totalToday: number;
          }>
        ) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchOrdersHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default ordersHistorySlice.reducer;
