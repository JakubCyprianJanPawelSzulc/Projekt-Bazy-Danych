import React, { useState } from 'react';

export default function UploadDrinks() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert('Proszę wybrać plik JSON.');
    }
  };

  const handleUpload = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const drinksArray = JSON.parse(e.target.result);
        const drinksDocuments = drinksArray.map((drink) => {
            return {
                idDrink: drink.idDrink,
                strDrink: drink.strDrink,
                strAlcoholic: drink.strAlcoholic,
                strGlass: drink.strGlass,
                strInstructions: drink.strInstructions,
                strDrinkThumb: drink.strDrinkThumb,
                strRating: drink.strRating,
                strIngredients: drink.strIngredients,
                strMeasures: drink.strMeasures
            }
          });
        fetch('http://localhost:5000/drinks/upload', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(drinksDocuments),
        });
    };
    reader.readAsText(file);
  }
    


  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {file && (
        <button onClick={handleUpload}>
          Upload
        </button>
      )}
    </div>
  );
}
