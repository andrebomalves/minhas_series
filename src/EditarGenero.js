import React, {useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import {Button} from 'reactstrap' 
import Axios from 'axios'


function EditarGenero(props) {

    const [name, setName] = useState('');
    const [confirma, setconfirma] = useState(false);

    useEffect(() => {
        Axios
            .get('/api/genres/'+ props.match.params.id) 
            .then((res) => {
                setName(res.data.name)
            })
    },[props.match.params.id]);

    const onChange = (evt) => {
        setName(evt.target.value)
    }

    const save = () => {
        let id = props.match.params.id;
        Axios.put('/api/genres/'+id,{name:name}) 
        .then( res =>{
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
            <h1>Editar Gênero</h1>
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

export default EditarGenero
