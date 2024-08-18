import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData, initialState } from '../../interfaces/interfaces';

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    saveControlledFormData: (state, action: PayloadAction<FormData>) => {
      state.controlledForm = action.payload;
    },
    saveUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledForm = action.payload;
    },
  },
});

export const { saveControlledFormData, saveUncontrolledFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
