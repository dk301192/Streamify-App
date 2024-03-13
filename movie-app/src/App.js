import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import About from './Components/About';
import LoginForm from './Components/Login';
import Movies from './Components/Movies';
import NewSignUp from './Components/NewSignUp';
import Footer from './Components/Footer';

const App = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand text-warning" to="/">
              Streamify
            </NavLink>
            <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/movies">
                    Movies
                  </NavLink>
                </li>
              </ul>

              <ul className="navbar-nav">
                {!isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/newSign">
                        SignUp
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
               
                {isLoggedIn && (
                  <li className="nav-item">
                    <button className="nav-link text-warning">
                    {isLoggedIn ? `Welcome, ${username}!` : ''}
                    </button>
                  </li>
                )}
                 {isLoggedIn && (
                  <li className="nav-item">
                    <button className="nav-link " onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<Movies />} />
          <Route
            path="/newSign"
            element={<NewSignUp onLogin={(username) => handleLogin(username)} />}
          />
          <Route
            path="/login"
            element={<LoginForm onLogin={(username) => handleLogin(username)} />}
          />
        </Routes>
            <Footer/>

      </div>
    </Router>

  );
};

export default App;
