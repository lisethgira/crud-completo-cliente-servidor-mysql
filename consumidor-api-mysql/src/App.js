import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nombreplato: '',
      descripcion: '',
      precio: '',
      id: '0',
      platos: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addPlato = this.addPlato.bind(this);
  }
  // métodos
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addPlato(e) {
    e.preventDefault();
    if (this.state.id) {
      fetch(`http://localhost:3000/${this.state.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nombreplato: this.state.nombreplato,
          descripcion: this.state.descripcion,
          precio: this.state.precio
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ id: '0', nombreplato: '', descripcion: '', precio: '' });
          toast.success("Updated/Saved", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000
          })
          this.refreshPlato();
        });

    }
    else {
      fetch(`http://localhost:3000`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ nombreplato: '', descripcion: '', precio: '' });
          this.refreshPlato();
        });
      //this.refreshEmployee();
    }
  }

  deletePlato(id) {
    if (window.confirm('¿Estás seguro de eliminiar este plato?')) {
      fetch(`http://localhost:3000/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          toast.success("Plato borrado con éxito", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 1000
          })
          this.refreshPlato();
        });
    }
  }

  editPlato(id) {
    fetch(`http://localhost:3000/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          nombreplato: data.nombreplato,
          descripcion: data.descripcion,
          precio: data.precio,
          id: data.id
        });
      });
  }

  refreshPlato() {
    const apiUrl = 'http://localhost:3000';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ platos: data });
        console.log(this.state.platos);
      })
  }
  componentDidMount() { // cuando cargue sus componentes
    this.refreshPlato();
  }
  // renderizar
  render() {
    return (
      <div>
        {/* Carrousel */}
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "200px",
            backgroundImage:
              "url(https://estaticos-cdn.elperiodico.com/clip/8167edb8-cfa1-4a34-ab2e-3e458cec6dd6_alta-libre-aspect-ratio_default_0.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
        </div>
        {/* NAVIGATION */}
        <nav className="bg-info"><h1 Style="margin-left:270px">Consumidor Api Mysql - CRUD - Restaurante</h1></nav>

        {/* Formulario*/}

        <div className="container" style={{ marginBottom: '30px' }}> </div>
        <div className="container">
          <div className="card">
            <div className="card-content" style={{ backgroundColor: 'black', alignItems: 'center' }}>
              <form onSubmit={this.addPlato}>
                <div className="row" style={{ marginTop: '5px' }}>
                  <h3 style={{ textAlign: "center", color: "blue" }} >Comanda</h3>
                  <div className="input-field col s12">
                    <input type="text" name="nombreplato" className="form-control "
                      onChange={this.handleChange} value={this.state.nombreplato}
                      placeholder="Nombre Plato" autoFocus
                    ></input>
                  </div>
                </div>
                <div className="row" style={{ marginTop: '5px' }}>
                  <div className="input-field col s12">
                    <input type="text" name="descripcion" className="form-control"
                      onChange={this.handleChange} value={this.state.descripcion}
                      placeholder="Descripción"></input>
                  </div>
                </div>
                <div className="row" style={{ marginTop: '5px' }}>
                  <div className="input-field col s12">
                    <input type="number" name="precio" className="form-control"
                      onChange={this.handleChange} value={this.state.precio}
                      placeholder="Precio"></input>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
        {/* Fin formulario*/}
        <div className="container">
          <div className="row bg-info card card-content" style={{ marginTop: '20px' }} >
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre Plato</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.platos.map(plato => {
                    return (
                      <tr key={plato.id}>
                        <td>{plato.id}</td>
                        <td>{plato.nombreplato}</td>
                        <td>{plato.descripcion}</td>
                        <td>{plato.precio}</td>
                        <td>
                          <button onClick={() => this.editPlato(plato.id)} className="btn btn-warning" style={{ margin: '4px' }}>
                            <i className="far fa-edit">Edit</i>
                          </button>
                          <button onClick={() => this.deletePlato(plato.id)} className="btn btn-danger" style={{ margin: '4px' }}>
                            <i className="fas fa-trash-alt">Delete</i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }

}

export default App;