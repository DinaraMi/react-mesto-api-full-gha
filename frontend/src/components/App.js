import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeletePopup from './DeletePopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as authentication from '../utils/authentication.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    api.getUserInformation()
      .then((dataUser) => {
        setCurrentUser(dataUser)
      })
      .catch((error) => {
        console.log(error)
      })
    api.getInitialCards()
      .then((dataCards) => {
        setCards(dataCards);
      })
      .catch(console.error);
  }, []);
  const openImagePopup = () => {
    setImagePopupOpen(true);
  };
  const closeImagePopup = () => {
    setImagePopupOpen(false);
  };
  const openDeletePopup = () => {
    setDeletePopupOpen(true);
  }
  const closeDeletePopup = () => {
    setDeletePopupOpen(false);
  }
  const openInfoTooltip = () => {
    setInfoTooltipOpen(true);
  };
  const closeInfoTooltip = () => {
    setInfoTooltipOpen(false);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleRegisterSuccess = () => {
    setIsRegistrationSuccessful(true);
    openInfoTooltip();
  };
  const handleRegisterFailure = () => {
    setIsRegistrationSuccessful(false);
    openInfoTooltip();
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    openImagePopup();
  };
  const handleCardDelete = (cardId) => {
    setDeleteCardId(cardId);
    openDeletePopup();
  }
  const handleAllClosePopup = () => {
    setSelectedCard(null);
  };
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    handleAllClosePopup();
  };
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    } else {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch(console.error);
    }
  };
  const handleDeleteSubmit = () => {
    setLoading(true);
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards((prevCards) => prevCards.filter((card) => card._id !== deleteCardId));
        setDeletePopupOpen(false);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }
  const handleUpdateUser = (dataUser) => {
    setLoading(true);
    api.editUserInformation(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }
  const handleUpdateAvatar = (dataUser) => {
    setLoading(true);
    api.editUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }
  const handleAddPlaceSubmit = (dataCard) => {
    setLoading(true);
    api.addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });;
  }
  const handleRegister = (email, password) => {
    setLoading(true);
    authentication.register(email, password)
      .then(() => {
        setIsRegistrationSuccessful(true);
        openInfoTooltip();
        navigate('/sign-in');
      })
      .catch(() => {
        setIsRegistrationSuccessful(false);
        openInfoTooltip();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleLogin = (email, password) => {
    setLoading(true);
    authentication.authorize(email, password)
      .then((data) => {
        if (data && data.token) {
          authentication.setToken(data.token);
          setLoggedIn(true);
          navigate('/');
        } else if (data && data.statusCode === 401) {
          console.log('Неверные email или пароль');
        } else {
          console.log('Что-то пошло не так!');
        }
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (loggedIn) {
      const token = authentication.getToken();
      if (token) {
        authentication.checkinValidityToken(token)
          .then((data) => {
            setUserEmail(data);
          })
          .catch(error => {
            console.log(error);
            setUserEmail('');
          });
      }
    }
  }, [loggedIn]);
  const handleAutoLogin = (token) => {
    setLoading(true);
    localStorage.setItem('token', token);
    setLoggedIn(true);
    navigate('/');
    setLoading(false);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleAutoLogin(token);
    }
    setLoading(true);
    const authenticationToken = authentication.getToken();
    if (authenticationToken) {
      authentication.checkinValidityToken(authenticationToken)
        .then((data) => {
          setLoggedIn(true);
          setUserEmail(data);
        })
        .catch(error => {
          console.log(error);
          setLoggedIn(false);
          setUserEmail('');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  }, []);
  const handleLogout = () => {
    authentication.removeToken();
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in');
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header isLoggedIn={loggedIn} userEmail={userEmail} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={
              <ProtectedRouteElement
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route path="/sign-up" element={<Register onRegister={handleRegister} onTooltipSuccess={handleRegisterSuccess} onRegisterFailure={handleRegisterFailure}
            />} />
          </Routes>
          <Footer />
        </div>
        <div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          {isImagePopupOpen && selectedCard && (<ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeImagePopup}
          />
          )}
          <DeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeDeletePopup}
            onSubmit={handleDeleteSubmit}
            isLoading={isLoading}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeInfoTooltip}
            successfully={isRegistrationSuccessful}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;