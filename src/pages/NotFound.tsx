import React from 'react';
import './NotFound.css';
import NotFoundImage from '../assets/404.jpeg';

export const NotFound = (): React.ReactElement => {
  return (
      <div className="notFoundContainer">
          <img src={NotFoundImage} alt="404 - Page Not Found"/>
          <h1>Page not found</h1>
      </div>
  );
};

