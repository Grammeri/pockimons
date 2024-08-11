import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { useGetPokemonByNameQuery } from '../services/pokemon';
import { store } from '../../store';

describe('pokemonApi', () => {
  it('fetches pokemon by name', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGetPokemonByNameQuery('pikachu'),
      {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      }
    );

    await waitForNextUpdate();

    expect(result.current.data?.name).toBe('pikachu');
    expect(result.current.isLoading).toBeFalsy();
  });
});
