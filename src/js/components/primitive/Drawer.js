import React from 'react';

import Icon from './Icon.js';

import '../../../less/drawer.less';

export default class Drawer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible
                ? true
                : false
        };
    }

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        const {className, children} = this.props;
        const {visible} = this.state;

        return (
            <div className={'drawer' + ' ' + (className || '')} data-visible={visible}>
                <div className="drawer-content">
                   {children}
                </div>
                <div className="drawer-toggle" onClick={this.toggleVisibility}>
                    <Icon name={visible ? 'arrow_left' : 'arrow_right'} />
                </div>
            </div>
        );
    }

}

Drawer.propTypes = {
    visible: React.PropTypes.bool,
    className: React.PropTypes.string,
    children: React.PropTypes.node
};
