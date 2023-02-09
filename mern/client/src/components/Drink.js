import { Stars } from './Stars.js';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Drink({onDrinksChanged, refreshDrinks, drink }) {
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  function handleDeleteClick() {
    fetch(`http://localhost:5000/drinks/delete/${drink._id}`, {
      method: 'DELETE',
      params: {
        id: drink._id,
      },
    }).then((res) => {
      onDrinksChanged();
    });
  }

  return (
    <div key={drink.idDrink} className="drink">
      {isLoggedIn && (
        <button onClick={() => handleDeleteClick(drink._id)}>Usuń</button>
      )}
      <img src={drink.strDrinkThumb} className="drink-image" />
      <div className="drink-info">
        <div>{drink.strDrink}</div>
        <div>{drink.strAlcoholic}</div>
        <div className="gwiazdki">
          <Stars rating={drink.strRating} onDrinksChanged={onDrinksChanged} refreshDrinks={refreshDrinks} id={drink._id}/>
        </div>
      </div>
      <button className="drink-details-button">
        <Link to={`${drink._id}`}>Szczegóły</Link>
      </button>
    </div>
  );
}
