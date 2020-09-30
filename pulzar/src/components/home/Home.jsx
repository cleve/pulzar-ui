import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import Constants from '../../ utils/Constants'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.constants = new Constants();
        this.state = {
            network_status: []
        };
    }

    componentDidMount() {
        const self = this;
        axios.get(this.constants.NETWORK)
            .then(res => {
                if (res.data) {
                    self.setState({
                        network_status: res.data.data
                    });
                }
            });
    }

    render() {
        const network_status = this.state.network_status;
        return (
            <div>
                <CardDeck>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Network status</Card.Header>
                        <ListGroup variant="flush">
                            {network_status.map((item, index) => {
                                return <ListGroup.Item key={index}>{item.node}<Badge className="ml-2" variant={item.synch ? "success" : "danger"}>{item.synch ? "online" : "offline"}</Badge></ListGroup.Item>
                            })}
                        </ListGroup>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Work load</Card.Header>
                        <ListGroup variant="flush">
                            {network_status.map((item, index) => {
                                return <ListGroup.Item key={index}>{item.node}: {item.load}%</ListGroup.Item>
                            })}
                        </ListGroup>
                    </Card>


                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Disk space</Card.Header>
                        <ListGroup variant="flush">
                            {network_status.map((item, index) => {
                                return <ListGroup.Item key={index}>{item.node}: {item.percent}%</ListGroup.Item>
                            })}
                        </ListGroup>
                    </Card>
                </CardDeck>
                <Row>
                    <Col></Col>
                    <Col xs={8}>
                        <Card className="mt-5">
                            <Card.Header>Search into the DB</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Control placeholder="Key words" />
                                        </Col>
                                        <Col>
                                            <Form.Control as="select" defaultValue="Choose...">
                                                <option>100</option>
                                                <option>50</option>
                                                <option>10</option>
                                                <option>1</option>
                                            </Form.Control>
                                        </Col>
                                        <Col>
                                            <Button variant="primary">Search</Button>{' '}
                                        </Col>
                                    </Row>
                                </Form>
                                <Table striped bordered hover size="sm" className="mt-5">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Key found</th>
                                            <th>Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }

}

export default Home;
