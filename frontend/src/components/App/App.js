import React from 'react';
import {
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies.js';
import Menu from '../Menu/Menu';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  const { pathname } = useLocation();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);


    const setOpenMenu = () => {
      setMenuIsOpen(true);
    };
    
    const setCloseMenu = () => {
      setMenuIsOpen(false);
    };


  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/movies">
          <Movies onOpenMenu={setOpenMenu} />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies onOpenMenu={setOpenMenu} />
        </Route>

        <Route path="/profile">
          <Profile onOpenMenu={setOpenMenu} />
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

      {menuIsOpen && <Menu isOpen={menuIsOpen} onClose={setCloseMenu} />}
    </div>
  );
}

export default App;
