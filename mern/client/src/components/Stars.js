import React from 'react';
import { useState, useEffect } from 'react';

export function Stars({id }) {
  const [avg, setAvg] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [refreshStars, setRefreshStars] = useState(false);
  const onStarsChanged = () => {
    setRefreshStars(!refreshStars);
  };


  useEffect(() => {
    fetch(`http://localhost:5000/drinks/${id}/average_rating`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      params: JSON.stringify({_id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAvg(data);
        setLoaded(true);
      });
  }, [refreshStars]);
    

  function handleClick(curr) {
    fetch (`http://localhost:5000/drinks/${id}/rating/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: JSON.stringify({ _id: id }),
      body: JSON.stringify({ strRating: curr }),
    }).then((res) => {
      onStarsChanged();
    });
  }

  if (loaded) return (
    <div className="sterne">
      <div className="sternEines" onClick={() => handleClick(1)}>
        {avg < 1 ? '☆' : '★'}
      </div>
      <div className="sternZwei" onClick={() => handleClick(2)}>
        {avg < 2 ? '☆' : '★'}
      </div>
      <div className="sternDrei" onClick={() => handleClick(3)}>
        {avg < 3 ? '☆' : '★'}
      </div>
      <div className="sternVier" onClick={() => handleClick(4)}>
        {avg < 4 ? '☆' : '★'}
      </div>
      <div className="sternFunf" onClick={() => handleClick(5)}>
        {avg < 5 ? '☆' : '★'}
      </div>
    </div>
  )
  else return(
    <div>
      <p>Ładownie ocen</p>
    </div>
  )
}
