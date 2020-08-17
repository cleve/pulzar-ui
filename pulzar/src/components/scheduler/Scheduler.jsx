import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';


class Scheduler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduled_jobs: [],
            failed_jobs: []
        };
    }

    getJobs = () => {

    }

    componentDidMount() {
        const self = this;
        axios.get('http://127.0.0.1:9000/admin/jobs')
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    self.setState({
                        scheduled_jobs: res.data.scheduled
                    });
                }
            })
    }

    render() {
        const scheduled = this.state.scheduled_jobs;
        return (
            <Tabs defaultActiveKey="scheduled" id="scheduled-tab">
                <Tab eventKey="scheduled" title="Scheduled">
                    <Table striped bordered hover className='mt-5' size="sm">
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Job Name</th>
                                <th>Parameters</th>
                                <th>Interval</th>
                                <th>Time unit</th>
                                <th>Next execution</th>
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
                                        <td key={'sch_ne' + elem.job_id}>{elem.next_execution}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="successful" title="Successful">
                    <div>Text</div>
                </Tab>
                <Tab eventKey="failed" title="Failed">
                    <div>TExt 3</div>
                </Tab>
            </Tabs>
        );
    }
}

export default Scheduler;