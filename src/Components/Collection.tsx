import React from 'react'
import { Detail, PokemonDetail } from '../Interface'
import List from './List'
import './list.css'
interface Props{
    Pokemons: PokemonDetail[]
    view_detail: Detail
    set_detail: React.Dispatch<React.SetStateAction<Detail>>
}

const Collection:React.FC<Props> = (props) => {
    const {Pokemons, view_detail, set_detail} = props
    const selectPokemon = (id: number) => 
    {
        if (!view_detail.isOpened) 
        {
          set_detail({
            id: id,
            isOpened: true,
          })
        }
    }
    return (
        <div>
      <section className={
          view_detail.isOpened
            ? "collection-container-active"
            : "collection-container"
        }>
            
        {view_detail.isOpened ? 
        (
          <div className="overlay"></div>
        ) : 
        (
          <div className=""></div>
        )}
        {Pokemons.map((o, index) => {
          return (
            <div onClick={() => selectPokemon(o.id)}>
              <List
                index={index}
                viewDetail={view_detail}
                setDetail={set_detail}
                key={o.id}
                name={o.name}
                id={o.id}
                abilities={o.abilities}
                image={o.sprites.front_default}
              />
            </div>
          );
        })}
      </section>

        </div>
    )
}

export default Collection