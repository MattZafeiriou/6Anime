import React from 'react';
import './Header.css'
import logoImg from '../logo.png'
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

const Header = () => {
  return (
    <>
    <Navbar expand="lg" style={{backgroundColor:"#1A1A1A"}}>
      <Container fluid>
        <Navbar.Brand className='navOptions' href="/">
            <Image src={logoImg} roundedCircle style={{width:'2.5em', height:'2.5em'}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto"></Nav>
          <Nav style={{
            marginRight: '20px',
            fontSize: '1.5em'
          }}>
            <Nav.Link className='navOptions' href="/most_recent">Most Recent</Nav.Link>
            <Nav.Link className='navOptions' href="/about">About</Nav.Link>
            <Nav.Link className='navOptions' href="/contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;