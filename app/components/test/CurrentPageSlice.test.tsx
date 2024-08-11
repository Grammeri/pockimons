import { configureStore } from '@reduxjs/toolkit';
import currentPageReducer, { setPageItems } from '../../slices/currentPageSlice';
import { CardItem } from '../../types';

const store = configureStore({
  reducer: {
    currentPage: currentPageReducer,
  },
});

describe('currentPageSlice', () => {
  it('should return the initial state', () => {
    const initialState = {
      items: [],
      currentPage: 1,
    };

    expect(store.getState().currentPage).toEqual(initialState);
  });

  it('should handle setPageItems', () => {
    const mockItems: CardItem[] = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
    ];

    store.dispatch(setPageItems({ items: mockItems, currentPage: 2 }));

    const expectedState = {
      items: mockItems,
      currentPage: 2,
    };

    expect(store.getState().currentPage).toEqual(expectedState);
  });
});
