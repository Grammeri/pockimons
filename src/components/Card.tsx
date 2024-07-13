import React from 'react';
import { Props } from '../types.ts';

export const Card = ({ results }: Props) => {
    return (
      <div className="results-container">
          {results.map((result, index) => (
            <div key={index}>
                <h3>{result.name}</h3>
                <p>{result.description}</p>
            </div>
          ))}
      </div>
    );
}

