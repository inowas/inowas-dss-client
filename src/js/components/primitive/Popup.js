import React, { PropTypes, Component } from 'react';

import Icon from './Icon.js';

import '../../../less/popup.less';

export default class Popup extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.String,
        close: PropTypes.func
    }

    static defaultProps = {
        visible: false
    }

    render( ) {
        const { visible, children, close, className } = this.props;
        if ( visible ) {
            return (
                <div className={'popup center-vertical center-horizontal' + ' ' + ( className || '' )}>
                    <div className="content tile">
                        <div className="header">
                            <button className="link" onClick={close}><Icon name="close"/></button>
                        </div>
                        <div className="body">
                            {children}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

}
