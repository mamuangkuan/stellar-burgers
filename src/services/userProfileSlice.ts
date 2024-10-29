import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi,
  refreshToken as refreshTokenApi
} from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import { TUser } from '@utils-types';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
  isLoading: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const checkUserAuthentication = createAsyncThunk(
  'userProfile/checkAuthentication',
  async (_, { dispatch, rejectWithValue }) => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      deleteCookie('accessToken');
      return;
    }

    try {
      if (!accessToken) {
        const refreshData = await refreshTokenApi();
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        setCookie('accessToken', refreshData.accessToken);
      }
      await dispatch(fetchUser());
      return true;
    } catch (error) {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return rejectWithValue(error);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'userProfile/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response;
    } catch (error) {
      return rejectWithValue('Не удалось получить данные пользователя');
    }
  }
);

export const loginUser = createAsyncThunk(
  'userProfile/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response;
    } catch (error) {
      return rejectWithValue('Не удалось авторизоваться');
    }
  }
);

export const registerUser = createAsyncThunk(
  'userProfile/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка регистрации');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'userProfile/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    } catch (error) {
      return rejectWithValue('Ошибка выхода из системы');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateProfile',
  async (profileData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(profileData);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка обновления профиля');
    }
  }
);

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthChecked = true;
        state.isLoading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthChecked = false;
        state.isLoading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthChecked = false;
        state.isLoading = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(checkUserAuthentication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUserAuthentication.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuthentication.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
        state.isAuthChecked = true;
      });
  }
});

export default userProfileSlice.reducer;
