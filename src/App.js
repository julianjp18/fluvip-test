import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './styles/bootstrap.css'; 
import './App.css';
import Pets from './components/Pets';
import Users from './components/Users';
import NewUser from './components/NewUser';
import NewPet from './components/NewPet';
import User from './components/User';
import UserPets from './components/UserPets';
import Pet from './components/Pet';


const homeOptions = () => (
  <div className="container">
    <p className="text-center">Selecciona alguna de las dos opciones:</p> 
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-3">
        <Link to={'/pets'}>
          <div className="card text-white bg-success mb-3">
            <h3 className="card-header text-center">Mascotas</h3>
            <img className="image-card" src="https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Pets"></img>
              <div className="card-body">
                <p className="card-text">Visualiza a todas las mascotas de Fluvip Pet</p>
              </div>
          </div>  
        </Link>
      </div>
      <div className="col-md-3">
        <Link to={'/users'}>
          <div className="card text-white bg-dark mb-3">
            <h3 className="card-header text-center">Dueños</h3>
            <img className="image-card" src="https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Users"></img>
            <div className="card-body">
              <p className="card-text">Visualiza a todos los dueños de mascotas de Fluvip Pet</p>
            </div>
          </div>
        </Link>
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
            <h1 className="text-center">Fluvip Pet</h1>
            <br/>
            <Switch>
            
                <Route exact path='/' component={ homeOptions } />
                <Route exact path='/users' component={ Users } />
                <Route path='/pets' component={ Pets } />
                <Route path='/newUser' component={ NewUser } />
                <Route path='/newPet' component={ NewPet } />
                <Route path='/user' component={ User } />
                <Route path='/userPets' component={ UserPets } />
                <Route path='/pet' component={ Pet } />
            </Switch>
          </div>
      </Router>
  );
}

export default App;
