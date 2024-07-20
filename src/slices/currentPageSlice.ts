import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardItem } from '../types';

interface CurrentPageState {
    items: CardItem[];
    currentPage: number;
}

const initialState: CurrentPageState = {
    items: [],
    currentPage: 1,
};

const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        setPageItems: (state, action: PayloadAction<{ items: CardItem[], currentPage: number }>) => {
            state.items = action.payload.items;
            state.currentPage = action.payload.currentPage;
        },
    },
});

export const { setPageItems } = currentPageSlice.actions;
export default currentPageSlice.reducer;
