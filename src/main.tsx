import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { NotFound } from './pages/NotFound';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="not-found" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
