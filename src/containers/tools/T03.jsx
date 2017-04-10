import React, { Component, PropTypes } from 'react';

import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ModelEditorMap from '../../components/primitive/ModelEditorMap';

class T03 extends Component {

    state = {
        navigation: [ ]
    }

    render( ) {
        const { navigation } = this.state;

        return (
            <div className="toolT03">
                <Navbar links={navigation}/>
                <ModelEditorMap />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return { };
};

// eslint-disable-next-line no-class-assign
T03 = withRouter( connect(mapStateToProps, { })( T03 ));

export default T03;
