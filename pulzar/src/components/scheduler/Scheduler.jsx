import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


class Scheduler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduled_jobs: [],
            ok_scheduled_jobs: [],
            failed_scheduled_jobs: [],
            scheduled_executions: [],
            failed_jobs: [],
            show_history: false
        };
    }

    getJobs = () => {

    }

    showScheduledJobs = () => {
        this.setState({
            show_history: false
        })
    }

    componentDidMount() {
        const self = this;
        axios.get('http://127.0.0.1:31414/admin/scheduled_jobs')
            .then(res => {
                if (res.data) {
                    self.setState({
                        scheduled_jobs: res.data.data
                    });
                }
            });
        axios.get('http://127.0.0.1:31414/admin/scheduled_jobs/ok?limit=100')
            .then(res => {
                if (res.data) {
                    self.setState({
                        ok_scheduled_jobs: res.data.data
                    });
                }
            })
        axios.get('http://127.0.0.1:31414/admin/scheduled_jobs/failed?limit=100')
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
        axios.get('http://127.0.0.1:31414/admin/scheduled_jobs/' + jobId + '?limit=100')
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
        return (
            <div>
                <Tabs transition={false} defaultActiveKey="scheduled" id="scheduled-tab">
                    <Tab eventKey="scheduled" title="Scheduled">
                        {!this.state.show_history ?
                            <Table striped bordered hover className='mt-5' size="sm">
                                <thead>
                                    <tr>
                                        <th>Job ID</th>
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
                                        scheduled.map(elem => (
                                            <tr key={'scheduled_' + elem.job_id}>
                                                <td key={'sch_jid' + elem.job_id}>{elem.job_id}</td>
                                                <td key={'sch_jn' + elem.job_id}>{elem.job_name}</td>
                                                <td key={'sch_par' + elem.job_id}>{elem.parameters}</td>
                                                <td key={'sch_int' + elem.job_id}>{elem.interval}</td>
                                                <td key={'sch_tu' + elem.job_id}>{elem.time_unit}</td>
                                                <td key={'sch_ne' + elem.job_id}>{new Date(elem.next_execution).toLocaleString()}</td>
                                                <td key={'sch_bt' + elem.job_id}>
                                                    <Button variant="outline-primary" onClick={() => this.loadJobHistory(elem.job_id)}>History</Button>
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
                                    <th>Job ID</th>
                                    <th>Job Name</th>
                                    <th>Parameters</th>
                                    <th>Interval</th>
                                    <th>Time unit</th>
                                    <th>Next execution</th>
                                    <th>log</th>
                                    <th>output</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    scheduledOk.map(elem => (
                                        <tr key={'scheduledSuccess'}>
                                            <td key={'schOk_jid' + elem.job_id}>{elem.job_id}</td>
                                            <td key={'schOk_jn' + elem.job_id}>{elem.job_name}</td>
                                            <td key={'schOk_par' + elem.job_id}>{elem.parameters}</td>
                                            <td key={'schOk_int' + elem.job_id}>{elem.interval}</td>
                                            <td key={'schOk_tu' + elem.job_id}>{elem.time_unit}</td>
                                            <td key={'schOk_ne' + elem.job_id}>{new Date(elem.next_execution).toLocaleString()}</td>
                                            <td key={'schOk_log' + elem.job_id}>{elem.log}</td>
                                            <td key={'schOk_out' + elem.job_id}>{elem.output}</td>
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
                                    <th>Job ID</th>
                                    <th>Job Name</th>
                                    <th>Parameters</th>
                                    <th>Interval</th>
                                    <th>Time unit</th>
                                    <th>Next execution</th>
                                    <th>log</th>
                                    <th>output</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    scheduledFailed.map(elem => (
                                        <tr key={'scheduledFailed'}>
                                            <td key={'schFailed_jid' + elem.job_id}>{elem.job_id}</td>
                                            <td key={'schFailed_jn' + elem.job_id}>{elem.job_name}</td>
                                            <td key={'schFailed_par' + elem.job_id}>{elem.parameters}</td>
                                            <td key={'schFailed_int' + elem.job_id}>{elem.interval}</td>
                                            <td key={'schFailed_tu' + elem.job_id}>{elem.time_unit}</td>
                                            <td key={'schFailed_ne' + elem.job_id}>{new Date(elem.next_execution).toLocaleString()}</td>
                                            <td key={'schFailed_log' + elem.job_id}>{elem.log}</td>
                                            <td key={'schFailed_out' + elem.job_id}>{elem.output}</td>
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
                                    <th>State</th>
                                    <th>Log</th>
                                    <th>Output</th>
                                    <th>Execution</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    scheduled_history.map(elem => (
                                        <tr>
                                            <td>{elem.state}</td>
                                            <td>{elem.log}</td>
                                            <td>{elem.output}</td>
                                            <td>{new Date(elem.datetime).toLocaleString()}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div> : null}
            </div>

        );
    }
}

export default Scheduler;