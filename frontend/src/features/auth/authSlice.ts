import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

type AuthState = {
	user: User | null;
	isAuthenticated: boolean;
	isInitialized: boolean;
};

const getInitialState = (): AuthState => {
	try {
		const stored = localStorage.getItem("user");
		if (!stored) {
			return {
				user: null,
				isAuthenticated: false,
				isInitialized: true,
			};
		}

		const user = JSON.parse(stored);

		return {
			user,
			isAuthenticated: true,
			isInitialized: true,
		};
	} catch {
		return {
			user: null,
			isAuthenticated: false,
			isInitialized: true,
		};
	}
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isAuthenticated = true;

			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		logout(state) {
			state.user = null;
			state.isAuthenticated = false;

			localStorage.removeItem("user");
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;