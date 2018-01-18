import React, { Component } from 'react';

import './search.css';


class Search extends Component {

    handleSearch = (e) => {
        this.props.searchHandler(e.target.value);
    }

    render() {
        return (
            <div className="field" id="searchform">
                <input onChange={this.handleSearch} type="text" id="search" placeholder="Search..." />
            </div>
        );
    }
}

export default Search;