import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import { JSONViewer } from 'react-json-editor-viewer';
import { JSONEditor } from 'react-json-editor-viewer';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Constants from '../../ utils/Constants'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Launcher from './Launcher';

class LaunchedJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        };
        this.constants = new Constants();
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

    render() {
        const jobs = this.state.jobs;
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
                return (<Button size="sm" variant="outline-primary">View</Button>)
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
            </div>)
    }

}

export default LaunchedJobs;