import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/bootstrap.css';

class NewUser extends Component {
  
  constructor(){
    super()

    this.state = {
      name: '',
      lastName: '',
      email: '',
      cellphone: '',
      sucessMessage: ''
    }
  }

  onNameChange = event => {
    this.setState({
        name: document.getElementById('txt-name').value,
    });
  };

  onLastNameChange = event => {
    this.setState({
        lastName: document.getElementById('txt-last-name').value,
    });
  };

  onEmailChange = event => {
    this.setState({
        email: document.getElementById('txt-email').value,
    });
  };

  onCellphoneChange = event => {
    this.setState({
        cellphone: document.getElementById('txt-cellphone').value,
    });
  };

  handleSubmit = event => {

    event.preventDefault();
 
    const formData = new FormData();

    formData.append('name', this.state.name);
    formData.append('lastname', this.state.lastName);
    formData.append('email', this.state.email);
    formData.append('cellphone', this.state.cellphone);
    //https://hallojack.co/landing-convert http://localhost:3001/landing-convert application/x-www-form-urlencoded
    axios.post(`http://localhost:3001/adduser`, formData,{ headers:{'Content-Type': 'multipart/form-data', method: 'POST' }}).then(res => {
        console.log('yes',res)
        if(res.data === 'OK'){
          this.sucessMessage('Se agregó un nuevo dueño correctamente')
        }
      }).catch(err => {
        console.log(err)
        this.errorMessage = '¡OH NO! Ocurrió un error.'
      })
  }

  sucessMessage(sucessMessage){
    this.setState({sucessMessage})
  }
  
  render(){
    return (
      <div>
        <h2>Nuevo dueño</h2>
        {
          this.state.sucessMessage &&
        <div className="alert alert-success text-center">{this.state.sucessMessage}</div>
        }
        <form onSubmit={this.handleSubmit} method="POST" enctype="multipart/form-data">
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="txt-name">Nombre</label>
                <input type="text" class="form-control" name="txt-name" id="txt-name" placeholder="Nombre dueño" onChange={this.onNameChange} required/>
                </div>
                <div class="form-group col-md-6">
                <label for="txt-last-name">Apellido</label>
                <input type="text" class="form-control" id="txt-last-name" name="txt-last-name" placeholder="Apellido dueño" onChange={this.onLastNameChange} required/>
                </div>
            </div>
            <div class="form-group">
                <label for="txt-email">Correo electrónico</label>
                <input type="email" class="form-control" id="txt-email" name="txt-email" placeholder="Correo electrónico" required title="Por favor ingrese un correo electrónico válido" onChange={this.onEmailChange}/>
            </div>
            <div class="form-group">
                <label for="txt-cellphone">Celular</label>
                <input type="tel" class="form-control" id="txt-cellphone" name="txt-cellphone" placeholder="Ej: 3123456789" pattern="[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}" onChange={this.onCellphoneChange} required  />
            </div>
            <button type="submit" class="btn btn-success">Registrar dueño</button>
        </form>
        <br/>
        <div className="text-center">
          <Link to={"/"} className="btn btn-info">Volver</Link>
        </div>
        <br/>
      </div>
    )
  }
}

export default NewUser;
