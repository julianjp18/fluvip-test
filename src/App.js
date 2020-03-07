import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './styles/bootstrap.css'; 
import './App.css';
import Pets from './components/Pets';
import Users from './components/Users';

const homeOptions = () => (
  <div className="container">
    <p>Selecciona alguna de las dos opciones:</p> 
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-3">
        <div className="card text-white bg-success mb-3">
          <h3 className="card-header">Mascotas</h3>
          <img className="image-card" src="https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Card image"></img>
            <div class="card-body">
              <p class="card-text">Visualiza a todos las mascotas de Fluvip Pet</p>
            </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-dark mb-3">
          <h3 className="card-header">Dueños</h3>
          <img className="image-card" src="https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Users photo"></img>
          <div class="card-body">
            <p class="card-text">Visualiza a todos los dueños de mascotas de Fluvip Pet</p>
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={'/'} className="navbar-brand">Fluvip Pet</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/users'} className="nav-link">Dueños</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/pets'} className="nav-link">Mascotas</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <br/>
            <h2 className="text-center">Fluvip Pet</h2>
            <br/>
            <Switch>
                <Route exact path='/' component={ homeOptions } />
                <Route exact path='/users' component={ Users } />
                <Route path='/pets' component={ Pets } />
            </Switch>
          </div>
      </Router>
  );
}

export default App;
