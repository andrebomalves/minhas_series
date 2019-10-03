import React, {useEfect, useState} from 'react'
import { Link } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

function Menu() {

    const [toggle, setToggle] = useState(false);

    const toggleNavbar = () => {
        setToggle(old => !old)
    }

    return (
        <div>
        <Navbar color="light" light expand="md">
        <div className='container'>
          <NavbarBrand tag={Link} to='/'>Minhas Series</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={toggle} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink tag={Link} to='/series'>Series</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/genero'>Gênero</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/sobre' >Sobre</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          </div>
        </Navbar>
      </div>
    )
}

export default Menu
