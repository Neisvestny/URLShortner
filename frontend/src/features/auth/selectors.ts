import type { RootState } from '../../store/store';

export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsInitialized = (state: RootState) =>
	state.auth.isInitialized;
