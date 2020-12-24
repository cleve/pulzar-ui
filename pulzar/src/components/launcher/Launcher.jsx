import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { JSONEditor } from 'react-json-editor-viewer';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Constants from '../../ utils/Constants'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


class Launcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catalog: [],
            showJson: true,
            currentArguments: null,
            showModalLauncher: false,
            jobDetails: null,
            showJobLoader: false,
            jobMessageLaunched: "",
            showJobAlert: false,
            schedulerActive: false,
            schedulerOptions: false,
            schedulerInterval: null,
            schedulerIntervalSelection: 'minutes',
            schedulerTimeUnit: Array.from({length: 59}, (_, i) => i + 1),
            schedulerTimeUnitSelection: 1,
            schedulerRepetitive: false,
        };
        this.constants = new Constants();

        this.onJsonChange = this.onJsonChange.bind(this);
    }

    schedulerChecker = () => {

    }

    schedulerIntervalSelector = (event) => {
        if (event.target.value == "Minutes") {
            this.setState({schedulerTimeUnit: Array.from({length: 59}, (_, i) => i + 1)});
        } else if (event.target.value == "Hours") {
            this.setState({schedulerTimeUnit: Array.from({length: 23}, (_, i) => i + 1)});
        } else if (event.target.value == "Weeks") {
            this.setState({schedulerTimeUnit: Array.from({length: 7}, (_, i) => i + 1)});
        }
        this.setState({schedulerIntervalSelection: (event.target.value).toLowerCase()});
    }

    onJsonChange(key, value, parent, data) {
        let argumentsCopy = { ...this.state.currentArguments }
        argumentsCopy[key] = value;
        this.setState({
            currentArguments: argumentsCopy
        });
    }

    componentDidMount() {
        const self = this;
        axios.get(this.constants.JOB_CATALOG)
            .then(res => {
                if (res.data) {
                    self.setState({
                        catalog: res.data.data
                    });
                }
            });
    }

    jsonString = (jString) => {
        try {
            return JSON.parse(jString);
        } catch (e) {
            return null;
        }
    }

    prepareLaunching = (jobDetails) => {
        const self = this;
        console.log(jobDetails);
        let jsonString = this.jsonString(jobDetails.args);
        this.setState({
            showJson: (jsonString !== null) ? true : false,
            showJobAlert: false,
            currentArguments: jsonString,
            jobDetails: jobDetails,
            showModalLauncher: true
        });
    }

    launchJob = () => {
        this.setState({
            showJobLoader: true
        });
        const url = this.constants.JOB_LAUNCHER + this.state.jobDetails.path
        const schedulerActive = this.state.schedulerActive;
        let args = this.state.currentArguments;
        if (args === null) {
            args = { job: 'no args' }
        }
        // Is scheduler type
        if (schedulerActive) {
            let schedulerIntervalSelection = this.state.schedulerIntervalSelection;
            let schedulerTimeUnitSelection = this.state.schedulerTimeUnitSelection;
            let schedulerRepetitive = this.state.schedulerRepetitive;
            args["scheduled"] = {
                "interval": schedulerIntervalSelection,
                "time_unit": schedulerTimeUnitSelection,
                "repeat": schedulerRepetitive ? 1 : 0
            }
        }
        // Request
        axios.post(url, args)
            .then(res => {
                if (res.data) {
                    if (res.data.status === "ok") {
                        this.setState({
                            showJobAlert: true,
                            jobLaunchedCorrectly: true,
                            showJobLoader: false,
                            jobMessageLaunched: res.data.msg
                        });
                    } else {
                        this.setState({
                            showJobAlert: true,
                            jobLaunchedCorrectly: false,
                            showJobLoader: false,
                            jobMessageLaunched: res.data.msg
                        });
                    }
                }
            }, (error) => {
                this.setState({
                    showJobAlert: true,
                    jobLaunchedCorrectly: false,
                    showJobLoader: false,
                    jobMessageLaunched: error + ""
                });
            });
    }

    render() {
        const jobDetails = this.state.jobDetails;
        const showModalLauncher = this.state.showModalLauncher;
        const columns = [{
            dataField: 'path',
            text: 'Path',
            formatter: (row, cell) => {
                return (<div><pre>{cell.path}</pre></div>)
            }
        }, {
            dataField: 'description',
            text: 'Description'
        }, {
            dataField: 'args',
            text: 'Arguments',
            formatter: (row, cell) => {
                return (<div><pre>{cell.args}</pre></div>)
            }
        }, {
            dataField: 'category',
            text: 'Category'
        }, {
            dataField: 'author',
            text: 'Author'
        }, {
            dataField: 'action',
            isDummyField: true,
            text: 'Action',
            headerStyle: (column, colIndex) => {
                return { width: '100px' };
            },
            formatter: (row, cell) => {
                return (<Button onClick={(e) => { this.prepareLaunching(cell) }} size="sm" variant="outline-primary">Launch</Button>)
            }
        }];
        const catalogData = this.state.catalog;
        const { SearchBar } = Search;
        const showJobLoader = this.state.showJobLoader;
        const jobLaunchedOk = this.state.jobLaunchedCorrectly;
        const jobMessageLaunched = this.state.jobMessageLaunched;
        const showJobAlert = this.state.showJobAlert;
        const showJson = this.state.showJson;
        const schedulerOptions = this.state.schedulerOptions;
        const schedulerInterval = this.state.schedulerInterval;
        const schedulerTimeUnit = this.state.schedulerTimeUnit;
        const schedulerTimeUnitSelection = this.state.schedulerTimeUnitSelection;
        const schedulerIntervalSelection = this.state.schedulerIntervalSelection;
        const schedulerTimeUnitData = schedulerTimeUnit.map(item => {return <option>{item}</option>})
        const schedulerRepetitive = this.state.schedulerRepetitive;
        return (
            <div>

                <ToolkitProvider
                    keyField="catalog_table"
                    data={catalogData}
                    columns={columns}
                    search
                >
                    {
                        props => (
                            <div>
                                <SearchBar {...props.searchProps} />
                                <hr />
                                <BootstrapTable
                                    striped
                                    hover
                                    condensed
                                    {...props.baseProps}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>

                <Modal scrollable={true}
                    size="lg"
                    show={showModalLauncher}
                    animation={false}
                    onHide={() => { this.setState({ showModalLauncher: false }) }}
                    aria-labelledby="modal-logs-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="modal-logs-lg">
                            Launch Job
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card border="light">
                            <Card.Body>
                                {showJobAlert ? <Alert key="jobInfoAlert" variant={jobLaunchedOk ? "info" : "danger"}>
                                    {jobMessageLaunched}
                                </Alert> : null}
                                <Card.Title>{jobDetails ? <h5>{jobDetails.path}</h5> : ""}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{jobDetails ? jobDetails.description : ""}</Card.Subtitle>
                                <Card.Text className="mt-5">
                                    {showJson ? <JSONEditor
                                        data={this.state.currentArguments}
                                        collapsible
                                        onChange={this.onJsonChange}
                                    /> : null}

                                    <div className="mt-4">
                                    </div>
                                        <Form.Group controlId="formGroupSchedule">
                                            <Form.Check type="checkbox" checked={schedulerOptions} onChange={(e) => {this.setState({schedulerOptions: e.target.checked, schedulerActive: e.target.checked});console.log(e.target.checked)}} label="Schedule" /> 
                                        </Form.Group>
                                        {schedulerOptions ?
                                        <div>
                                        <Form.Group controlId="formGroupInterval">
                                        <Form.Label>Interval</Form.Label>
                                            <Form.Control as="select" onChange={this.schedulerIntervalSelector} value={this.state.schedulerIntervalSelection}>
                                                <option>Minutes</option>
                                                <option>Hours</option>
                                                <option>Weeks</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="formGroupTimeUnit">
                                        <Form.Label>Time unit</Form.Label>
                                            <Form.Control as="select" value={schedulerTimeUnitSelection} onChange={(e) => {this.setState({schedulerTimeUnitSelection:e.target.value})}}>
                                                {schedulerTimeUnitData}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="formGroupRepetitive">
                                            <Form.Check type="checkbox" checked={schedulerRepetitive} onChange={(e) => {this.setState({schedulerRepetitive: e.target.checked})}} label="Repetitive" /> 
                                        </Form.Group></div> : null
                                        }

                                    <Button disabled={showJobAlert} onClick={this.launchJob} className="mt-2" variant="primary" size="lg">
                                        {showJobLoader ? <div>
                                            <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            Launching</div> : "Launch Job"}
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

export default Launcher;
