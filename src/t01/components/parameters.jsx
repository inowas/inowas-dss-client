/* eslint-disable react/no-multi-comp */
import React from 'react';
import {pure} from 'recompose';
import PropTypes from 'prop-types';

import '../../less/toolParameters.less';
import '../../less/input-range.less';
import {Button, Header} from 'semantic-ui-react';
import DataTable from './dataTable';

class Parameters extends React.Component {
    constructor(props) {
        super(props);
    }

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
                        filter={false}
                    />

                    <Header>
                        Data
                    </Header>
                    <DataTable
                        toggleSelect={this.props.toggleSelect}
                        data={this.props.data.filter(r => r.selected === false)}
                        color={'grey'}
                        icon={'add'}
                        filter={['hlr', 'hlc', 'time', 'k', 'climate', 'scale']}
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
