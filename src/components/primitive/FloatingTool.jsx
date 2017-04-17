import '../../less/floatingTool.less';

import React, { Component, PropTypes } from 'react';

import Icon from './Icon';

export default class FloatingTool extends Component {

    static propTypes = {
        children: PropTypes.node,
        close: PropTypes.func.isRequired,
        enableMap: PropTypes.func,
        disableMap: PropTypes.func
    }

    componentWillMount() {
        this.props.disableMap();
    }

    componentWillUnmount() {
        this.props.enableMap();
    }

    render( ) {
        const { children, close } = this.props;

        return (
            <div className="floatingTool-wrapper">
                <div className="floatingTool">
                    <div className="header">
                        <button className="link" onClick={close}><Icon name="close"/></button>
                    </div>
                    {children}
                </div>
            </div>
        );
    }

}
