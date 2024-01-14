import React from 'react'
import {useParams, Link} from 'react-router-dom'
import { getPokemonDetail } from '../api'
import PokeDetailCard from '../components/PokeDetailCard'

export default function PokemonDetail(){

    const params = useParams()
    const [pokeDetail, setPokeDetail] = React.useState()

    React.useEffect(()=>{
        async function loadDetails(){
            const data = await getPokemonDetail(params.name)
            setPokeDetail(data)
        }
        loadDetails()
    },[params.name])

    if (!pokeDetail){
        return <p>Loading!</p>
    }

    return (
        <div>
            <Link to={'/'}><button className='pokemon-detail-btn'>Back to Home</button></Link> 
            <div className='pokemondetail-container'>
                <PokeDetailCard data={pokeDetail}/>
            </div>
    
        </div>

        
    )
}