import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/bootstrap.css'; 

class User extends Component {
  

    constructor(){
        super()

        this.state = {
            name: '',
            lastName: '',
            email: '',
            cellphone: '',
            sucessMessage: '',
            btnUpdateText: 'Habilitar actualizar información',
            btnOnSubmitText: 'Presiona el botón de arriba'
        }

        this.onNameChange = this.onNameChange.bind(this)
    }

    componentDidMount() {
        console.log(this.props.location.state.uidUser)
        const formData = new FormData();
        
        formData.append('uidUser', this.props.location.state.uidUser);

        axios.post(`http://localhost:3001/getuser`, formData,{ headers:{'Content-Type': 'multipart/form-data', method: 'POST' }})
        .then(res => {
            this.setState({
                name: res.data.name,
                lastName: res.data.lastName,
                email: res.data.email,
                cellphone: res.data.cellphone
            })
            console.log(res)
        })
    }

    onNameChange(event){
        this.setState({
            name: event.target.value,
        });
    }

    onLastNameChange = event => {
        this.setState({
            lastName: event.target.value,
        });
    };

    onEmailChange = event => {
        this.setState({
            email: event.target.value,
        });
    };

    onCellphoneChange = event => {
        this.setState({
            cellphone: event.target.value,
        });
    };

    onClickOnSubmit = event => {
        if(this.state.btnUpdateText === 'Habilitar actualizar información'){
            document.getElementById('txt-name').removeAttribute('disabled')
            document.getElementById('txt-last-name').removeAttribute('disabled')
            document.getElementById('txt-email').removeAttribute('disabled')
            document.getElementById('txt-cellphone').removeAttribute('disabled')
            document.getElementById('btn-submit').removeAttribute('disabled')
            
            this.setState({
                btnUpdateText: 'Ocultar actualizar información',
                btnOnSubmitText: 'Actualizar información'
            });
        }else{
            document.getElementById('txt-name').setAttribute('disabled', 'true')
            document.getElementById('txt-last-name').setAttribute('disabled', 'true')
            document.getElementById('txt-email').setAttribute('disabled', 'true')
            document.getElementById('txt-cellphone').setAttribute('disabled', 'true')
            document.getElementById('btn-submit').setAttribute('disabled', 'true')

            this.setState({
                btnUpdateText: 'Habilitar actualizar información',
                btnOnSubmitText: 'Presiona el botón de arriba'
            });
        }
        
    };

    handleSubmit = event => {

        event.preventDefault();
    
        const formData = new FormData();

        formData.append('name', this.state.name);
        formData.append('lastName', this.state.lastName);
        formData.append('email', this.state.email);
        formData.append('cellphone', this.state.cellphone);
        formData.append('uidUser', this.props.location.state.uidUser)
       
        axios.post(`http://localhost:3001/updateuser`, formData,{ headers:{'Content-Type': 'multipart/form-data', method: 'POST' }}).then(res => {
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
            <h2>Visualizar perfil de <b>{ this.state.name }</b></h2>
            <div className="text-center">
                <button onClick={this.onClickOnSubmit} class="btn btn-warning">{this.state.btnUpdateText}</button>
            </div>
            <br />
            {
            this.state.sucessMessage &&
            <div className="alert alert-success text-center">{this.state.sucessMessage}</div>
            }
            <br />
            <form onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">
                <div class="form-row">
                    <div className="form-group col-md-6">
                    <label for="txt-name">Nombre</label>
                    <input type="text" className="form-control" name="txt-name" id="txt-name" placeholder="Nombre dueño" onChange={this.onNameChange} value={ this.state.name } disabled required/>
                    </div>
                    <div className="form-group col-md-6">
                    <label for="txt-last-name">Apellido</label>
                    <input type="text" className="form-control" id="txt-last-name" name="txt-last-name" placeholder="Apellido dueño" onChange={this.onLastNameChange} value={ this.state.lastName } disabled required/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="txt-email">Correo electrónico</label>
                    <input type="email" className="form-control" id="txt-email" name="txt-email" placeholder="Correo electrónico" value={ this.state.email } disabled required title="Por favor ingrese un correo electrónico válido" onChange={this.onEmailChange}/>
                </div>
                <div className="form-group">
                    <label for="txt-cellphone">Celular</label>
                    <input type="tel" className="form-control" id="txt-cellphone" name="txt-cellphone" placeholder="Ej: 3123456789" pattern="[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}" onChange={this.onCellphoneChange} value={ this.state.cellphone } disabled required  />
                </div>
                <button type="submit" className="btn btn-success" id="btn-submit" disabled>{this.state.btnOnSubmitText}</button>
            </form>
            <br/>
            <div className="text-center">
            <Link to={"/users"} className="btn btn-info">Volver</Link>
            </div>
            <br/>
        </div>
        )
    }
}

export default User;
