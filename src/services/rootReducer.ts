import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import orderReducer from './orderSlice';
import ordersHistoryReducer from './ordersHistorySlice';
import userProfileReducer from './userProfileSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orders: orderReducer,
  ordersHistory: ordersHistoryReducer,
  userProfile: userProfileReducer
});

export default rootReducer;
