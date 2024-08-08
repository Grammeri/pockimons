import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { store } from '../../store';
import App from 'src/pages/App';

describe('Main application rendering', () => {
    it('renders the application without crashing', async () => {
        const root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);

        await act(async () => {
            const container = createRoot(root);
            container.render(
                <React.StrictMode>
                    <Provider store={store}>
                        <ThemeProvider>
                            <BrowserRouter>
                                <App />
                            </BrowserRouter>
                        </ThemeProvider>
                    </Provider>
                </React.StrictMode>
            );
        });

        expect(document.querySelector('[placeholder="Search"]')).toBeInTheDocument();
        expect(document.body.textContent).toContain('Choose theme:');
    });
});
