import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Table, Button, Alert } from 'reactstrap'
import Axios from 'axios'


function Series() {

  const [serie, setSerie] = useState([]);

  useEffect(() => {
    Axios.get('/api/series').then(res => {
      setSerie(res.data.data)
    })
  }, []);

  const renderRows = (row) => {
    return (
      <tr key={row.id} >
        <th>{row.id}</th>
        <td>{row.name}</td>
        <td>
          <Button color="info" size='sm' tag={Link} to={'/series/'+row.id}>Editar</Button> {' '}
          <Button color='danger' size='sm' onClick={() => onRemove(row.id)} >Remove</Button>
        </td>
      </tr>
    )
  }

  const onRemove = (id) => {
    Axios.delete('/api/series/'+id).then( (res) => {
      setSerie(serie.filter(item => item.id !== id)) 
    })
  }

  if (serie.length === 0) {
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
    <div className='container'>
      <h1>Séries</h1>
      <p><Button color='success' tag={Link} to='/series/nova' size='sm'>Novo</Button></p>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {serie.map(renderRows)}
        </tbody>
      </Table>
    </div>


  );
}

export default Series;
