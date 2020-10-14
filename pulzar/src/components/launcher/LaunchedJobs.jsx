import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Constants from '../../ utils/Constants'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class LaunchedJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            showModal: false,
            showModalLoader: true,
            jobId: null,
            jobName: "",
            jobStatus: "",
            jobDetails: null
        };
        this.constants = new Constants();

        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        const self = this;
        axios.get(this.constants.JOBS)
            .then(res => {
                if (res.data) {
                    self.setState({
                        jobs: res.data.data
                    });
                }
            });
    }

    parseBR = (rawString) => {
        return rawString.split('\n').map((item, index) => <div key={index}>{item}</div>);
    }

    openModal = (jobId, jobName, jobStatus) => {
        this.setState({
            jobId: jobId,
            jobName: jobName,
            showModal: true,
            jobStatus: jobStatus
        });
        // Getting details
        let url = this.constants.JOB_DETAILS + "/" + jobId;
        axios.get(url)
            .then(res => {
                if (res.data) {
                    this.setState({
                        jobDetails: res.data.data,
                        showModalLoader: false
                    });
                }
            });
    }

    render() {
        const jobs = this.state.jobs;
        const showModalLoader = this.state.showModalLoader;
        const showModal = this.state.showModal;
        const jobDetails = this.state.jobDetails;
        const jobName = this.state.jobName;
        const jobStatus = this.state.jobStatus;
        const { SearchBar } = Search;
        const columns = [{
            dataField: 'job_id',
            text: 'Job ID',

        }, {
            dataField: 'job_name',
            text: 'Name'
        }, {
            dataField: 'parameters',
            text: 'Parameters'
        }, {
            dataField: 'node',
            text: 'Executed in'
        }, {
            dataField: 'creation_time',
            text: 'Date'
        }, {
            dataField: 'status',
            text: 'State',
            formatter: (cell, row) => {
                if (cell === 'failed') {
                    return (<Badge variant="danger">Failed</Badge>)
                } else if (cell === 'completed') {
                    return (<Badge variant="success">Completed</Badge>)
                } else if (cell === 'pending') {
                    return (<Badge variant="info">Pending</Badge>)
                }
            }
        }, {
            dataField: 'action',
            isDummyField: true,
            text: 'Details',
            formatter: (row, cell) => {
                return (<Button onClick={(e) => this.openModal(cell.job_id, cell.job_name, cell.status)} size="sm" variant="outline-primary">View</Button>)
            }
        }];
        return (
            <div>
                <ToolkitProvider
                    keyField="catalog_table"
                    data={jobs}
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
                    show={showModal}
                    animation={false}
                    onHide={() => { this.setState({ showModal: false }) }}
                    aria-labelledby="modal-logs-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="modal-logs-lg">
                            Details job {this.state.jobId}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card border="light">
                            <Card.Body>
                                <Card.Title>
                                    {jobName}
                                    {(jobStatus === "completed") ? <Badge className="ml-2" variant="success">Completed</Badge> : <Badge className="ml-2" variant="danger">Failed</Badge>}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{(jobDetails !== null) ? "Duration: " + jobDetails.time + "(s)" : null}</Card.Subtitle>
                                <Card.Text className="mt-5">
                                    {showModalLoader ? <Spinner animation="border" variant="primary" /> : null}
                                    {(jobDetails !== null) ? this.parseBR(jobDetails.log) : null}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

export default LaunchedJobs;