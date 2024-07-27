import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardItem } from '../types';

interface SelectedItemsState {
    selectedItems: CardItem[];
}

const initialState: SelectedItemsState = {
    selectedItems: [],
};

const selectedItemsSlice = createSlice({
    name: 'selectedItems',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CardItem>) => {
            state.selectedItems.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<CardItem>) => {
            state.selectedItems = state.selectedItems.filter(
                (item) => item.name !== action.payload.name
            );
        },
        clearItems: (state) => {
            state.selectedItems = [];
        },
    },
});

export const { addItem, removeItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
