import Button from '../../components/primitive/Button';
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

    render() {
        return (
            <div>
                <div style={[styles.columns]}>
                    <Button
                        onClick={this.centerToBounds}
                        style={[styles.centerToBoundsButton]}
                        iconInside
                    >
                        Calculate
                    </Button>
                </div>
            </div>
        );
    }
}

RunModelProperties.propTypes = {

};

export default RunModelProperties;
