import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Whoops404() {
  let location = useLocation();
  return (
    <div className="whoops404">
      <h1>Nie znaleziono: '{location.pathname}'</h1>
    </div>
  );
}
