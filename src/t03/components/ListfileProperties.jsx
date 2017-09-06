import ConfiguredRadium from 'ConfiguredRadium';
import Input from '../../components/primitive/Input';
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
class ListfileProperties extends React.Component {

    componentWillMount() {
        const {calculation, getListfile} = this.props;

        if (calculation && calculation.state === 4) {
            getListfile(calculation.calculation_id);
        }
    }

    render() {
        const {getListfileStatus} = this.props;

        return (
            <div>
                <div>
                    <Input
                        inputStyle={{height: 500}}
                        type="textarea"
                        disabled={true}
                        value={getListfileStatus.data ? getListfileStatus.data : ''}
                        placeholder=""
                    />
                </div>
            </div>
        );
    }
}

ListfileProperties.propTypes = {
    calculation: PropTypes.object,
    getListfileStatus: PropTypes.object,
    getListfile: PropTypes.func.isRequired,
};

export default ListfileProperties;
