import React from 'react'
import {Link} from 'react-router-dom'

export default function SearchContainer(props){
    return(
        <div className='search-container'>
            <button className='searchBtn' onClick={props.currentPage !==0?(e)=>props.changePage(e):null}>Previous</button>
            <button className='searchBtn' onClick={(e)=>props.changePage(e)}>Next</button>
        
            <input 
                className='searchBar'
                type='text'
                onChange={(event) => props.handleChange(event.target.value)}
                placeholder='  Enter Pokemon Name'
            />

            <Link to={`/pokemon/${props.searchValue}`}>
                <button className='submitSearchBtn'>
                    Search
                </button>
            </Link>
    </div>
    )
}