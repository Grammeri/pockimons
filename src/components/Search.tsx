import React, { Component } from 'react';
import { SearchProps, SearchState } from 'src/types.ts';


class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        const savedSearchTerm = localStorage.getItem('searchTerm') || '';
        this.state = { searchTerm: savedSearchTerm };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value });
    };

    handleSearchClick = () => {
        const trimmedTerm = this.state.searchTerm.trim();
        localStorage.setItem('searchTerm', trimmedTerm);
        this.props.onSearch(trimmedTerm);
    };

    render() {
        return (
            <div className="search-container">
                <input
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSearchClick}>Search</button>
                <button onClick={this.props.onThrowError}>Throw Error</button>
            </div>
        );
    }
}

export default Search;
