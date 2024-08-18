import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
}

interface FormState {
  controlledForm: FormData | null;
}

const initialState: FormState = {
  controlledForm: null,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    saveControlledFormData: (state, action: PayloadAction<FormData>) => {
      state.controlledForm = action.payload;
    },
  },
});

export const { saveControlledFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
