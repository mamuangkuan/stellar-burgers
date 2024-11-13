// Импортируем rootReducer и начальные состояния каждого редьюсера
import rootReducer from './rootReducer';
import { initialState as ingredientsInitialState } from './ingredientsSlice';
import { initialState as burgerConstructorInitialState } from './burgerConstructorSlice';
import { initialState as orderInitialState } from './orderSlice';
import { initialState as ordersHistoryInitialState } from './ordersHistorySlice';
import { initialState as userProfileInitialState } from './userProfileSlice';

describe('Тест работы rootReducer', () => {
  it('вызов rootReducer с undefined состоянием и нераспознанным экшеном возвращает корректное начальное состояние', () => {
    // Ожидаемое начальное состояние, объединяющее состояния всех редьюсеров
    const expectedInitialState = {
      ingredients: ingredientsInitialState,
      burgerConstructor: burgerConstructorInitialState,
      orders: orderInitialState,
      ordersHistory: ordersHistoryInitialState,
      userProfile: userProfileInitialState
    };

    // Вызываем rootReducer с неопределённым состоянием и неизвестным действием
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Проверяем, что состояние, возвращаемое rootReducer, соответствует ожидаемому
    expect(state).toEqual(expectedInitialState);
  });
});
