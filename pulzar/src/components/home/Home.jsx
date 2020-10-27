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
        this.interval = null;
        this.state = {
            network_status: []
        };
    }

    networkCheck = () => {
        const self = this;
        this.interval = setInterval(() => {
            axios.get(this.constants.NETWORK)
                .then(res => {
                    if (res.data) {
                        self.setState({
                            network_status: res.data.data
                        });
                    }
                });
        }, 300000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
        this.networkCheck();
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
            </div>
        )
    }

}

export default Home;
