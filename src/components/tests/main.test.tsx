import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import { NotFound } from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';

test('renders the app and navigates to not-found page', () => {
    render(
        <Provider store={store}>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="not-found" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/not-found" />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
    expect(screen.getByText(/Choose theme/i)).toBeInTheDocument();

    // Navigate to a non-existing route
    window.history.pushState({}, 'Test page', '/non-existing-route');
    render(
        <Provider store={store}>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="not-found" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/not-found" />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
});
