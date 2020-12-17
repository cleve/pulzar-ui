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
            jobDetails: null,
            tickStatusJob: true
        };
        this.tickForInterval = null;
        this.constants = new Constants();
        this.openModal = this.openModal.bind(this);
    }

    componentWillUnmount() {
        // Clear interval.
        if (this.tickForInterval !== null) {
            clearInterval(this.tickForInterval);
        }
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
        // For pendings.
        this.checkJobStatus();
    }

    checkJobStatus = () => {
        const self = this;
        if (!this.state.tickStatusJob) {
            return;
        }
        let filteredJobs = [];
        axios.get(this.constants.JOBS)
            .then(res => {
                if (res.data) {
                    let allJobs = res.data.data;
                    filteredJobs = allJobs.filter((item) => item.status === "pending");
                    if (filteredJobs.length === 0) {
                        self.setState({ tickStatusJob: false });
                    } else {
                        let updatedJobs = [];
                        this.tickForInterval = setInterval(() => {
                            allJobs = this.state.jobs;
                            filteredJobs = allJobs.filter((item) => item.status === "pending");
                            if (updatedJobs.length > 0) {
                                console.log("Update UI");
                                self.setState({
                                    jobs: updatedJobs
                                })
                            }
                            const currentJobs = this.state.jobs;
                            let finishedJobs = [];
                            filteredJobs.forEach((elem) => {
                                axios.get(this.constants.JOB_DETAILS + "/" + elem.job_id + "?filter=state")
                                    .then(res => {
                                        if (res.data) {
                                            if (res.data.status === "ko") {
                                                console.log("Error::" + res.data.msg);
                                                return
                                            }
                                            let jobDetails = res.data.data;
                                            if (jobDetails.status === "completed") {
                                                finishedJobs.push(elem.job_id);
                                                updatedJobs = currentJobs.map(item => {
                                                    if (finishedJobs.includes(item.job_id)) {
                                                        item.status = "completed";
                                                        return item;
                                                    } else {
                                                        return item;
                                                    }
                                                });
                                            } else if (jobDetails.status === "failed") {
                                                finishedJobs.push(elem.job_id);
                                                updatedJobs = currentJobs.map(item => {
                                                    if (finishedJobs.includes(item.job_id)) {
                                                        item.status = "failed";
                                                        return item;
                                                    } else {
                                                        return item;
                                                    }
                                                });
                                            }
                                        }
                                    });
                            });
                            // Clean items.
                            filteredJobs = filteredJobs.filter(item => {
                                return !finishedJobs.includes(item.job_id);
                            });
                            if (filteredJobs.length === 0) {
                                if (this.tickForInterval !== null) {
                                    clearInterval(this.tickForInterval);
                                }
                            }

                        }, 10000);
                    }
                }
            });
    }

    parseBR = (rawString) => {
        if (typeof rawString === 'undefined' || rawString === null) {
            return "N/A";
        }
        return rawString.split('\n').map((item, index) => <div key={index}>{item}</div>);
    }

    openModal = (jobId, jobName, jobStatus) => {
        this.setState({
            showModalLoader: true,
            jobId: jobId,
            jobName: jobName,
            showModal: true,
            jobStatus: jobStatus
        });
        // Getting details
        const url = this.constants.JOB_DETAILS + "/" + jobId + "?limit=200";
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
        let jobStatusIndicator = null;
        if (jobStatus === "completed") {
            jobStatusIndicator = <Badge className="ml-2" variant="success">Completed</Badge>
        }
        else if (jobStatus === "pending") {
            jobStatusIndicator = <Spinner animation="border" variant="primary" size="sm" />
        } else {
            jobStatusIndicator = <Badge className="ml-2" variant="danger">Failed</Badge>
        }
        const { SearchBar } = Search;
        const columns = [{
            dataField: 'job_id',
            text: 'Job ID',
            headerStyle: (column, colIndex) => {
                return { width: '100px' };
            },
        }, {
            dataField: 'job_name',
            text: 'Name'
        }, {
            dataField: 'node',
            text: 'Executed in'
        }, {
            dataField: 'creation_time',
            text: 'Date',
            formatter: (cell, row) => {
                return new Date(cell).toLocaleString()
            }
        }, {
            dataField: 'status',
            text: 'State',
            headerStyle: (column, colIndex) => {
                return { width: '100px' };
            },
            align: 'center',
            formatter: (cell, row) => {
                if (cell === 'failed') {
                    return (<Badge variant="danger">Failed</Badge>)
                } else if (cell === 'completed') {
                    return (<Badge variant="success">Completed</Badge>)
                } else if (cell === 'pending') {
                    return (<Spinner animation="border" variant="primary" size="sm" />)
                }
            }
        }, {
            dataField: 'action',
            isDummyField: true,
            text: 'Details',
            headerStyle: (column, colIndex) => {
                return { width: '80px' };
            },
            formatter: (row, cell) => {
                return (
                    <Button onClick={(e) => this.openModal(cell.job_id, cell.job_name, cell.status)} size="sm" variant="outline-primary">
                        View
                    </Button>
                )
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
                    onHide={() => {
                        this.setState({
                            showModal: false,
                            jobDetails: null
                        })
                    }}
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
                                    <div>{jobName}</div>
                                    <div>{jobStatusIndicator}</div>
                                </Card.Title>
                                {
                                    (jobStatus != "pending") ? 

                                    <div>
                                        <Card.Subtitle className="mb-2 text-muted">{(jobDetails !== null) ? "Duration: " + jobDetails.time + "(s)" : null}</Card.Subtitle>
                                        <Card.Text className="mt-4">
                                            {showModalLoader ? <Spinner animation="border" variant="primary" /> : null}
                                            {
                                                (jobDetails !== null) ?
                                                    <div>
                                                        <h5>Log</h5>
                                                        <p>{this.parseBR(jobDetails.log)}</p>
                                                        <div className="mt-2"></div>
                                                        <h5>Output</h5>
                                                        <p>{this.parseBR(jobDetails.output)}</p>
                                                    </div>
                                                    : null
                                            }
                                        </Card.Text>
                                    </div> : null
                                }
                                
                            </Card.Body>
                        </Card>

                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

export default LaunchedJobs;