import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/bootstrap.css'; 
import '../styles/users.css';

class Users extends Component {
  
  constructor(){
    super()

    this.state = {
      persons: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/getusers`)
      .then(res => {
        const persons = res.data;
        console.log(res)
        this.setState({ persons });
      })
  }
  
  render(){
    return (
      <div>
        <div className="text-center">
          <Link to={"/newUser"} className="btn btn-success">Agregar dueño</Link>
        </div>
        <br/>
        <div className="card-columns">
            { this.state.persons &&
            Array.from(this.state.persons).map(function(person,key){
                return (
                  <div className="card mb-3" key={key}>
                    <h3 className="card-header">{person.name + " " + person.lastName}</h3>
                    <div className="card-body">
                      <h5 className="card-title">{person.cellphone}</h5>
                      <h6 className="card-subtitle text-muted">{person.email}</h6>
                    </div>
                    <div className="card-body">
                      <a href="#" className="card-link">Actualizar información</a>
                      <a href="#" className="card-link">Ver mascotas</a>
                    </div>
                  </div>
                )
              }
            )
            }
        </div>
        {
            this.state.persons.length === 0 && 
              <div className="alert alert-warning text-center">No se encuentran dueños agregados por el momento. <Link to={"/newUser"} className="btn btn-success add-person-link">Agrega un dueño</Link></div>
            }
        <div className="text-center">
          <Link to={"/"} className="btn btn-info">Volver</Link>
        </div>
        <br/>
      </div>
    )
  }
}

export default Users;
