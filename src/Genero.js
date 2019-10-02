import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Table, Button, Alert } from 'reactstrap'
import Axios from 'axios'


function Genero() {

  const [genero, setGenero] = useState([]);

  useEffect(() => {
    Axios.get('/api/genres').then(res => {
      setGenero(res.data.data)
    })
    return () => {
    };
  }, []);

  const renderRows = (genero) => {
    return (
      <tr key={genero.id} >
        <th>{genero.id}</th>
        <td>{genero.name}</td>
        <td>
          <Button color="info" size='sm' tag={Link} to={'/genero/'+genero.id}>Editar</Button> {' '}
          <Button color='danger' size='sm' onClick={() => onRemove(genero.id)} >Remove</Button>
        </td>
      </tr>
    )
  }

  const onRemove = (id) => {
    Axios.delete('/api/genres/'+id).then( (res) => {
      setGenero(genero.filter(item => item.id !== id)) 
    })
  }

  if (genero.length === 0) {
    return (
      <div>
      <br />
        <Alert color="warning">
          Não há registros para serem exibios.
        </Alert>
      </div>
    )
  }

  return (
    <div>
      <h1>Gênero</h1>
      <p><Button color='success' tag={Link} to='/genero/novo' size='sm'>Novo</Button></p>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {genero.map(renderRows)}
        </tbody>
      </Table>
    </div>


  );
}

export default Genero;
