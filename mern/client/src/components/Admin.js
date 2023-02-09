import React from 'react';
import DrinksList from './DrinksList.js';

export default function AdminPanel() {
  return (
    <div>
      <p className="admin-panel-indicator">PANEL ADMINISTRATORA</p>
      <DrinksList />
    </div>
  );
}
