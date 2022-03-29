import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Collection from './Components/Collection';
import { Pokemon, Pokemons, Detail } from './Interface';

const App: React.FC = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  })


  
  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")
      setNextUrl(res.data.next)
      res.data.results.forEach(async (pokemon:Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons((p) => [...p, poke.data])
        setLoading(false)   
      });
    }
    getPokemons();
  })

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl)
    setNextUrl(res.data.next)
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      )
      setPokemons((p) => [...p, poke.data]);
      setLoading(false)
    })
  };

  return (
    <div className="App">
      <header className="App-header">Pokemon List
      </header>
      <Collection
          Pokemons={pokemons}
          view_detail={viewDetail}
          set_detail={setDetail}
        />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}>
              {loading ? "Loading..." : "Load more"}{" "}
            </button>
          </div>
        )}
    </div>
  );
}

export default App;
