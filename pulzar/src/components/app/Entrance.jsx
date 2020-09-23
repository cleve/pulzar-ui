import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Scheduler from '../scheduler/Scheduler';

class Entrance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: false,
            scheduler: true,
            launcher: false
        };
    }

    activeNav = (nav) => {
        switch (nav) {
            case 0:
                this.setState({
                    home: true,
                    scheduler: false,
                    launcher: false
                });
                break;
            case 1:
                this.setState({
                    home: false,
                    scheduler: true,
                    launcher: false
                });
                break;
            case 2:
                this.setState({
                    home: false,
                    scheduler: false,
                    launcher: true
                });
                break;
            default:
                this.setState({
                    home: false,
                    scheduler: false,
                    launcher: false
                });
        }
    }

    render() {
        const homePage = this.state.home;
        const schedulerPage = this.state.scheduler;
        const launcherPage = this.state.launcher;
        return (
            <Container fluid>
                <Navbar bg="light">
                    <Navbar.Brand href="#">Pulzar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#" onClick={() => this.activeNav(0)} active={homePage}>Home</Nav.Link>
                            <Nav.Link href="#" onClick={() => this.activeNav(1)} active={schedulerPage}>Scheduler</Nav.Link>
                            <Nav.Link href="#" onClick={() => this.activeNav(2)} active={launcherPage}>Launcher</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Row className='mt-5'>
                    <Col>
                        {schedulerPage ? <Scheduler /> : null}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Entrance;
