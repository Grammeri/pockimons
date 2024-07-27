import { useDispatch, useSelector } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('useReduxHooks', () => {
    it('should use dispatch and selector', () => {
        const { result } = renderHook(() => {
            const dispatch = useDispatch();
            const selector = useSelector(state => state);
            return { dispatch, selector };
        }, {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        });

        expect(result.current.selector).toBeDefined();
        expect(result.current.dispatch).toBeDefined();
    });
});
