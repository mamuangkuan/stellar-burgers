import userProfileReducer, {
  fetchUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  checkUserAuthentication,
  initialState
} from './userProfileSlice';
import { TUser } from '@utils-types';

describe('userProfileSlice', () => {
  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('должен устанавливать isLoading в true при fetchUser.pending', () => {
    const action = { type: fetchUser.pending.type };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать пользователя в store и устанавливать isLoading в false при fetchUser.fulfilled', () => {
    const action = {
      type: fetchUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать ошибку и isLoading в false при fetchUser.rejected', () => {
    const action = {
      type: fetchUser.rejected.type,
      payload: 'Не удалось получить данные пользователя'
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось получить данные пользователя');
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать isLoading в true при loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать пользователя в store и устанавливать isLoading в false при loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать ошибку и isLoading в false при loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Не удалось авторизоваться'
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось авторизоваться');
    expect(state.isAuthChecked).toBe(false);
  });

  it('должен устанавливать isLoading в true при registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать пользователя в store и устанавливать isLoading в false при registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать ошибку и isLoading в false при registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Ошибка регистрации'
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
    expect(state.isAuthChecked).toBe(false);
  });

  it('должен очищать пользователя и сбрасывать isAuthChecked при logoutUser.fulfilled', () => {
    const initialStateWithUser = {
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = userProfileReducer(initialStateWithUser, action);

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('должен устанавливать ошибку и isLoading в false при logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      payload: 'Ошибка выхода из системы'
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка выхода из системы');
  });

  it('должен устанавливать isLoading в true при updateUserProfile.pending', () => {
    const action = { type: updateUserProfile.pending.type };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обновлять пользователя и устанавливать isLoading в false при updateUserProfile.fulfilled', () => {
    const action = {
      type: updateUserProfile.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toEqual(mockUser);
  });

  it('должен устанавливать ошибку и isLoading в false при updateUserProfile.rejected', () => {
    const action = {
      type: updateUserProfile.rejected.type,
      payload: 'Ошибка обновления профиля'
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка обновления профиля');
  });

  it('должен устанавливать isLoading в true при checkUserAuthentication.pending', () => {
    const action = { type: checkUserAuthentication.pending.type };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать isAuthChecked в true и isLoading в false при checkUserAuthentication.fulfilled', () => {
    const action = { type: checkUserAuthentication.fulfilled.type };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать ошибку и isAuthChecked в true при checkUserAuthentication.rejected', () => {
    const action = {
      type: checkUserAuthentication.rejected.type,
      payload: 'Ошибка проверки аутентификации'
    };
    const state = userProfileReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка проверки аутентификации');
    expect(state.isAuthChecked).toBe(true);
  });
});
