import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Scheduler from '../scheduler/Scheduler';
import Card from 'react-bootstrap/Card';

function App() {
  return (
    <Container fluid>
      <Navbar bg="light">
        <Navbar.Brand href="#home">Pulzar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Summary</Nav.Link>
            <Nav.Link href="#link">Launcher</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row className='mt-5'>
        <Col>


          <Scheduler></Scheduler>

        </Col>
      </Row>
    </Container>
  );
}

export default App;
