import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Button from 'react-bootstrap/Button';
import { JSONViewer } from 'react-json-editor-viewer';
import { JSONEditor } from 'react-json-editor-viewer';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Constants from '../../ utils/Constants'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


class Launcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catalog: [],
            currentArguments: null,
            showModalLauncher: false,
            jobDetails: null
        };
        this.constants = new Constants();
    }

    componentDidMount() {
        const self = this;
        axios.get(this.constants.JOB_CATALOG)
            .then(res => {
                if (res.data) {
                    console.log(res.data.data);
                    self.setState({
                        catalog: res.data.data
                    });
                }
            });
    }

    prepareLaunching = (jobDetails) => {
        this.setState({
            currentArguments: JSON.parse(jobDetails.args),
            jobDetails: jobDetails,
            showModalLauncher: true
        });
    }

    launchJob = (launcherObject) => {
        const self = this;
        axios.get(this.constants.JOB_CATALOG)
            .then(res => {
                if (res.data) {
                    console.log(res.data.data);
                    self.setState({
                        catalog: res.data.data
                    });
                }
            });
    }

    render() {
        const jobDetails = this.state.jobDetails;
        const showModalLauncher = this.state.showModalLauncher;
        const columns = [{
            dataField: 'path',
            text: 'Path'
        }, {
            dataField: 'description',
            text: 'Description'
        }, {
            dataField: 'args',
            text: 'Arguments'
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
            formatter: (row, cell) => {
                return (<Button onClick={(e) => { this.prepareLaunching(cell) }} size="sm" variant="outline-primary">Launch</Button>)
            }
        }];
        const catalogData = this.state.catalog;
        const { SearchBar } = Search;
        console.log(this.state.currentArguments);
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
                                <Card.Title>{jobDetails ? <h5>{jobDetails.path}</h5> : ""}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{jobDetails ? jobDetails.description : ""}</Card.Subtitle>
                                <Card.Text className="mt-5">
                                    <JSONEditor
                                        data={this.state.currentArguments}
                                        collapsible

                                    />
                                    <Button className="mt-5" variant="primary" size="lg">
                                        Launch Job
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
