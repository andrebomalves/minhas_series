import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Badge } from 'reactstrap'
import Axios from 'axios'
import { italic } from 'colorette';

function InfoSerie(props) {

    const [form, setForm] = useState({});
    const [confirma, setconfirma] = useState(false);
    const [data, setData] = useState({});
    const [mode, setMode] = useState('INFO');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        if(props.match.params.id){
        Axios
            .get('/api/series/' + props.match.params.id)
            .then((res) => {
                setData(res.data)
                setForm(res.data)
            })
        }
    }, [props.match.params.id]);

    useEffect(() => {
        Axios.get('/api/genres/').then((res) => {
            setGenres(res.data.data)
        })
    }, [])

    const onChange = field => (evt) => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }
    
    const seleciona = valor => {
        setForm({
            ...form,
            status:valor
        })
    }

    const save = () => {
        let id = props.match.params.id;
        Axios.put('/api/series/' + id, form)
            .then(res => {
                setconfirma(true)
            })
    }

    if (confirma) {
        return (
            <Redirect to='/series'></Redirect>
        )
    }

    //Custon header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7 )' }}>
                    <div className="h-100 container  ">
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img src={data.poster} alt={data.name} className='img-fluid img-thumbnail' />
                            </div>
                            <div className="col-9">
                                <h1 className='font-weight-light text-white '>{data.name}</h1>
                                <div className='text-white'>
                                    { data.status === 'ASSISTIDO' && <Badge className='mr-1' color='success'>Assitido</Badge>}
                                    { data.status === 'PARA_ASSISTIR' && <Badge className='mr-1' color='primary'>Para Assistir</Badge>}
                                    <br /> Genero: {data.genre}
                                    <br />
                                    <p style={{fontStyle:italic,fontWeight:100}}>"{data.comments}"</p>
                                    <Button color='primary' size='sm' onClick={() => mode === 'INFO' ? setMode('EDIT') : setMode('INFO')} > {mode === 'INFO' ? 'Editar' : 'Cancelar Edição'} </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {mode === 'EDIT' &&
                <div className="container">
                    <h1>Editar Série</h1>
                    <form id='frmSerie'>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="comments">Comentário</label>
                            <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id="comments" />
                        </div>
                        <div className="form-group">
                            <label htmlFor='genre'>Gênero</label>
                            <select name="" id="genre" className="form-control" value={form.genre_id} onChange={onChange('genre_id')}>
                                {genres.map((item) => {
                                    return (<option key={item.id} value={item.id} >{item.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className='form-group'>
                        <label htmlFor=''>Status</label>
                            <div className='form-check-label'>
                                <input type='radio' className='form-radio-input' checked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' onChange={ () => seleciona('ASSISTIDO')} />
                                <label htmlFor='assitido' className='form-check-label'>Assitido</label>
                            </div>
                            <div className='form-check'>
                                <input type='radio' className='form-check-input' name='status' checked={form.status === 'PARA_ASSISTIR'}  id='paraAssistir' value='PARA_ASSISTIR' onChange={ () => seleciona('PARA_ASSISTIR')} />
                                <label htmlFor='paraAssistir' className='form-radio-label'>Para Assistir</label>
                            </div>
                        </div> 
                        <Button color='primary' onClick={save} type='button'>Salvar</Button>
                    </form>
                </div>
            }
        </div>
    );
}

export default InfoSerie;
