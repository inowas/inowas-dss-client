import React from 'react';

import Icon from '../primitive/Icon.js';

export default class AccordionItem extends React.Component {

    toggleActive = () => {
        this.props.toggleActive(this.props.index);
    }

    render() {

        const {active, className} = this.props;

        return (
            <div className={'accordion-item' + ' ' + (className || '')} data-active={active}>
                <div className="accordion-item-header" onClick={this.toggleActive}>
                    {this.props.icon}
                    <span className="accordion-item-heading">
                        {this.props.heading}
                    </span>
                    <Icon className="icon-right" name={active ? 'arrow_up' : 'arrow_down'}/>
                </div>
                <div className="accordion-item-body">
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}

AccordionItem.propTypes = {
    icon: React.PropTypes.object,
    className: React.PropTypes.string,
    heading: React.PropTypes.string.isRequired,
    children: React.PropTypes.object.isRequired,
    index: React.PropTypes.number,
    active: React.PropTypes.bool,
    toggleActive: React.PropTypes.func
}
