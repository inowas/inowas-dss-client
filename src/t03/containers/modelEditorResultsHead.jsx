import React, { Component, PropTypes } from 'react';
import ArraySlider from '../../components/primitive/ArraySlider';
import Select from '../../components/primitive/Select';
import { results } from '../selectors';
import { connect } from 'react-redux';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import { Formatter } from '../../core';

const styles = {
    selectWrapper: {
        display: 'flex'
    },

    layerSelectWrapper: {
        width: styleGlobals.dimensions.gridColumn,
        padding: styleGlobals.dimensions.spacing.medium
    },

    sliderWrapper: {
        width: 4 * styleGlobals.dimensions.gridColumn + 3 * styleGlobals.dimensions.gridGutter,
        padding: styleGlobals.dimensions.spacing.medium
    }
};

@ConfiguredRadium
class ModelEditorResultsHead extends Component {

    static propTypes = {
        times: PropTypes.object,
        layerValues: PropTypes.array
    }

    constructor( props ) {
        super( props );

        this.state = {
            selectedLayer: props.layerValues
                ? `0_${ props.layerValues[0][0 ] }`
                : null,
            selectedTotalTimeIndex: 0
        };
    }

    onLayerSelectChange = nextSelectedLayer => {
        this.setState({
            selectedLayer: nextSelectedLayer
                ? nextSelectedLayer.value
                : null
        });
    }

    onTimeSliderChange = nextSelectedTotalTimeIndex => {
        console.warn(nextSelectedTotalTimeIndex);
        this.setState({
            selectedTotalTimeIndex: nextSelectedTotalTimeIndex
        });
    }

    render( ) {
        const { times, layerValues } = this.props;
        const { selectedLayer, selectedTotalTimeIndex } = this.state;

        if ( !times || !layerValues ) {
            return (
                <div>
                    Loading!
                </div>
            );
        }

        const options = layerValues.map(( l, index ) => ({
            label: `Layer ${ index }`,
            options: l
                ? l.map(v => ({ label: `Layer ${ index } ${ v }`, value: `${ index }_${ v }` }))
                : [ ]
        }));

        const startDate = new Date( times.start_date_time );
        const totalTimes = times.total_times.map(t => {
            return startDate.addDays( t );
        });

        return (
            <div style={[ styles.selectWrapper ]}>
                <div style={[ styles.layerSelectWrapper ]}>
                    <Select options={options} value={selectedLayer} onChange={this.onLayerSelectChange}/>
                </div>
                <div style={[ styles.sliderWrapper ]}>
                    <ArraySlider data={totalTimes} value={selectedTotalTimeIndex} onChange={this.onTimeSliderChange} formatter={Formatter.dateToDate}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, { tool }) => {
    return {
        calculationId: results.getCalculationID( state[tool].model.results ),
        layerValues: results.getLayerValues( state[tool].model.results ),
        times: results.getTimes( state[tool].model.results )
    };
};

export default connect(mapStateToProps, { })( ModelEditorResultsHead );
