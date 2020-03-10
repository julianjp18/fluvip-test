import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/bootstrap.css'; 

class UserPets extends Component {
  
  constructor(){
    super()

    this.state = {
      pets: []
    }
  }

  componentDidMount() {
    console.log(this.props.location.state.uidUser)
    const formData = new FormData();
    
    formData.append('uidUser', this.props.location.state.uidUser);

    axios.post(`http://localhost:3001/getuserpets`, formData,{ headers:{'Content-Type': 'multipart/form-data', method: 'POST' }})
    .then(res => {
        console.log(res)
        if(res.data === 'No matching documents.'){

        }else{
            this.setState({
                pets: res.data
            })
        }

    })
  }
  
  render(){
    return (
      <div>
        <h2>Visualizar mascotas de {}</h2>
        <div className="card-columns">
            { this.state.pets &&
            Array.from(this.state.pets).map(function(pet,key){
                return (
                  <div className="card mb-3" key={key}>
                    <h3 className="card-header">{pet[1].name}</h3>
                    <div className="card-body">
                      <h5 className="card-title">{pet[1].race}</h5>
                      <h6 className="card-subtitle text-muted">{pet[1].specie}</h6>
                    </div>
                    <div className="card-body">
                      <Link className="card-link" to={{
                          pathname: "/Pet",
                          state: { uidPet: pet[0] }
                        }}>Ver mascota</Link>
                    </div>
                  </div>
                )
              }
            )
            }
        </div>
        {
            this.state.pets.length === 0 && 
              <div className="alert alert-warning text-center">No se encuentran mascotas asociadas a esta persona. <Link to={"/newPet"} className="btn btn-success add-person-link">Agrega una mascota</Link></div>
            }
        <div className="text-center">
          <Link to={"/users"} className="btn btn-info">Volver</Link>
        </div>
        <br/>
      </div>
    )
  }
}

export default UserPets;
