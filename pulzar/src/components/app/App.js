import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Scheduler from '../scheduler/Scheduler';
import Card from 'react-bootstrap/Card';

function App() {
  return (
    <Container fluid>
      <Navbar bg="light">
        <Navbar.Brand href="#home">Pulzar</Navbar.Brand>
      </Navbar>
      <Row>
        <Col>
          <Card>
            <Card.Header>Scheduler</Card.Header>
            <Card.Body>

              <Scheduler></Scheduler>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
