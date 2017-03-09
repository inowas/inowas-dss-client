import React, {PropTypes, Component} from 'react';

import Icon from './Icon.js';

export default class AccordionItem extends Component {

    static propTypes = {
        icon: PropTypes.object,
        className: PropTypes.string,
        heading: PropTypes.string.isRequired,
        children: PropTypes.object.isRequired,
        index: PropTypes.number,
        active: PropTypes.bool,
        toggleActive: PropTypes.func
    }

    toggleActive = () => {
        this.props.toggleActive(this.props.index);
    }

    render() {
        const {active, className, children} = this.props;

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
                        {children}
                    </div>
                </div>
            </div>
        );
    }

}
