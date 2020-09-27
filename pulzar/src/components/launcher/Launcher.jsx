import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Constants from '../../ utils/Constants'


class Launcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.constants = new Constants();
    }

    render() {
        return (
            <div>
                <Alert variant="success">
                    <Alert.Heading>Hey, soon here you will have a catalog</Alert.Heading>
                    <p>
                        Wait a little bit
                </p>
                    <hr />
                </Alert>
                <Table striped bordered hover className='mt-5' size="sm">
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Job Name</th>
                            <th>Description</th>
                            <th>Parameters</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default Launcher;
