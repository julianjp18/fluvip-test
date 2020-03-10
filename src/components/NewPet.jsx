import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/bootstrap.css';
import '../styles/newPet.css';

class NewPet extends Component {
  
  constructor(){
    super()

    this.state = {
      name: '',
      specie: '',
      race: '',
      owner: '',
      typeOfFood: '',
      deseases: '',
      cares: '',
      ownersList: [],
      raceslist: [],
      sucessMessage: ''
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/getusersList`)
      .then(res => {
        const ownersList = res.data;
        this.setState({ ownersList });
      })
    this.getRacesDogList()
    document.getElementById('selrace').removeAttribute('disabled');
  }

  getRacesDogList(){
    axios.get(`https://dog.ceo/api/breeds/list/all`)
    .then(res => {
      this.setState({ raceslist: Object.entries(res.data.message) });
    })
  }

  onNameChange = event => {
    this.setState({
        name: document.getElementById('txt-name').value,
    });
  };

  onRaceChange = event => {
    this.setState({
        race: document.getElementById('selrace').value,
    });
  };

  onOwnerChange = event => {
    this.setState({
        owner: document.getElementById('selowner').value,
    });
  };

  onTypeOfFoodChange = event => {
    this.setState({
        typeOfFood: document.getElementById('txt-food').value,
    });
  };

  onDiseasesChange = event => {
    this.setState({
        deseases: document.getElementById('txt-deseases').value,
    });
  };

  onCaresChange = event => {
    this.setState({
        cares: document.getElementById('txt-cares').value,
    });
  };
  

  onSpecieDogChange = event => {
    document.getElementById('selrace').removeAttribute('disabled');
    this.getRacesDogList()
    this.setState({
        specie: 'Perro',
    });
  };


  onSpecieCatChange = event => {
    //document.getElementById('selrace').removeAttribute('disabled');
    document.getElementById('selrace').disabled = 'true';
    this.setState({
        specie: 'Gato',
    });
  };

  onSpecieOtherChange = event => {
    this.setState({
        specie: 'Otro',
    });
    document.getElementById('selrace').disabled = 'true';
  };

  handleSubmit = event => {

    event.preventDefault();
 
    const formData = new FormData();
    
    formData.append('name', this.state.name);
    formData.append('race', this.state.race);
    formData.append('specie', this.state.specie);
    formData.append('owner', this.state.owner);
    formData.append('typeOfFood', this.state.typeOfFood);
    formData.append('deseases', this.state.deseases);
    formData.append('cares', this.state.cares);


    axios.post(`http://localhost:3001/addpet`, formData,{ headers:{'Content-Type': 'multipart/form-data', method: 'POST' }}).then(res => {
        console.log('yes',res)
        if(res.data === 'OK'){
          this.sucessMessage('Se agregó una nueva mascota correctamente')
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
        <h2>Nueva mascota</h2>
        {
          this.state.sucessMessage &&
        <div className="alert alert-success text-center">{this.state.sucessMessage}</div>
        }
        <form onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">
            <div className="form-group">
                <label for="txt-name">Nombre</label>
                <input type="text" className="form-control" name="txt-name" id="txt-name" placeholder="Nombre mascota" onChange={this.onNameChange} required/>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="txt-name">Especie</label>
                    <br/>  
                    <label className="radio-inline"><input type="radio" name="optspecie" id="optspecie1" value="perro" onChange={this.onSpecieDogChange} />   Perro</label>
                    <label className="radio-inline"><input type="radio" name="optspecie" id="optspecie2" value="gato" onChange={this.onSpecieCatChange} />   Gato</label>
                    <label className="radio-inline"><input type="radio" name="optspecie" id="optspecie3" value="otro" onChange={this.onSpecieOtherChange} />   Otro</label>
                </div>
                <div className="form-group col-md-6">
                    <label for="txt-last-name">Raza</label>
                    <select className="form-control" onChange={this.onRaceChange} id="selrace" name="selrace">
                        <option value="ninguno">Selecciona una opción</option>
                        { this.state.raceslist &&
                             (this.state.raceslist).map(function(race,key){
                                return (
                                <option value={race[0]} key={key}>{race[0]}</option>
                                )
                            }
                            )
                        }
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label for="txt-cellphone">Dueño</label>
                <select className="form-control" onChange={this.onOwnerChange} id="selowner" name="selowner" required>
                    <option value="ninguno">Selecciona una opción</option>
                    { this.state.ownersList &&
                            (this.state.ownersList).map(function(owner,key){
                                return (
                                <option value={owner[0]} key={key}>{owner[1].name}</option>
                                )
                        }
                        )
                    }
                </select>
            </div>
            <div className="form-group">
                <label for="txt-food">Tipo de comida</label>
                <input type="text" className="form-control" id="txt-food" name="txt-food" placeholder="Tipos de comida" onChange={this.onTypeOfFoodChange} required  />
            </div>
            <div className="form-group">
                <label for="txt-cellphone">Enfermedades o alergias</label>
                <textarea className="form-control" rows="5" id="txt-deseases" name="txt-deseases" onChange={this.onDiseasesChange}></textarea>
            </div>
            <div className="form-group">
                <label for="txt-cellphone">Cuidados especiales</label>
                <textarea className="form-control" rows="5" id="txt-cares" name="txt-cares" onChange={this.onCaresChange} ></textarea>
                
            </div>
            <button type="submit" className="btn btn-success">Registrar mascota</button>
        </form>
        <br/>
        <div className="text-center">
          <Link to={"/pets"} className="btn btn-info">Volver</Link>
        </div>
        <br/>
      </div>
    )
  }
}

export default NewPet;
