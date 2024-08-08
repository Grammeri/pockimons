import React from 'react';
import styles from './NotFound.module.css';

export const NotFound = (): React.ReactElement => {
    return (
        <div className={styles.notFoundContainer}>
            <img src="/404.jpeg" alt="404 - Page Not Found"/>
            <h1>Page not found</h1>
        </div>
    );
};
