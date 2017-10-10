import { LayoutComponents, WebData } from '../../core';
import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '../../components/primitive/Select';
import { SolverPropertiesPcg, SolverPropertiesNwt, FlowPropertiesLpf, FlowPropertiesUpw } from '../components';
import { getInitialState } from '../selectors/packages';
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
class PackageProperties extends React.Component {
    constructor(props) {
        super( props );

        this.state = getInitialState();
    }

    componentDidMount() {
        this.props.getModflowPackages();
    }

    componentWillReceiveProps(nextProps) {
        this.setState( prevState => {

            const selected = !nextProps.modflowPackages || (prevState.selected && this.props.packageType === nextProps.packageType)
                ? prevState.selected
                : nextProps.modflowPackages[ nextProps.packageType ].selected;

            let packageData = {};

            if (nextProps.modflowPackages && nextProps.modflowPackages[ nextProps.packageType ][ selected ]) {
                packageData = {
                    [ selected ]: nextProps.modflowPackages[ nextProps.packageType ][ selected ]
                };
            } else if (selected && !prevState.packages[ this.props.packageType ][ selected ]) {
                this.props.load( selected, this.props.packageType );
            }

            return {
                ...prevState,
                ...packageData,
                selected,
                packages: nextProps.modflowPackages ? nextProps.modflowPackages : prevState.packages
            };
        } );
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
            if (this.state.selected !== data.value && !this.state.packages[ this.props.packageType ][ data.value ]) {
                this.props.load( data.value, this.props.packageType );
            }
        };
    };

    save = () => {
        this.props.onSave( this.state.selected, this.props.packageType, this.state[ this.state.selected ] );
    };

    render() {
        const { readOnly, updateStatus, getModflowPackagesStatus, loadingStatus, packageType } = this.props;
        const { selected, packages } = this.state;
        const availablePackages = packages[ packageType ].available;

        let packageComponent = '';
        let packageLabel = '';

        switch (selected) {
            case 'nwt':
                packageLabel = 'Solver Package';
                packageComponent = <SolverPropertiesNwt
                    solver={this.state[ selected ]}
                    handleInputChange={this.handleInputChange}
                    handleSelectChange={this.handleSelectChange}
                    getTypeForInput={getTypeForInput}
                    readOnly={readOnly}
                />;
                break;
            case 'pcg':
                packageLabel = 'Solver Package';
                packageComponent = <SolverPropertiesPcg
                    solver={this.state[ selected ]}
                    handleInputChange={this.handleInputChange}
                    getTypeForInput={getTypeForInput}
                    readOnly={readOnly}
                />;
                break;
            case 'lpf':
                packageLabel = 'Flow Package';
                packageComponent = <FlowPropertiesLpf
                    flow={this.state[ selected ]}
                    handleInputChange={this.handleInputChange}
                    handleSelectChange={this.handleSelectChange}
                    getTypeForInput={getTypeForInput}
                    readOnly={readOnly}
                />;
                break;
            case 'upw':
                packageLabel = 'Flow Package';
                packageComponent = <FlowPropertiesUpw
                    flow={this.state[ selected ]}
                    handleInputChange={this.handleInputChange}
                    getTypeForInput={getTypeForInput}
                    readOnly={readOnly}
                />;
                break;
            default:
                break;
        }

        return (
            <div>
                <WebData.Component.Loading status={getModflowPackagesStatus} style={[ { width: '100%' } ]}>
                    <LayoutComponents.InputGroup label={packageLabel}>
                        <Select
                            clearable={false}
                            name="selected"
                            disabled={readOnly}
                            value={selected}
                            onChange={this.handlePackage( 'selected' )}
                            options={map( availablePackages, (label, value) => { return { value, label }; } )}
                        />
                    </LayoutComponents.InputGroup>
                    <WebData.Component.Loading status={loadingStatus} style={[ { width: '100%' } ]}>
                        {packageComponent}
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

PackageProperties.propTypes = {
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    updateStatus: PropTypes.object,
    loadingStatus: PropTypes.object,
    getModflowPackagesStatus: PropTypes.object,
    getModflowPackages: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    packageType: PropTypes.string.isRequired,
    modflowPackages: PropTypes.object,
};

export default PackageProperties;
