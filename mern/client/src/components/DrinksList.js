import { useSelector} from 'react-redux';
import React, { useState, useEffect } from 'react';
import Drink from './Drink';
import AddDrinkForm from './AddDrinkForm.js';

export default function DrinksList({onDrinksChanged, refreshDrinks }) {
  const [drinksList, setDrinksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  const deleteAllDrinks = () => { 
    fetch('http://localhost:5000/drinks/clear', {
      method: 'DELETE',
    }).then((res) => {
      onDrinksChanged();
    })
  }

  useEffect(() => {
    fetch("http://localhost:5000/drinks")
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(false);
          setIsLoaded(true);
          setDrinksList(result);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      )
  }, [refreshDrinks])

  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredDrinks =
    searchTerm !== ''
      ? drinksList
          .filter((el) =>
            el.strDrink.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((drink) => <Drink key={drink._id} onDrinksChanged={onDrinksChanged} drink={drink}/>)
      : drinksList
          .sort((a, b) => a.idDrink - b.idDrink)
          .map((drink) => <Drink key={drink._id} onDrinksChanged={onDrinksChanged} drink={drink} />);

  if (loading) {
    return( 
      <div className='drinks-list'>
        <p className='drinks-alert'>Ładowanie drinków</p>
      </div>)
  }
  if (error) {
    return <div className='drinks-list'>Error: {error.message}</div>;
  }
  if (isLoaded && !loading && drinksList.length !== 0) {
      return (
        <div className="drinks-list">
          {isLoaded && <input
            className="search-bar"
            type="text"
            placeholder="🔍 wyszukaj"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            />
          }
            {isLoggedIn && 
            <div>
              <AddDrinkForm onDrinksChanged={onDrinksChanged} refreshDrinks={refreshDrinks} />
              <button onClick={deleteAllDrinks}>Usuń wszystkie drinki</button>
            </div>
            }
          <div className="der-liste">
            {filteredDrinks}
          </div>
        </div>
      );
    }
    else if (isLoaded && !loading && drinksList.length ===0){
      return(
        <div className="drinks-list">
          {isLoggedIn && <AddDrinkForm />}
          <p className='drinks-alert'>Brak drinków</p>
        </div>
      )
    }

}
