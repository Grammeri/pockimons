import React, { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import { AppState, Pokemon } from './types';



class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            results: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.fetchData(localStorage.getItem('searchTerm') || '');
    }

    fetchData = (term: string) => {
        this.setState({ loading: true });
        const apiUrl = term
            ? `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0&search=${term}`
            : 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const results = data.results.map((item: Pokemon) => ({
                    name: item.name,
                    description: item.url,
                }));
                this.setState({ results, loading: false });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                this.setState({ loading: false });
            });
    };

    handleSearch = (term: string) => {
        this.fetchData(term);
    };

    throwError = () => {
        throw new Error('Test error');
    };

    render() {
        const { results, loading } = this.state;

        return (
            <ErrorBoundary>
                <div className="app-container">
                    <div className="top-section">
                        <Search onSearch={this.handleSearch} onThrowError={this.throwError} />
                    </div>
                    <div className="bottom-section">
                        {loading ? <p>Loading...</p> : <Results results={results} />}
                    </div>
                </div>
            </ErrorBoundary>
        );
    }
}

export default App;
