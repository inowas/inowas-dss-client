import React, { Component, PropTypes } from 'react';
import ArraySlider from '../../components/primitive/ArraySlider';
import ScenarioAnalysisMap from '../../components/modflow/ScenarioAnalysisMap';
import ScenarioAnalysisMapData from '../../model/ScenarioAnalysisMapData';
import Grid from '../../model/Grid';
import BoundingBox from '../../model/BoundingBox';
import Coordinate from '../../model/Coordinate';
import Select from '../../components/primitive/Select';
import { model, results } from '../selectors';
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
        model: PropTypes.object,
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
        this.setState({ selectedTotalTimeIndex: nextSelectedTotalTimeIndex });
    }

    render( ) {
        const { model, times, layerValues } = this.props;
        const { selectedLayer, selectedTotalTimeIndex } = this.state;

        if ( !model || !times || !layerValues ) {
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

        console.warn( model );

        const mapData = new ScenarioAnalysisMapData({
            area: model.geometry,
            grid: new Grid(
                new BoundingBox(
                    new Coordinate( model.bounding_box[0][1], model.bounding_box[0][0]),
                    new Coordinate( model.bounding_box[1][1], model.bounding_box[1][0])
                ),
                model.grid_size.n_x,
                model.grid_size.n_y
            ),
            boundaries: model.boundaries
        });

        const mapPosition = {
            bounds: [
                {
                    lat: model.bounding_box[0][1],
                    lng: model.bounding_box[0][0]
                }, {
                    lat: model.bounding_box[1][1],
                    lng: model.bounding_box[1][0]
                }
            ]
        };

        return (
            <div>
                <div style={[ styles.selectWrapper ]}>
                    <div style={[ styles.layerSelectWrapper ]}>
                        <Select options={options} value={selectedLayer} onChange={this.onLayerSelectChange}/>
                    </div>
                    <div style={[ styles.sliderWrapper ]}>
                        <ArraySlider data={totalTimes} value={selectedTotalTimeIndex} onChange={this.onTimeSliderChange} formatter={Formatter.dateToDate}/>
                    </div>
                </div>
                <div>
                    <ScenarioAnalysisMap mapData={mapData} mapPosition={mapPosition} updateMapView={( ) => {}} updateBounds={( ) => {}} clickCoordinate={console.warn}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, { tool }) => {
    return {
        model: model.getModflowModel(state[tool]),
        calculationId: results.getCalculationID( state[tool].model.results ),
        layerValues: results.getLayerValues( state[tool].model.results ),
        times: results.getTimes( state[tool].model.results )
    };
};

export default connect(mapStateToProps, { })( ModelEditorResultsHead );
