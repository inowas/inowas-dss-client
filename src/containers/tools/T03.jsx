import * as actions from '../../actions/T03';

import React, { Component, PropTypes } from 'react';

import ModelEditorMap from '../../components/primitive/ModelEditorMap';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { getActiveTool } from '../../reducers/T03/ui';
import { withRouter } from 'react-router';

class T03 extends Component {

    static propTypes = {
        tool: PropTypes.string
    }

    state = {
        navigation: [ ]
    }

    render( ) {
        const { navigation } = this.state;

        return (
            <div className="toolT03">
                <Navbar links={navigation}/>
                <ModelEditorMap {...this.props}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        tool: getActiveTool( state.T03.ui )
    };
};

// eslint-disable-next-line no-class-assign
T03 = withRouter( connect( mapStateToProps, actions )( T03 ));

export default T03;
