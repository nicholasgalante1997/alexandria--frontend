import React from 'react'

const SearchBar = (props) => {
    return (
        <div className="search-bar">
            <label>Search Books</label>
            <input onChange={props.handleChange} type='text' name='filter' value={props.filter}/>
        </div>
    )
}

export default SearchBar;
