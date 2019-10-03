import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Menu from './Menu'
import Sobre from './Sobre'
import Home from './Home'
import Genero from './Genero'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Series from './Series'
import InfoSerie from './InfoSerie'
import NovaSerie from './NovaSerie'


function App() {
  return (
    <div className="App">
      <Router>
        <Menu></Menu>
        <div>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/genero' component={Genero}></Route>
            <Route exact path='/genero/novo' component={NovoGenero}></Route>
            <Route exact path='/genero/:id' component={EditarGenero}></Route>
            <Route exact path='/series' component={Series}></Route>
            <Route exact path='/series/nova' component={NovaSerie}></Route>
            <Route exact path='/series/:id' component={InfoSerie}></Route>
            <Route exact path='/sobre' component={Sobre}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
