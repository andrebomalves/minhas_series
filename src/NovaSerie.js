import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap'
import Axios from 'axios'

function NovaSerie() {

    const [confirma, setconfirma] = useState(false);
    const [form, setForm] = useState({});
    const [genres, setGenres] = useState([]);

    const onChange = field => (evt) => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    useEffect(() => {
        Axios.get('/api/genres/').then((res) => {
            setGenres(res.data.data)
        })
    }, [])

    const seleciona = valor => {
        setForm({
            ...form,
            status: valor
        })
    }

    const save = () => {

        Axios.post('/api/series', form)
            .then(res => {
                console.log(res)
                setconfirma(true)
            })
    }

    if (confirma) {
        return (
            <Redirect to='/series'></Redirect>
        )
    }

    return (
        <div className='container'>
            <h1>Nova Série</h1>
            <form id='frmSerie'>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" onChange={onChange('name')} className="form-control" id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="comments">Comentário</label>
                    <input type="text" onChange={onChange('comments')} className="form-control" id="comments" />
                </div>
                <div className="form-group">
                    <label htmlFor='genre'>Gênero</label>
                    <select name="genre" id="genre" className="form-control" onChange={onChange('genre_id')}>
                        <option key='0' >-= Selecione =-</option>
                        {genres.map((item, index) => {
                            return (<option key={item.id} checked={index === 1} value={item.id} >{item.name}</option>)
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor=''>Status</label>
                    <div className='form-check-label'>
                        <input type='radio' className='form-radio-input' name='status' id='assistido' value='ASSISTIDO' onChange={() => seleciona('ASSISTIDO')} />
                        <label htmlFor='assitido' className='form-check-label'>Assitido</label>
                    </div>
                    <div className='form-check'>
                        <input type='radio' className='form-check-input' name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={() => seleciona('PARA_ASSISTIR')} />
                        <label htmlFor='paraAssistir' className='form-radio-label'>Para Assistir</label>
                    </div>
                </div>
                <Button color='primary' onClick={save} type='button'>Salvar</Button>
            </form>
        </div>
    )
}

export default NovaSerie
