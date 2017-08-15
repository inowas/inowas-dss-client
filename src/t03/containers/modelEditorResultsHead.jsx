import React, { Component, PropTypes } from 'react';
import ArraySlider from '../../components/primitive/ArraySlider';
import { connect } from 'react-redux';

class ModelEditorResultsHead extends Component {

    render() {
        return (
            <div>
                <ArraySlider data={[ 0, 1, 3, 4 ]} value={2} onChange={( ) => {}} formatter={( ) => {}}/>
            </div>
        );
    }
}

export default ModelEditorResultsHead;
