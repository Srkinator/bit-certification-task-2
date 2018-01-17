import React, { Component } from 'react';

import './search.css';


class Search extends Component {
        
    handleSearch =(e) =>{
        this.props.searchHandler(e.target.value);
    }
    
    render() {
        return (
                <input onChange={this.handleSearch} type="text" placeholder="Search..." />                
        );
    }
}

export default Search;