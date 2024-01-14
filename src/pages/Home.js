import React from 'react'
import {getPokemon} from '../api'
import {Link} from 'react-router-dom'
import PokeHomeCard from '../components/PokeHomeCard'
import SearchContainer from '../components/SearchContainer'


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

    //NOTE: Probs Bad practice to just use fetch within the useEffect rather than making async functions like the other below

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

    const searchResults = filteredSearchData.map(item=>{
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
            <SearchContainer
                changePage = {changePage}
                handleChange = {handleChange}
                currentPage={currentPage}
                searchValue = {searchValue}
            />

            {searchResults.length > 0 && <div className='results' >{searchResults}</div>}

            <div className='home-container'>
                <PokeHomeCard 
                    data={pokemonPageData}
                />
            </div>
        </div>

    )
}