import React from 'react';
import {Button, Icon, Menu, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {uniq} from 'lodash';

const style = {
    button: {width: 'auto', height: 'auto', padding: '5px'},
    tableRow: {width: '100%'}
};

class CustomDataTable extends React.Component {

    constructor(props) {
        super(props);

        const filterItems = [];
        if (Array.isArray(props.filter)) {
            props.filter.forEach(property => {
                const values = uniq(this.props.data.map(row => (row[property])));
                values.sort();
                values.unshift('none');
                filterItems.push({
                    name: property,
                    selectedKey: 0,
                    values: values
                });
            });
        }

        this.state = {
            pagination: true,
            elementsPerPage: 10,
            currentPage: 0,
            filterItems: filterItems
        };
    }

    handleSelectChange = (event) => {
        const name = event.target.name;
        const selectedKey = parseInt(event.target.value, 10);

        this.setState((state) => {
            return {
                filterItems: state.filterItems.map(item => {
                    if (item.name === name) {
                        item.selectedKey = selectedKey;
                    }

                    return item;
                })
            };
        });
    };

    header = () => (
        <Table.Row style={style.tableRow}>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>HLR [m/a]</Table.HeaderCell>
            <Table.HeaderCell>HLC</Table.HeaderCell>
            <Table.HeaderCell>Infiltration Time [h]</Table.HeaderCell>
            <Table.HeaderCell>K [m/s]</Table.HeaderCell>
            <Table.HeaderCell>Climate</Table.HeaderCell>
            <Table.HeaderCell>Scale</Table.HeaderCell>
            <Table.HeaderCell/>
        </Table.Row>
    );

    select = (data, property) => {
        if (this.state.filterItems.filter(i => i.name === property).length === 0) {
            return null;
        }

        const item = this.state.filterItems.filter(i => i.name === property)[0];
        return (
            <select key={item.name} name={item.name} value={item.selectedKey} onChange={this.handleSelectChange}>
                {item.values.map((value, key) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </select>
        );
    };

    filter = () => {
        if (this.props.filter && Array.isArray(this.props.filter)) {
            return (
                <Table.Row style={style.tableRow}>
                    <Table.Cell>{this.select(this.props.data, 'name')}</Table.Cell>
                    <Table.Cell>{this.select(this.props.data, 'hlr')}</Table.Cell>
                    <Table.Cell>{this.select(this.props.data, 'hlc')}</Table.Cell>
                    <Table.Cell>{this.select(this.props.data, 'time')}</Table.Cell>
                    <Table.Cell>{this.select(this.props.data, 'k')}</Table.Cell>
                    <Table.Cell>{this.select(this.props.data, 'climate')}</Table.Cell>
                    <Table.Cell>{this.select(this.props.data, 'scale')}</Table.Cell>
                    <Table.Cell/>
                </Table.Row>
            );
        }

        return null;
    };

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

    pagination = (numberOfElements) => {
        if (!this.state.pagination) {
            return null;
        }

        if (numberOfElements <= this.state.elementsPerPage) {
            return null;
        }

        const numberOfItems = Math.ceil(numberOfElements / this.state.elementsPerPage);
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

    applyFilter(data) {
        let filteredData = data;
        this.state.filterItems.forEach(i => {
            if (i.selectedKey === 0) {
                return filteredData;
            }

            filteredData = filteredData.filter(row => row[i.name] === i.values[i.selectedKey]);
            return filteredData;
        });

        return filteredData;
    }

    render() {
        const filteredRows = this.applyFilter(this.props.data);
        const paginatedRows = filteredRows.filter((row, key) => {
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
                    {this.filter()}
                    {paginatedRows}
                </Table.Body>
                {this.pagination(filteredRows.length)}
            </Table>
        );
    }
}

CustomDataTable.propTypes = {
    color: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    icon: PropTypes.string.isRequired,
    toggleSelect: PropTypes.func.isRequired,
    filter: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired
};

export default CustomDataTable;
