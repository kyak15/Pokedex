import React from 'react'
import {getPokemon} from '../api'
import {Link} from 'react-router-dom'
import PokeHomeCard from '../components/PokeHomeCard'


export default function Page(){

    const [pokemonPageData, setPokemonPageData] = React.useState([]) //gets 20 pokemon per page
    const [currentPage, setCurrentPage] = React.useState(0) //changes search parameter to next page
    const [searchValue, setSearchValue] = React.useState('') //keeps track of user search
    const [searchData, setSearchData]  = React.useState([]) //all 1302 pokemon 
    const [filteredSearchData, setFilteredSearchData] = React.useState([]) //only displays 10 pokemon on the searchbar

    function changePage(evt){
        const action = evt.target.innerText;
        action==='Next'?setCurrentPage(prevState => prevState+20):setCurrentPage(prevState => prevState - 20)
    }

    //NOTE: Bad practice to just use fetch within the useEffect

    React.useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1302`)
            .then(res=>res.json())
            .then(data => setSearchData(data.results))
    },[])


    React.useEffect(()=>{
        async function loadPokemon(){
            const data = await getPokemon(currentPage)
            setPokemonPageData(data)
        }
        loadPokemon(currentPage)

    },[currentPage])

    const handleChange = (value) =>{
        const userVal = value.toLowerCase()
        setSearchValue(userVal)
        const filteredPokemon = searchData.filter(pokemon => pokemon.name.includes(userVal))
        const limitedPokemon = filteredPokemon.slice(0,20)
        setFilteredSearchData(limitedPokemon)
    }

    const filteredStuff = filteredSearchData.map(item=>{
        if(searchValue){
            return(
                <Link to={`/pokemon/${item.name}`}>
                    <div className='results-item'>
                    {item.name}
                    </div>                
                </Link>

            )
        }
    })

    return(
        <div>
            <div className='search-container'>
                <button className='searchBtn' onClick={currentPage !==0?(e)=>changePage(e):null}>Previous</button>
                <button className='searchBtn' onClick={(e)=>changePage(e)}>Next</button>
                <input 
                    className='searchBar'
                    type='text'
                    onChange={(event) => handleChange(event.target.value)}
                    placeholder='  Enter Pokemon Name'
                />

                <Link to={`/pokemon/${searchValue}`}>
                    <button className='submitSearchBtn'>
                        Click
                    </button>
                </Link>
            </div>

            {searchData?<div className='results'>
                    {filteredStuff}
            </div>:null}

            <div className='home-container'>
                <PokeHomeCard 
                    data={pokemonPageData}
                />
            </div>
        </div>

    )
}