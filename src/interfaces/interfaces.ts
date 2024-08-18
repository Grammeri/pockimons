export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: FileList | null;
  country: string;
}

export interface FormState {
  controlledForm: FormData | null;
  uncontrolledForm: FormData | null;
}

export const initialState: FormState = {
  controlledForm: null,
  uncontrolledForm: null,
};
