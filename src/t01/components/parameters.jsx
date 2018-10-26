/* eslint-disable react/no-multi-comp */
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';

import '../../less/toolParameters.less';
import '../../less/input-range.less';
import {Button, Header, Input} from 'semantic-ui-react';
import DataTable from './dataTable';

const style = {
    input: {
        float: 'right',
        backgroundColor: 'inherit',
        padding: '0px',
        marginBottom: '5px'
    }
};


class Parameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    onChangeSearchTerm = (e, {value}) => {
        this.setState({
            searchTerm: value
        });
    };

    applySearch = (data) => {
        return data.filter(r => {
            if (JSON.stringify(r).search(this.state.searchTerm) > -1) {
                return r;
            }
            return null;
        });
    };

    render() {
        return (
            <div className="grid-container">
                <div className="col stretch">
                    <Header>Selected
                        <Button floated={'right'} color={'orange'} onClick={this.props.handleReset}>Default</Button>
                    </Header>
                    <DataTable
                        toggleSelect={this.props.toggleSelect}
                        data={this.props.data.filter(r => r.selected === true)}
                        color={'red'}
                        icon={'trash'}
                    />

                    <Header>
                        Data
                        <Input
                            style={style.input} size={'mini'}
                            placeholder={'Filter...'}
                            onChange={this.onChangeSearchTerm}
                            value={this.state.searchTerm}
                        />
                    </Header>
                    <DataTable
                        toggleSelect={this.props.toggleSelect}
                        data={this.applySearch(this.props.data.filter(r => r.selected === false))}
                        color={'grey'}
                        icon={'add'}
                    />
                </div>
            </div>
        );
    }
}

Parameters.propTypes = {
    toggleSelect: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
};

export default pure(Parameters);
