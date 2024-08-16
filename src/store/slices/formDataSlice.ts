import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../interfaces/interfaces.ts';


interface FormDataState {
  controlledFormData: FormData | null;
  uncontrolledFormData: FormData | null;
}

const initialState: FormDataState = {
  controlledFormData: null,
  uncontrolledFormData: null,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setControlledFormData: (state, action: PayloadAction<FormData>) => {
      state.controlledFormData = action.payload;
    },
    setUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledFormData = action.payload;
    },
  },
});

export const { setControlledFormData, setUncontrolledFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
