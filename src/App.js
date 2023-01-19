import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from './store/user/userReducer';

function App() {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState([]);
  const [links, setLinks] = useState({
    next: null,
    prev: null,
  });
  const [isFav, setIsFav] = useState(false);

  const favList = useSelector((state) => state.users.favList);

  useEffect(() => {
    get(`https://pokeapi.co/api/v2/pokemon`);
  }, []);

  const get = (link) => {
    axios.get(link).then((res) => {
      setPokemon(res.data.results);
      setLinks({
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  return (
    <div className='App'>
      <button onClick={(e) => setIsFav(!isFav)}>
        Mes favories : {favList?.length}
      </button>
      <div className='pokemonCollections'>
        {isFav
          ? favList.map((item, index) => (
              <div key={index} className='card'>
                <img src={item.url} alt='' />
                <h4>{item.name}</h4>
                <button onClick={() => dispatch(removeFav(index))}>
                  Remove
                </button>
              </div>
            ))
          : pokemon.map((item, index) => (
              <div key={index} className='card'>
                <img src={item.url} alt='' />
                <h4>{item.name}</h4>
                <button onClick={() => dispatch(addFav(item))}>
                  {favList.some(
                    (i) => i.name.toLowerCase() === item.name.toLowerCase()
                  )
                    ? 'Supprimé'
                    : 'Ajouté'}{' '}
                   Fav
                </button>
              </div>
            ))}
      </div>
      {!isFav && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1em',
          }}
        >
          <button
            disabled={links.prev == null}
            onClick={() => {
              get(links.prev);
            }}
          >
            Précédent
          </button>
          <button
            disabled={links.next == null}
            onClick={() => {
              get(links.next);
            }}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
