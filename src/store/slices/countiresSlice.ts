import { createSlice } from '@reduxjs/toolkit';

export interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: [
    'United States',
    'Canada',
    'Mexico',
    'Russia',
    'China',
    'Japan',
    'Germany',
    'France',
    'India',
    'Brazil',
    'Australia',
    'United Kingdom',
    'South Korea',
    'Italy',
    'Spain',
    'South Africa',
    'New Zealand',
    'Argentina',
    'Chile',
    'Colombia',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
