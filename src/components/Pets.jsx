import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/bootstrap.css'; 


class Pets extends Component{
  constructor(){
    super()

    this.state = {
      pets: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/getpets`)
      .then(res => {
        const pets = res.data;
        console.log(res)
        this.setState({ pets });
      })
  }
  
  render(){
    return (
      <div>
        <div className="text-center">
          <Link to={"/newPet"} className="btn btn-success">Agregar mascota</Link>
        </div>
        <br/>
        <div className="card-columns">
            { this.state.pets &&
            Array.from(this.state.pets).map(function(pet,key){
                return (
                  <div className="card mb-3" key={key}>
                    <h3 className="card-header">{pet.name + " - " + pet.race}</h3>
                    <div className="card-body">
                      <h5 className="card-title">{pet.specie}</h5>
                      <h6 className="card-subtitle text-muted">{" Dueño: " + pet.owner}</h6>
                    </div>
                    <div className="card-body">
                      <a href="#" className="card-link">Más información</a>
                    </div>
                  </div>
                )
              }
            )
            }
        </div>
        {
            this.state.pets.length === 0 && 
              <div className="alert alert-warning text-center">No se encuentran mascotas agregadas por el momento. <Link to={"/newPet"} className="btn btn-success add-person-link">Agrega una mascota</Link></div>
            }
        <div className="text-center">
          <Link to={"/"} className="btn btn-info">Volver</Link>
        </div>
        <br/>
      </div>
    )
  }
} 

export default Pets;
