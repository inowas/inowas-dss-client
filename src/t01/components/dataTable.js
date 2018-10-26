import React from 'react';
import {Button, Icon, Menu, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const style = {
    button: {width: 'auto', height: 'auto', padding: '5px'},
    tableRow: {width: '100%'}
};

class CustomDataTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: true,
            elementsPerPage: 10,
            currentPage: 0
        };
    }

    header = () => (
        <Table.Row style={style.tableRow}>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>HLR [m/a]</Table.HeaderCell>
            <Table.HeaderCell>HLC</Table.HeaderCell>
            <Table.HeaderCell>Infiltration Time [h]</Table.HeaderCell>
            <Table.HeaderCell>K<sub>s</sub> [m/s]</Table.HeaderCell>
            <Table.HeaderCell>Climate</Table.HeaderCell>
            <Table.HeaderCell>Scale</Table.HeaderCell>
            <Table.HeaderCell/>
        </Table.Row>
    );

    renderRows = (param, toggleSelect) => {
        return (
            <Table.Row key={param.id} style={{width: '100%'}}>
                <Table.Cell>{param.name}</Table.Cell>
                <Table.Cell>{param.hlr}</Table.Cell>
                <Table.Cell>{param.hlc}</Table.Cell>
                <Table.Cell>{param.time}</Table.Cell>
                <Table.Cell>{param.k}</Table.Cell>
                <Table.Cell>{param.climate}</Table.Cell>
                <Table.Cell>{param.scale}</Table.Cell>
                <Table.Cell>
                    <Button
                        floated={'right'}
                        icon={this.props.icon}
                        onClick={() => toggleSelect(param.name)}
                        style={style.button}
                    />
                </Table.Cell>
            </Table.Row>
        );
    };

    setCurrentPage(page) {
        let currentPage = page;

        if (currentPage < 0) {
            currentPage = 0;
        }

        const numberOfPages = Math.ceil(this.props.data.length / this.state.elementsPerPage);

        if (currentPage > (numberOfPages - 1)) {
            currentPage = (numberOfPages - 1);
        }

        this.setState({
            currentPage: currentPage
        });
    }

    pagination = () => {
        if (!this.state.pagination) {
            return null;
        }

        if (this.props.data.length <= this.state.elementsPerPage) {
            return null;
        }

        const numberOfItems = Math.ceil(this.props.data.length / this.state.elementsPerPage);
        const items = new Array(numberOfItems).fill(0).map((i, key) => {
            if (key === this.state.currentPage) {
                return (
                    <Menu.Item key={key}><u>{key + 1}</u></Menu.Item>
                );
            }

            return (
                <Menu.Item key={key} onClick={() => this.setCurrentPage(key)}>{key + 1}</Menu.Item>
            );
        });

        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan="3">
                        <Menu floated="right" pagination>
                            <Menu.Item
                                as="a"
                                icon
                                style={style.button}
                                onClick={() => this.setCurrentPage(this.state.currentPage - 1)}
                            >
                                <Icon name="chevron left"/>
                            </Menu.Item>
                            {items}
                            <Menu.Item
                                as="a"
                                icon
                                style={style.button}
                                onClick={() => this.setCurrentPage(this.state.currentPage + 1)}
                            >
                                <Icon name="chevron right"/>
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        );
    };

    render() {
        const rows = this.props.data.filter((row, key) => {
            if (!this.state.pagination) {
                return row;
            }

            const min = this.state.currentPage * this.state.elementsPerPage;
            const max = (this.state.currentPage + 1) * this.state.elementsPerPage;
            if (key >= min && key < max) {
                return row;
            }

            return null;
        }).map(param => {
            return this.renderRows(param, this.props.toggleSelect);
        });

        return (
            <Table color={this.props.color} size={'small'}>
                <Table.Header>{this.header()}</Table.Header>
                <Table.Body style={{overflowY: 'inherit'}}>
                    {rows}
                </Table.Body>
                {this.pagination()}
            </Table>
        );
    }
}

CustomDataTable.propTypes = {
    color: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    icon: PropTypes.string.isRequired,
    toggleSelect: PropTypes.func.isRequired
};

export default CustomDataTable;
