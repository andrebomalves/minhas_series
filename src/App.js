import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Menu from './Menu'
import Sobre from './Sobre'
import Home from './Home'
import Genero from './Genero'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'


function App() {
  return (
    <div className="App">
      <Router>
        <Menu></Menu>
        <div className='container'>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/genero' component={Genero}></Route>
          <Route exact path='/genero/novo' component={NovoGenero}></Route>
          <Route path='/genero/:id' component={EditarGenero}></Route>
          <Route exact path='/sobre' component={Sobre}></Route>
        </div>
      </Router>
    </div>
  )
}

export default App
