import { useDispatch } from 'react-redux';
import { login, logout } from '../actions/adminActions.js';
import React from 'react';
import { useSelector } from 'react-redux';

export default function AdminButton() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  function handleClick() {
    dispatch(login());
  }

  function handleLogoutClick() {
    dispatch(logout());
  }

  return (
    <div className="admin-buttons">
      <button onClick={handleClick}>
        oświadczam, że jestem administratorem
      </button>
      {isLoggedIn && (
        <button onClick={handleLogoutClick}>
          jednak nie jestem administratorem
        </button>
      )}
    </div>
  );
}
