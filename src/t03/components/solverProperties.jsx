import { LayoutComponents, WebData } from '../../core';

import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '../../components/primitive/Select';
import { SolverPropertiesPcg, SolverPropertiesNwt } from '../components';
import { getInitialState } from '../selectors/solverPackage';
import styleGlobals from 'styleGlobals';
import { map } from 'lodash';

const styles = {
    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

const getTypeForInput = value => (value instanceof Array ? 'text' : 'number');

@ConfiguredRadium
class SolverProperties extends React.Component {
    constructor(props) {
        super( props );

        this.state = getInitialState();
    }

    componentDidMount() {
        this.props.getPackages();
    }

    componentWillReceiveProps(nextProps) {
        if (WebData.Selector.isStatusSuccess( nextProps.loadingStatus )) {
            this.setState( prevState => {
                return {
                    ...prevState,
                    [ prevState.selected ]: nextProps.loadingStatus.data
                };
            } );
        }
        if (WebData.Selector.isStatusSuccess( nextProps.getPackagesStatus )) {
            console.log( { nextProps, soliver: nextProps.getPackagesStatus.data.solver } );
            this.setState( prevState => {
                if (!prevState.selected) {
                    // setTimeout(() => this.props.load(nextProps.getPackagesStatus.data.solver.selected), 500)
                    this.props.load( nextProps.getPackagesStatus.data.solver.selected );
                }
                return {
                    ...prevState,
                    packages: nextProps.getPackagesStatus.data.solver.available,
                    selected: prevState.selected ? prevState.selected : nextProps.getPackagesStatus.data.solver.selected,
                };
            } );
        }
    }

    handleInputChange = name => {
        return value => {
            this.setState( prevState => {
                return {
                    ...prevState,
                    [ prevState.selected ]: {
                        ...prevState[ prevState.selected ],
                        [ name ]: value
                    }
                };
            } );
        };
    };

    handleSelectChange = name => {
        return data =>
            this.handleInputChange( name )( data ? data.value : undefined );
    };

    handlePackage = name => {
        return data => {
            this.setState( prevState => {
                return {
                    ...prevState,
                    selected: data.value,
                };
            } );
            if (this.state.selected !== data.value) {
                this.props.load( data.value );
            }
        };
    };

    save = () => {
        this.props.onSave( this.state[ this.state.selected ] );
    };

    render() {
        const { readOnly, updateStatus, getPackagesStatus, loadingStatus } = this.props;
        const { selected, packages } = this.state;
        const solver = this.state[ selected ];

        let solverPackage = '';

        switch (selected) {
            case 'nwt':
                solverPackage = <SolverPropertiesNwt
                    solver={solver}
                    handleInputChange={this.handleInputChange}
                    handleSelectChange={this.handleSelectChange}
                    getTypeForInput={getTypeForInput}
                    readOnly={readOnly}
                />;
                break;
            case 'pcg':
                solverPackage = <SolverPropertiesPcg
                    solver={solver}
                    handleInputChange={this.handleInputChange}
                    handleSelectChange={this.handleSelectChange}
                    getTypeForInput={getTypeForInput}
                    readOnly={readOnly}
                />;
                break;
        }

        return (
            <div>
                <WebData.Component.Loading status={getPackagesStatus} style={[ { width: '100%' } ]}>
                    <LayoutComponents.InputGroup label="Solver Package">
                        <Select
                            clearable={false}
                            name="selected"
                            disabled={readOnly}
                            value={selected}
                            onChange={this.handlePackage( 'selected' )}
                            options={map( packages, (label, value) => { return { value, label }; } )}
                        />
                    </LayoutComponents.InputGroup>
                    <WebData.Component.Loading status={loadingStatus} style={[ { width: '100%' } ]}>
                        {solverPackage}
                    </WebData.Component.Loading>
                </WebData.Component.Loading>
                {!readOnly &&
                <div style={[ styles.saveButtonWrapper ]}>
                    <WebData.Component.Loading status={updateStatus}>
                        <Button type={'accent'} onClick={this.save}>
                            Save
                        </Button>
                    </WebData.Component.Loading>
                </div>}
            </div>
        );
    }
}

SolverProperties.propTypes = {
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    updateStatus: PropTypes.object,
    loadingStatus: PropTypes.object,
    getPackagesStatus: PropTypes.object,
    getPackages: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
};

export default SolverProperties;
