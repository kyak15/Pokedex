import React from 'react'
import pokeBall from '../images/pokeBall.png'
import {Link} from 'react-router-dom'

//NOTES
    // Accesibilty issue with the image serving as a button. 

export default function Header(){
    return(
        <header className='header'>
            <h1>Karim's React Pokedex</h1>
            <Link to={'/'} ><img src={pokeBall}/></Link>
        </header>
    )
}