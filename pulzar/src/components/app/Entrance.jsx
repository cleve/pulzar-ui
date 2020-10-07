import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Scheduler from '../scheduler/Scheduler';
import Launcher from '../launcher/Launcher';
import Home from '../home/Home';
import Searcher from '../database/Searcher';

class Entrance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: true,
            scheduler: false,
            launcher: false,
            database: false
        };
    }

    activeNav = (nav) => {
        switch (nav) {
            case 0:
                this.setState({
                    home: true,
                    scheduler: false,
                    launcher: false,
                    database: false
                });
                break;
            case 1:
                this.setState({
                    home: false,
                    scheduler: true,
                    launcher: false,
                    database: false
                });
                break;
            case 2:
                this.setState({
                    home: false,
                    scheduler: false,
                    launcher: true,
                    database: false
                });
                break;
            case 3:
                this.setState({
                    home: false,
                    scheduler: false,
                    launcher: false,
                    database: true
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
        const databasePage = this.state.database;
        return (
            <div>
                <Navbar bg="light">
                    <Navbar.Brand href="#">Pulzar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#" onClick={() => this.activeNav(0)} active={homePage}>Home</Nav.Link>
                            <Nav.Link href="#" onClick={() => this.activeNav(1)} active={schedulerPage}>Scheduler</Nav.Link>
                            <Nav.Link href="#" onClick={() => this.activeNav(2)} active={launcherPage}>Launcher</Nav.Link>
                            <Nav.Link href="#" onClick={() => this.activeNav(3)} active={databasePage}>Database</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container fluid>
                    <Row className='mt-5'>
                        <Col>
                            {homePage ? <Home /> : null}
                            {schedulerPage ? <Scheduler /> : null}
                            {launcherPage ? <Launcher /> : null}
                            {databasePage ? <Searcher /> : null}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Entrance;
