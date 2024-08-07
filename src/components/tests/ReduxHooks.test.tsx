import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { store } from '../../store';

describe('useReduxHooks', () => {
    it('should use app dispatch and app selector', () => {
        const { result } = renderHook(() => {
            const dispatch = useAppDispatch();
            const selector = useAppSelector(state => state);
            return { dispatch, selector };
        }, {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        });

        expect(result.current.selector).toBeDefined();
        expect(result.current.dispatch).toBeDefined();
    });
});
