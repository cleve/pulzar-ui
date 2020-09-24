import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


class Launcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Alert variant="success">
                <Alert.Heading>Hey, soon here you will have a catalog</Alert.Heading>
                <p>
                    Wait a little bit
                </p>
                <hr />
            </Alert>
        )
    }

}

export default Launcher;
