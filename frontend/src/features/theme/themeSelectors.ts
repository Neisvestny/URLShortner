import type { RootState } from '../../store/store';

export const selectTheme = (state: RootState) => state.theme.value;
