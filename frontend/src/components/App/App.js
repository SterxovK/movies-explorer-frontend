import React from 'react';
import { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header.js';
import Main from '../Main/Main';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const { pathname } = useLocation();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies' ||
        pathname === '/profile' ? (
          <Header />
        ) : (
          ''
        )}

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/movies">
            <Movies />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/sign-in">
            <Login />
          </Route>

          <Route path="/sign-up">
            <Register />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies' ? (
          <Footer />
        ) : (
          ''
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
