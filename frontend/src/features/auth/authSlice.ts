import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import type { User } from '../../types/user';

type AuthState = {
	user: User | null;
	isAuthenticated: boolean;
	isInitialized: boolean;
};

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isInitialized: false,
};

export const initAuth = createAsyncThunk(
	'auth/init',
	async (_, { dispatch }) => {
		try {
			const { data } = await authApi.me();
			dispatch(authSlice.actions.setUser(data.user));
		} catch {
			dispatch(authSlice.actions.setInitialized());
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isInitialized = true;
		},
		clearUser(state) {
			state.user = null;
			state.isAuthenticated = false;
			state.isInitialized = true;
		},
		setInitialized(state) {
			state.isInitialized = true;
		},
	},
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
