import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Whoops404 from './Whoops404.js';
import DownloadButton from './DownloadButton.js';
import EditDrinkForm from './EditDrinkForm.js';

export default function DrinkDetails() {
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [drink, setDrink] = React.useState(null);

  const [refreshDetails, setRefreshDetails] = React.useState(false);
  const changeDetails = () => {
    setRefreshDetails(!refreshDetails);
  };

  React.useEffect(() => {
    fetch(`http://localhost:5000/drinks/${id}`)
      .then((res) => res.json())
      .then(
        (data) => {
        setDrink(data);
        setLoading(false);
        setIsLoaded(true);
      },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  }, [id, refreshDetails]);
  
  if (loading) {
    return <div>Ładowanie szczegółów</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoaded && !loading && drink) {
    return (
      <div className="drink-details">
        <h1>{drink.strDrink}</h1>
        <DownloadButton data={drink} typeOfData="ten przepis" />
        <img src={drink.strDrinkThumb} className="drink-details-image" />
        <div className="drink-details-info">
          <p>id: {drink._id}</p>
          <p>
            ocena:{' '}
            {drink.strRating.length > 0
              ? parseFloat(
                  drink.strRating.reduce((a, b) => a + b, 0) /
                    drink.strRating.length
                ).toFixed(1)
              : 0}
          </p>
          <ul>
           {' '}
           składniki:
           {drink.strIngredients.map((ingredient, index) => (
             <li key={ingredient}>
               {ingredient}: {drink.strMeasures[index]}
             </li>
           ))}
         </ul>
          <p>czy alkoholowe: {drink.strAlcoholic}</p>
          <p>szkło: {drink.strGlass}</p>
          <ul>
            przepis:
             {drink.strInstructions
             .split('.')
             .map((instruction) =>
               instruction !== '' ? (
                 <li key={instruction}>{instruction}</li>
               ) : null
             )}
         </ul>
        </div>
        {isLoggedIn && <EditDrinkForm drink={drink} onChangedDetails={changeDetails}/>}
      </div>
    );
  }
  return <Whoops404 />;
}
