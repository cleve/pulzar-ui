import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import Constants from '../../ utils/Constants';
import Modal from 'react-bootstrap/Modal';


class Scheduler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduled_jobs: [],
            ok_scheduled_jobs: [],
            failed_scheduled_jobs: [],
            scheduled_executions: [],
            failed_jobs: [],
            show_history: false,
            logDetails: false,
            logContent: ''
        };
        this.constants = new Constants();
    }

    showScheduledJobs = () => {
        this.setState({
            show_history: false
        })
    }

    componentDidMount() {
        const self = this;
        axios.get(this.constants.SCHEDULED_JOBS)
            .then(res => {
                if (res.data) {
                    self.setState({
                        scheduled_jobs: res.data.data
                    });
                }
            });
        axios.get(this.constants.SCHEDULED_JOBS + '/ok?limit=100')
            .then(res => {
                if (res.data) {
                    self.setState({
                        ok_scheduled_jobs: res.data.data
                    });
                }
            })
        axios.get(this.constants.SCHEDULED_JOBS + '/failed?limit=100')
            .then(res => {
                if (res.data) {
                    self.setState({
                        failed_scheduled_jobs: res.data.data
                    });
                }
            })
    }

    loadJobHistory(jobId) {
        const self = this;
        this.setState({ show_history: true });
        axios.get(this.constants.SCHEDULED_JOBS + '/' + jobId + '?limit=100')
            .then(res => {
                if (res.data) {
                    self.setState({
                        scheduled_executions: res.data.data.last_executions
                    });
                }
            })
    }

    render() {
        const scheduled = this.state.scheduled_jobs;
        const scheduled_history = this.state.scheduled_executions;
        const scheduledOk = this.state.ok_scheduled_jobs;
        const scheduledFailed = this.state.failed_scheduled_jobs;
        const showLogDetail = this.state.logDetails;
        const logContent = this.state.logContent;
        const parsedLog = (logContent != null) ? logContent.split('\n').map((item, index) => <div key={index}>{item}</div>) : "";

        return (
            <div>
                <Tabs transition={false} defaultActiveKey="scheduled" id="scheduled-tab">
                    <Tab eventKey="scheduled" title="Scheduled">
                        {!this.state.show_history ?
                            <Table striped bordered hover className='mt-5' size="sm">
                                <thead>
                                    <tr>
                                        <th>Job</th>
                                        <th>Job Name</th>
                                        <th>Parameters</th>
                                        <th>Interval</th>
                                        <th>Time unit</th>
                                        <th>Next execution</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        scheduled.map((elem, index) => (
                                            <tr key={index}>
                                                <td key={'sch_jid' + elem.job_id}>{elem.job_id}</td>
                                                <td key={'sch_jn' + elem.job_id}>{elem.job_name}</td>
                                                <td key={'sch_par' + elem.job_id}>{elem.parameters}</td>
                                                <td key={'sch_int' + elem.job_id}>{elem.interval}</td>
                                                <td key={'sch_tu' + elem.job_id}>{elem.time_unit}</td>
                                                <td key={'sch_ne' + elem.job_id}>{new Date(elem.next_execution).toLocaleString()}</td>
                                                <td key={'sch_bt' + elem.job_id}>
                                                    {
                                                        (elem.state === 'scheduled') ?
                                                            <Button size="sm" variant="outline-primary" onClick={() => this.loadJobHistory(elem.job_id)}>
                                                                History
                                                            </Button>
                                                            : <Badge variant="danger">Disabled</Badge>}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table> : null}
                    </Tab>
                    <Tab eventKey="successful" title="Successful" disabled={this.state.show_history}>
                        <Table striped bordered hover className='mt-5' size="sm">
                            <thead>
                                <tr>
                                    <th>Job</th>
                                    <th>Execution</th>
                                    <th>Job Name</th>
                                    <th>Parameters</th>
                                    <th>Interval</th>
                                    <th>Time unit</th>
                                    <th>log</th>
                                    <th>output</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    scheduledOk.map((elem, index) => (
                                        <tr key={index}>
                                            <td key={'schOk_jid' + elem.job_id}>{elem.job_id}</td>
                                            <td key={'schOk_exec_id' + elem.exec_id}>{elem.exec_id}</td>
                                            <td key={'schOk_jn' + elem.job_id}>{elem.job_name}</td>
                                            <td key={'schOk_par' + elem.job_id}>{elem.parameters}</td>
                                            <td key={'schOk_int' + elem.job_id}>{elem.interval}</td>
                                            <td key={'schOk_tu' + elem.job_id}>{elem.time_unit}</td>
                                            <td key={'schOk_log' + elem.job_id}><Button size="sm" disabled={elem.log === null} onClick={() => { this.setState({ logContent: elem.log, logDetails: true }) }} variant="outline-info">Show</Button></td>
                                            <td key={'schOk_out' + elem.job_id}><Button size="sm" disabled={elem.output === null} onClick={() => { this.setState({ logContent: elem.output, logDetails: true }) }} variant="outline-info">Show</Button></td>
                                            <td key={'schOk_date' + elem.job_id}>{elem.datetime}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="failed" title="Failed" disabled={this.state.show_history}>
                        <Table striped bordered hover className='mt-5' size="sm">
                            <thead>
                                <tr>
                                    <th>Job</th>
                                    <th>Execution</th>
                                    <th>Job Name</th>
                                    <th>Parameters</th>
                                    <th>Interval</th>
                                    <th>Time unit</th>
                                    <th>log</th>
                                    <th>output</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    scheduledFailed.map((elem, index) => (
                                        <tr key={index}>
                                            <td key={'schFailed_jid' + elem.job_id}>{elem.job_id}</td>
                                            <td key={'schOk_exec_id' + elem.exec_id}>{elem.exec_id}</td>
                                            <td key={'schFailed_jn' + elem.job_id}>{elem.job_name}</td>
                                            <td key={'schFailed_par' + elem.job_id}>{elem.parameters}</td>
                                            <td key={'schFailed_int' + elem.job_id}>{elem.interval}</td>
                                            <td key={'schFailed_tu' + elem.job_id}>{elem.time_unit}</td>
                                            <td key={'schFailed_log' + elem.job_id}><Button size="sm" disabled={elem.log === null} onClick={() => { this.setState({ logContent: elem.log, logDetails: true }) }} variant="outline-info">Show</Button></td>
                                            <td key={'schFailed_out' + elem.job_id}><Button size="sm" disabled={elem.output === null} onClick={() => { this.setState({ logContent: elem.output, logDetails: true }) }} variant="outline-info">Show</Button></td>
                                            <td key={'schFailed_date' + elem.job_id}>{elem.datetime}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>

                {this.state.show_history ?
                    <div>
                        <div className="p-3">
                            <Button onClick={() => this.showScheduledJobs()} variant="outline-secondary" size="sm">Back</Button>
                        </div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Execution</th>
                                    <th>State</th>
                                    <th>Log</th>
                                    <th>Output</th>
                                    <th>Execution date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    scheduled_history.map((elem, index) => (
                                        <tr key={index}>
                                            <td>{elem.exec_id}</td>
                                            <td>{
                                                (elem.state === 'ok') ?
                                                    <Badge variant="success">Completed</Badge> : <Badge variant="danger">Failed</Badge>}
                                            </td>
                                            <td><Button size="sm" onClick={() => { this.setState({ logContent: elem.log, logDetails: true }) }} variant="outline-info">Show</Button></td>
                                            <td><Button size="sm" onClick={() => { this.setState({ logContent: elem.output, logDetails: true }) }} variant="outline-info">Show</Button></td>
                                            <td>{new Date(elem.datetime).toLocaleString()}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div> : null}

                <Modal scrollable={true}
                    size="lg"
                    show={showLogDetail}
                    animation={false}
                    onHide={() => { this.setState({ logDetails: false }) }}
                    aria-labelledby="modal-logs-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="modal-logs-lg">
                            Job details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{parsedLog}</Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default Scheduler;