import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import axios from 'axios';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            network_status: []
        };
    }

    componentDidMount() {
        const self = this;
        axios.get('http://127.0.0.1:31414/admin/network')
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
                                return <ListGroup.Item>{item.node}<Badge className="ml-2" variant={item.synch ? "success" : "danger"}>{item.synch ? "online" : "offline"}</Badge></ListGroup.Item>
                            })}
                        </ListGroup>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Network load</Card.Header>
                        <ListGroup variant="flush">
                            {network_status.map((item, index) => {
                                return <ListGroup.Item>{item.node}: {item.load}%</ListGroup.Item>
                            })}
                        </ListGroup>
                    </Card>


                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Disk space</Card.Header>
                        <ListGroup variant="flush">
                            {network_status.map((item, index) => {
                                return <ListGroup.Item>{item.node}: {item.percent}%</ListGroup.Item>
                            })}
                        </ListGroup>
                    </Card>
                </CardDeck>
            </div>
        )
    }

}

export default Home;
