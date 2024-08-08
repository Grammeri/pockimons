'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ThemeProvider } from '../src/contexts/ThemeContext';


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            <ThemeProvider>{children}</ThemeProvider>
        </Provider>
        </body>
        </html>
    );
}
