export interface Pokemon 
{
    id: number,
    name: string
    url: string
    sprites: {
      front_default: string
    }
}
  
export interface PokemonDetail extends Pokemon 
{
    abilities?: 
    {
      ability:string
      name:string
    }[];
}  

export interface Pokemons {
  name: string
  url: string
}

export interface Detail {
  id: number
  isOpened: boolean
}
