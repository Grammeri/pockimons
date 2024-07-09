import React, { Component } from 'react';
import {ResultProps} from '../types.ts';



class Results extends Component<ResultProps, React> {
    render() {
        const { results } = this.props;
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
}

export default Results;
