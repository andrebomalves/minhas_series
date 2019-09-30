import React, {useState} from 'react'
import {Redirect} from 'react-router-dom';
import {Button} from 'reactstrap'
import Axios from 'axios'

function NovoGenero() {

    const [name, setName] = useState('');
    const [confirma, setconfirma] = useState(false);

    const onChange = (evt) => {
        setName(evt.target.value)
    }

    const save = () => {

        Axios.post('/api/genres',{name:name}) 
        .then( res =>{
            console.log(res)
            setconfirma(true)
        }) 
    }
 
    if(confirma){
        return(
            <Redirect to='/genero'></Redirect>
        )
    }

    return (
        <div>
            <h1>Novo Gênero</h1>
            <form id='frmGenero'>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" />
                </div>
                <Button color='primary' onClick={save} type='button'>Salvar</Button>
            </form>
        </div>
    )
}

export default NovoGenero
