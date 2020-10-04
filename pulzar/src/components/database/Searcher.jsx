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
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Constants from '../../ utils/Constants'


class Searcher extends React.Component {
    constructor(props) {
        super(props);
        this.constants = new Constants();
        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        this.state = {
            showResults: false,
            searching: false,
            wordToSearch: '',
            limitValue: 100,
            startDate: startDate,
            endDate: new Date(),
            queryResponse: []
        };

        this.searchValue = this.searchValue.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    getFormattedDate = (date) => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return month + '-' + day + '-' + year;
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
        const startDate = this.getFormattedDate(self.state.startDate);
        const endDate = this.getFormattedDate(self.state.endDate);
        if (word === '' || word.length === 0) {
            return
        }
        const limit = self.state.limitValue;
        const query = this.constants.SEARCH_DB + word + '?limit=' + limit + '&gt=' + startDate + '&lt=' + endDate;
        console.log(query);
        axios.get(query)
            .then(res => {
                if (res.data) {
                    self.setState({
                        queryResponse: res.data.data,
                        showResults: true
                    });
                }
            });
    }

    render() {
        const showDatabaseResults = this.state.showResults;
        const searchingIndicator = this.state.searching;
        const searchResponse = this.state.queryResponse;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
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
                                            <DatePicker className="form-control" selected={startDate} onChange={date => this.setState({ startDate: date })} />
                                        </Col>
                                        <Col>
                                            <DatePicker className="form-control" minDate={startDate} selected={endDate} onChange={date => this.setState({ endDate: date })} />
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
                                <div>
                                    {searchResponse.length == 0 ?
                                        <Alert key="search-report" variant="light">
                                            No records were founds
                                                </Alert> : null}
                                    {(showDatabaseResults && searchResponse.length > 0) ?
                                        <Table striped bordered hover size="sm" className="mt-5">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Key found</th>
                                                    <th>Location</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    searchResponse.map((elem, index) => (
                                                        <tr key={index}>
                                                            <td key={'srch_id' + index}>{index + 1}</td>
                                                            <td key={'srch_key' + index}>{elem.key}</td>
                                                            <td key={'srch_url' + index}>{elem.url}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table> : null}
                                </div>
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
