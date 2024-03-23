import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Grid1x2, Coin, People, Person, BoxArrowLeft} from 'react-bootstrap-icons';
import './css/navbar.css';

const AppNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className='d-lg-none'>
        <Container>
          <Navbar.Brand href="#" className='navbarTitle'>Payroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="pills" className="me-auto mt-2">
              <Nav.Item className='mb-2'>
                <Nav.Link href=""  className='ps-2'><Grid1x2/> <span className='ps-2'>Dashboard</span></Nav.Link>
              </Nav.Item>
              <Nav.Item className='mb-2'>
                <Nav.Link href=""  className='ps-2'><Coin /> <span className='ps-2'>Salary</span></Nav.Link>
              </Nav.Item>
              <Nav.Item className='mb-2'>
                <Nav.Link href=""  className='ps-2'><People /> <span className='ps-2'>Employees</span></Nav.Link>
              </Nav.Item>
              <Nav.Item className='mb-2'>
                <Nav.Link href="" active className='ps-2'><Person /> <span className='ps-2'>Profile</span></Nav.Link>
              </Nav.Item>
              <Nav.Item className='mb-2'>
                <Nav.Link href="" className='ps-2'><BoxArrowLeft /> <span className='ps-2'>Logout</span></Nav.Link>
              </Nav.Item>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={true} backdrop={false} scroll={true} className="sidebar">
        <Offcanvas.Header >
          <Offcanvas.Title className='navbarTitle'>Payroll</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav variant="pills" className="me-auto offcanvasItems">
            <div>
              <Nav.Item className='mb-2'>
                <Nav.Link href=""  className='ps-2'><Grid1x2/> <span className='ps-2'>Dashboard</span></Nav.Link>
              </Nav.Item>
              <Nav.Item className='mb-2'>
                <Nav.Link href=""  className='ps-2'><Coin /> <span className='ps-2'>Salary</span></Nav.Link>
              </Nav.Item>
              <Nav.Item className='mb-2'>
                <Nav.Link href=""  className='ps-2'><People /> <span className='ps-2'>Employees</span></Nav.Link>
              </Nav.Item>
            </div>
            <div>
              <Nav.Item className='mb-2'>
                <Nav.Link href="" active className='ps-2'><Person /> <span className='ps-2'>Profile</span></Nav.Link>
              </Nav.Item>
              <Nav.Item className='mb-2'>
                <Nav.Link href="" className='ps-2'><BoxArrowLeft /> <span className='ps-2'>Logout</span></Nav.Link>
              </Nav.Item>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AppNavbar;