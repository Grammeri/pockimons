import React from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
        </head>
        <body>
        <Provider store={store}>
            <ThemeProvider>
                <Outlet /> {/* Это место, где рендерятся вложенные маршруты */}
            </ThemeProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}
