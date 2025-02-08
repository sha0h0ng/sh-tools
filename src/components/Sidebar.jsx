'use client';

import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { PenToolIcon as Tool, Key } from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Mobile Navigation */}
      <Navbar
        bg='dark'
        variant='dark'
        expand={false}
        className='d-lg-none w-100'
      >
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className='py-2'>
            <Tool size={24} className='me-2' />
            Tools App
          </Navbar.Brand>
          <Navbar.Toggle onClick={handleShow} />
          <Navbar.Offcanvas
            show={show}
            onHide={handleClose}
            placement='start'
            className='sidebar-offcanvas'
          >
            <Offcanvas.Header closeButton className='bg-dark'>
              <Offcanvas.Title className='text-white'>
                <Tool size={24} className='me-2' />
                Tools App
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='bg-dark'>
              <Nav className='flex-column'>
                <Nav.Link
                  as={Link}
                  to='/'
                  active={location.pathname === '/'}
                  className='sidebar-link'
                  onClick={handleClose}
                >
                  <Tool size={18} className='me-2' />
                  Randomizer Tool
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/password-generator'
                  active={location.pathname === '/password-generator'}
                  className='sidebar-link'
                  onClick={handleClose}
                >
                  <Key size={18} className='me-2' />
                  Password Generator
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Desktop Navigation */}
      <Nav className='d-none d-lg-flex flex-column sidebar bg-dark'>
        <Navbar.Brand
          as={Link}
          to='/'
          className='px-3 py-4 w-100 text-center text-white'
        >
          <Tool size={24} className='me-2' />
          Tools App
        </Navbar.Brand>
        <Nav.Link
          as={Link}
          to='/'
          active={location.pathname === '/'}
          className='sidebar-link'
        >
          <Tool size={18} className='me-2' />
          Randomizer Tool
        </Nav.Link>
        <Nav.Link
          as={Link}
          to='/password-generator'
          active={location.pathname === '/password-generator'}
          className='sidebar-link'
        >
          <Key size={18} className='me-2' />
          Password Generator
        </Nav.Link>
      </Nav>
    </>
  );
}

export default Sidebar;
