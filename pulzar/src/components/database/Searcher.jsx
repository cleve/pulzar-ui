import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import Constants from '../../ utils/Constants'


class Searcher extends React.Component {
    constructor(props) {
        super(props);
        this.constants = new Constants();
        this.state = {
            showResults: false,
            searching: false,
            wordToSearch: '',
            limitValue: 100
        };

        this.searchValue = this.searchValue.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange = (value) => {
        this.setState({ limitValue: value });
    }

    updateSearchValue = (value) => {
        this.setState({
            wordToSearch: value
        })
    }

    searchValue = () => {
        const self = this;
        const word = self.state.wordToSearch;
        const limit = self.state.limitValue;
        /*
        axios.get(this.constants.NETWORK)
            .then(res => {
                if (res.data) {
                    self.setState({
                        network_status: res.data.data
                    });
                }
            });
        */
    }

    render() {
        const showDatabaseResults = this.state.showResults;
        const searchingIndicator = this.state.searching;
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col xs={8}>
                        <Card>
                            <Card.Header>Search into the DB</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Control value={this.state.wordToSearch} onChange={e => this.updateSearchValue(e.target.value)} placeholder="Key words" />
                                        </Col>
                                        <Col>
                                            <Form.Control as="select" defaultValue="Choose..." onChange={(e) => this.handleDropdownChange(e.target.value)}>
                                                <option>100</option>
                                                <option>50</option>
                                                <option>10</option>
                                                <option>1</option>
                                            </Form.Control>
                                        </Col>
                                        <Col>
                                            <Button onClick={() => this.searchValue()} variant="primary" block>
                                                {searchingIndicator ?
                                                    (<Spinner
                                                        as="span"
                                                        animation="grow"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />)
                                                    : null}
                                                {!searchingIndicator ? 'Search' : 'Working'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                {
                                    showDatabaseResults ?
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
                                        </Table> : null
                                }

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }

}

export default Searcher;
