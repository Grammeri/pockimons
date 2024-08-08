import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from '../contexts/ThemeContext';
import './App.module.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
