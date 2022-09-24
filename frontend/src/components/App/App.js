import React from "react";
import {Route, Switch, useRouteMatch, useHistory} from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import AUTH_SUCCESS_TEXTS from "../../constants/auth-success-texts";
import PROFILE_UPDATE_SUCCESS_TEXT from "../../constants/profile-update-success-text";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import Menu from "../Menu/Menu";
import NotificationModal from "../NotificationModal/NotificationModal";
import Storage from "../../utils/storage";

function App() {
  const [isLoginDataLoading, setIsLoginDataLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const [notificationModalIsOpen, setNotificationModalIsOpen] =
    React.useState(false);

  const [notificationText, setNotificationText] = React.useState("");
  const [currentUserData, setCurrentUserData] = React.useState({});
  const [isLoadingSignin, setIsLoadingSignin] = React.useState(false);
  const [isLoadingSignup, setIsLoadingSignup] = React.useState(false);
  const [isLoadingUpdateCurrentUser, setIsLoadingUpdateCurrentUser] =
    React.useState(false);

  const [authResStatus, setAuthResStatus] = React.useState(null);
  const [tokenAuthResStatus, setTokenAuthResStatus] = React.useState(null);
  const [registrationResStatus, setRegistrationResStatus] =
    React.useState(null);
  const [updateCurrentUserResStatus, setUpdateCurrentUserResStatus] =
    React.useState(null);

  const history = useHistory();

  const handleSignup = (data) => {
    setIsLoadingSignup(true);
    mainApi
      .register(data)
      .then((res) => {
        setRegistrationResStatus(res.status);
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        setRegistrationResStatus(err);
      })
      .finally(() => {
        setIsLoadingSignup(false);
      });
  };

  const handleSignin = (data) => {
    setIsLoadingSignin(true);
    mainApi
      .authorize(data)
      .then((status) => {
        setAuthResStatus(status);
        setLoggedIn(true);
        history.push("/movies");
        setOpenNotificationModal();
        setNotificationText(AUTH_SUCCESS_TEXTS.BASE_TEXT);
      })
      .catch((err) => {
        setAuthResStatus(err);
      })
      .finally(() => {
        setIsLoadingSignin(false);
      });
  };

  const handleSignOut = (evt) => {
    evt.preventDefault();
    setLoggedIn(false);
    setCurrentUserData({});
    localStorage.clear();
    history.push("/");
  };

  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          setTokenAuthResStatus(res.status);
          setCurrentUserData(res.data);
          setLoggedIn(true);
          setIsLoginDataLoading(true);
        })
        .catch((err) => {
          setTokenAuthResStatus(err);

        });
    } else {
      setIsLoginDataLoading(true);
    }
  };

  const handleUpdateCurrenUser = (data) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoadingUpdateCurrentUser(true);
      mainApi
        .updateCurrentUserProfile(data, token)
        .then((res) => {
          setCurrentUserData(res.data);
          setUpdateCurrentUserResStatus(res.status);
          localStorage.setItem("currentUserData", JSON.stringify(res.data));
          setOpenNotificationModal();
          setNotificationText(PROFILE_UPDATE_SUCCESS_TEXT.BASE_TEXT);
        })
        .catch((err) => {
          setUpdateCurrentUserResStatus(err);
        })
        .finally(() => {
          setIsLoadingUpdateCurrentUser(false);
        });
    }
  };

  const storage = new Storage();

  React.useEffect(() => {
    checkToken();
  }, [loggedIn]);

  const setOpenMenu = () => {
    setMenuIsOpen(true);
  };

  const setCloseMenu = () => {
    setMenuIsOpen(false);
  };

  const setOpenNotificationModal = () => {
    setNotificationModalIsOpen(true);
  };

  const setCloseNotificationModal = () => {
    setNotificationText("");
    setNotificationModalIsOpen(false);
  };

  const handleErrorWithNotification = (err) => {
    setOpenNotificationModal();
    setNotificationText(err);
  }

  const exclusionRoutesPathsAuthArray = ["/signin", "/signup"];

  const exclusionRoutesPathsArrayFooter = ["/signin", "/signup", "/profile"];

  return (
    <CurrentUserContext.Provider value={currentUserData}>
      <div className="app">
        {useRouteMatch(exclusionRoutesPathsAuthArray) ? null : (
          <Header loggedIn={loggedIn} onOpenMenu={setOpenMenu}/>
        )}

        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/signup">
            <Register
              isLoggedIn={loggedIn}
              onSignup={handleSignup}
              regResStatus={registrationResStatus}
              authResStatus={authResStatus}
              isLoadingSignup={
                isLoadingSignup || isLoadingSignin
              }
            />
          </Route>
          <Route path="/signin">
            <Login
              isLoggedIn={loggedIn}
              onSignin={handleSignin}
              authResStatus={authResStatus}
              tokenResStatus={tokenAuthResStatus}
              isLoadingSignin={
                isLoadingSignup || isLoadingSignin
              }
            />
          </Route>
          {isLoginDataLoading && (
            <ProtectedRoute
              path="/movies"
              redirectTo="/"
              loggedIn={loggedIn}
              component={Movies}
              storage={storage}
              onError={handleErrorWithNotification}
            />
          )}
          {isLoginDataLoading && (
            <ProtectedRoute
              path="/saved-movies"
              redirectTo="/"
              loggedIn={loggedIn}
              component={SavedMovies}
              storage={storage}
            />
          )}
          {isLoginDataLoading && (
            <ProtectedRoute
              path="/profile"
              redirectTo="/"
              loggedIn={loggedIn}
              onSignOut={handleSignOut}
              onUpdateCurrentUser={handleUpdateCurrenUser}
              isLoadingUpdateCurrentUser={isLoadingUpdateCurrentUser}
              updUserResStatus={updateCurrentUserResStatus}
              component={Profile}
            />
          )}
          <Route path="*">
            {!isLoginDataLoading && <Preloader/>}
            {isLoginDataLoading && <NotFound/>}
          </Route>
        </Switch>
        {useRouteMatch(exclusionRoutesPathsArrayFooter) ? null : <Footer/>}
        {menuIsOpen && <Menu isOpen={menuIsOpen} onClose={setCloseMenu}/>}
        {notificationModalIsOpen && (
          <NotificationModal
            isOpen={notificationModalIsOpen}
            onClose={setCloseNotificationModal}
            notificationText={notificationText}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
