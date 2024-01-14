import React from 'react'
import {Link } from 'react-router-dom'
import { typeClassMap } from '../api'


export default function PokeHomeCard(props){



    return(
        props.data.map(pokeName =>{
            const fixedName = pokeName.name.charAt(0).toUpperCase() +pokeName.name.slice(1)
           
            return(
                  
                    <div className={
                        pokeName.type.map(type => `pokemon-name ${typeClassMap[type]}`)
                    }>
                        <Link to={`/pokemon/${pokeName.name}`}>
                        <img src={pokeName.image}/>
                        <h4>{fixedName}</h4>
                        </Link>
                    </div>
            )
        })
    )
}
    