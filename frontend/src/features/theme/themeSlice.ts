import { createSlice } from '@reduxjs/toolkit';

type Theme = 'dark' | 'light';

const stored = localStorage.getItem('theme') as Theme | null;

const themeSlice = createSlice({
	name: 'theme',
	initialState: { value: stored ?? ('light' as Theme) },
	reducers: {
		toggleTheme(state) {
			state.value = state.value === 'dark' ? 'light' : 'dark';
			localStorage.setItem('theme', state.value);
		},
	},
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
