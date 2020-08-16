import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

class Scheduler extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="scheduled" id="scheduled-tab">
                <Tab eventKey="scheduled" title="Scheduled">
                    <Table striped bordered hover className='mt-5'>
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
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="succesful" title="Succesful">
                    Text
                </Tab>
                <Tab eventKey="failed" title="Failed">
                    Text
                </Tab>
            </Tabs>
        );
    }
}

export default Scheduler;