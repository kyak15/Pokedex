import React from 'react'
import { typeClassMap } from '../api'
export default function PokeDetailCard(props){

    //capitalze first letter
    const fixedName = props.data.name.charAt(0).toUpperCase() +props.data.name.slice(1)

    return (
        
        <div className={props.data.types.length>1?`pokemon-detail ${props.data.types[1].type.name}`:
        `pokemon-detail ${props.data.types[0].type.name}`}>
            <img src={props.data.sprites.front_default}/>
            <h1 className='pokemon-detail-name'>{fixedName}</h1>
            <h2 className='pokemon-detail-typeHeader'>{props.data.types.length>1?'Types:':'Type:'}</h2>
            {props.data.types.map(item =>{
                return(
                    <h2 className='pokemon-detail-type'>{
                        item.type.name.charAt(0).toUpperCase()+item.type.name.slice(1)
                        }
                    </h2>
                )
            })}

        </div>
        
    )
}