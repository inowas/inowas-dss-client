import React, { PropTypes, Component } from 'react';

import Icon from './Icon.js';

import '../../../less/popup.less';

export default class Popup extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        close: PropTypes.func,
        width: PropTypes.string
    }

    static defaultProps = {
        visible: false
    }

    close = e => {
        if(e.target === this.wrapper) {
            this.props.close();
        }
    }

    render( ) {
        const { visible, children, close, className, width } = this.props;
        if ( visible ) {
            return (
                <div ref={( wrapper ) => {this.wrapper = wrapper;}} className={'popup center-vertical center-horizontal' + ' ' + ( className || '' )} onClick={this.close}>
                    <div className="content tile" style={{width}}>
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
