import Button from '../../components/primitive/Button';
import Input from '../../components/primitive/Input';
import {WebData} from '../../core';
import ConfiguredRadium from 'ConfiguredRadium';
import PropTypes from 'prop-types';
import React from 'react';
import styleGlobals from 'styleGlobals';

const styles = {
    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

@ConfiguredRadium
class RunModelProperties extends React.Component {

    componentWillMount() {
        this.props.getModflowModelCalculation(this.props.id);
    }

    render() {
        const {calculateModflowModel, calculateModflowModelStatus, getModflowModelCalculationStatus, id, readOnly} = this.props;

        return (
            <div>
                {!readOnly &&
                <div style={[styles.columns]}>
                    <WebData.Component.Loading status={calculateModflowModelStatus}>
                        <Button onClick={() => calculateModflowModel(id)}>Calculate</Button>
                    </WebData.Component.Loading>
                </div>}
                <div>
                    <Input
                        inputStyle={{height: 500}}
                        type="textarea"
                        disabled={true}
                        value={getModflowModelCalculationStatus.data ? getModflowModelCalculationStatus.data.message : ''}
                        placeholder=""
                    />
                </div>
            </div>
        );
    }
}

RunModelProperties.propTypes = {
    calculateModflowModel: PropTypes.func.isRequired,
    calculateModflowModelStatus: PropTypes.object.isRequired,
    getModflowModelCalculationStatus: PropTypes.object.isRequired,
    getModflowModelCalculation: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
};

export default RunModelProperties;
