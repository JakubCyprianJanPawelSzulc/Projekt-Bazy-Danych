import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DownloadButton from './DownloadButton.js';
import ScrollToCommentsButton from './ScrollToCommentsButton.js';

export default function Header(refreshDrinks) {
  const [drinks, setDrinks] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    fetch('http://localhost:5000/drinks')
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data);
        setLoaded(true);
      });
  }, [refreshDrinks]);


  return (
    <div className="header">
      <h1 className="neon">PIWO WINO WÓDKA</h1>
      <div className="header-buttons">
        <button className="header-button">
          <Link to={`/`}>🏠 strona główna</Link>
        </button>
        <button className="header-button">
          <Link to={`statistics`}>📊 statystyki</Link>
        </button>
        <div className="header-button">
          <ScrollToCommentsButton />
        </div>
        <div className="header-download-button">
          {loaded && <DownloadButton data={drinks} typeOfData="wszystkie przepisy" />}
        </div>
      </div>
    </div>
  );
}
