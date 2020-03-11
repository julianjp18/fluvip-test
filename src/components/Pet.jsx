import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/bootstrap.css';

class Pet extends Component {
  
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
      ownerName: '',
      raceslist: [],
      sucessMessage: '',
      btnUpdateText: 'Habilitar actualizar información',
      btnOnSubmitText: 'Presiona el botón de arriba'
    }
  }

  componentDidMount() {
    
    const formData = new FormData();
    
    formData.append('uidPet', this.props.location.state.uidPet);

    axios.post(`http://localhost:3001/getpet`, formData,{ headers:{'Content-Type': 'multipart/form-data', method: 'POST' }})
    .then(res => {
        this.setState({
            name: res.data.name,
            specie: res.data.specie,
            race: res.data.race,
            owner: res.data.owner,
            typeOfFood: res.data.typeOfFood,
            deseases: res.data.deseases,
            cares: res.data.cares
        })

        const formData2 = new FormData();
        formData2.append('uidUser', res.data.owner);

        axios.post(`http://localhost:3001/getuser`, formData2,{ headers:{'Content-Type': 'multipart/form-data', method: 'POST' }})
        .then(res => {
          
          this.setState({ ownerName: res.data.name + ' ' + res.data.lastName });
        })

        if(this.state.specie.toLowerCase() === 'perro'){
          document.getElementById('optspecie1').setAttribute('checked','true')
          document.getElementById('selrace').setAttribute('disabled','true')
        }
        if(this.state.specie.toLowerCase() === 'gato'){
          document.getElementById('optspecie2').setAttribute('checked','true')
        }
        if(this.state.specie.toLowerCase() === 'otro'){
          document.getElementById('optspecie3').setAttribute('checked','true')
        }
        document.getElementById('optspecie1').setAttribute('disabled','true')
        document.getElementById('optspecie2').setAttribute('disabled','true')
        document.getElementById('optspecie3').setAttribute('disabled','true')
    })

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
        name: event.target.value,
    });
  };

  onRaceChange = event => {
    this.setState({
        race: event.target.value,
    });
  };

  onOwnerChange = event => {
    this.setState({
        owner: event.target.value,
    });
  };

  onTypeOfFoodChange = event => {
    this.setState({
        typeOfFood: event.target.value,
    });
  };

  onDiseasesChange = event => {
    this.setState({
        deseases: event.target.value,
    });
  };

  onCaresChange = event => {
    this.setState({
        cares: event.target.value,
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

  onClickOnSubmit = event => {
    if(this.state.btnUpdateText === 'Habilitar actualizar información'){
        document.getElementById('txt-name').removeAttribute('disabled')
        document.getElementById('selrace').removeAttribute('disabled')
        document.getElementById('selowner').removeAttribute('disabled')
        document.getElementById('txt-food').removeAttribute('disabled')
        document.getElementById('txt-deseases').removeAttribute('disabled')
        document.getElementById('txt-cares').removeAttribute('disabled')
        document.getElementById('btn-submit').removeAttribute('disabled')
        document.getElementById('optspecie1').removeAttribute('disabled')
        document.getElementById('optspecie2').removeAttribute('disabled')
        document.getElementById('optspecie3').removeAttribute('disabled')

        this.setState({
            btnUpdateText: 'Ocultar actualizar información',
            btnOnSubmitText: 'Actualizar información'
        });
    }else{
        document.getElementById('txt-name').setAttribute('disabled', 'true')
        document.getElementById('selrace').setAttribute('disabled', 'true')
        document.getElementById('selowner').setAttribute('disabled', 'true')
        document.getElementById('txt-food').setAttribute('disabled', 'true')
        document.getElementById('txt-deseases').setAttribute('disabled', 'true')
        document.getElementById('txt-cares').setAttribute('disabled', 'true')
        document.getElementById('btn-submit').setAttribute('disabled', 'true')

        document.getElementById('optspecie1').setAttribute('disabled','true')
        document.getElementById('optspecie2').setAttribute('disabled','true')
        document.getElementById('optspecie3').setAttribute('disabled','true')

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
    formData.append('race', this.state.race);
    formData.append('specie', this.state.specie);
    formData.append('owner', this.state.owner);
    formData.append('typeOfFood', this.state.typeOfFood);
    formData.append('deseases', this.state.deseases);
    formData.append('cares', this.state.cares);
    formData.append('uidPet', this.props.location.state.uidPet);


    axios.post(`http://localhost:3001/updatepet`, formData,{ headers:{'Content-Type': 'multipart/form-data', method: 'POST' }}).then(res => {
        console.log('yes',res)
        if(res.data === 'OK'){
          this.sucessMessage('Se actualizó la mascota correctamente')
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
        <h2>Visualizar mascota de { this.state.ownerName }</h2>
        <div className="text-center">
            <button onClick={this.onClickOnSubmit} class="btn btn-warning">{this.state.btnUpdateText}</button>
        </div>
        <br />
        {
          this.state.sucessMessage &&
        <div className="alert alert-success text-center">{this.state.sucessMessage}</div>
        }
        <form onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">
            <div className="form-group">
                <label for="txt-name">Nombre</label>
                <input type="text" className="form-control" name="txt-name" id="txt-name" placeholder="Nombre mascota" onChange={this.onNameChange} value={this.state.name} disabled required/>
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
                    <label for="selrace">Raza</label>
                    <select className="form-control" onChange={this.onRaceChange} id="selrace" name="selrace" disabled>
                        <option value={this.state.race}>{this.state.race}</option>
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
                <select className="form-control" onChange={this.onOwnerChange} id="selowner" name="selowner" required disabled>
                    <option value={this.state.owner}>{this.state.ownerName}</option>
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
                <input type="text" className="form-control" id="txt-food" name="txt-food" placeholder="Tipos de comida" onChange={this.onTypeOfFoodChange} value={this.state.typeOfFood} required disabled />
            </div>
            <div className="form-group">
                <label for="txt-cellphone">Enfermedades o alergias</label>
                <textarea className="form-control" rows="5" id="txt-deseases" name="txt-deseases" onChange={this.onDiseasesChange} value={this.state.deseases} disabled></textarea>
            </div>
            <div className="form-group">
                <label for="txt-cellphone">Cuidados especiales</label>
                <textarea className="form-control" rows="5" id="txt-cares" name="txt-cares" onChange={this.onCaresChange} value={this.state.cares} disabled></textarea>
                
            </div>
                  <button type="submit" className="btn btn-success" id="btn-submit">{ this.state.btnOnSubmitText }</button>
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

export default Pet;
