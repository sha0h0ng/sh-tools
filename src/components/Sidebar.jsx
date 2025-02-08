'use client';

import { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { PenToolIcon as Tool, Key, FileJson } from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navItems = [
    {
      path: '/',
      icon: Tool,
      label: 'Randomizer Tool',
    },
    {
      path: '/password-generator',
      icon: Key,
      label: 'Password Generator',
    },
    {
      path: '/delimiter-to-json',
      icon: FileJson,
      label: 'Delimiter to JSON',
    },
  ];

  const renderNavItems = (onClick = null) =>
    navItems.map((item) => (
      <Nav.Link
        key={item.path}
        as={Link}
        to={item.path}
        active={location.pathname === item.path}
        className='sidebar-link'
        onClick={onClick}
      >
        <item.icon size={18} className='me-2' />
        {item.label}
      </Nav.Link>
    ));

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
              <Nav className='flex-column'>{renderNavItems(handleClose)}</Nav>
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
        {renderNavItems()}
      </Nav>
    </>
  );
}

export default Sidebar;
