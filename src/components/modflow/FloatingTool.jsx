import '../../less/floatingTool.less';

import React, { Component, PropTypes } from 'react';

import Icon from '../primitive/Icon';

export default class FloatingTool extends Component {

    static propTypes = {
        children: PropTypes.node,
        close: PropTypes.func.isRequired,
        enableMap: PropTypes.func,
        disableMap: PropTypes.func,
        minimized: PropTypes.bool
    }

    componentWillMount( ) {
        if ( !this.props.minimized ) {
            this.props.disableMap( );
        }
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.minimized !== this.props.minimized ) {
            if ( nextProps.minimized ) {
                nextProps.enableMap( );
            } else {
                nextProps.disableMap( );
            }
        }
    }

    componentWillUnmount( ) {
        this.props.enableMap( );
    }

    render( ) {
        const { children, close, minimized } = this.props;

        if ( children ) {
            return (
                <div className="floatingTool-wrapper" data-minimized={minimized}>
                    <div className="floatingTool">
                        <div className="header">
                            <button className="link" onClick={close}><Icon name="close"/></button>
                        </div>
                        <div className="content">
                            {children}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }

}
