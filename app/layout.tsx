'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { ThemeProvider } from '../app/contexts/ThemeContext'



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
