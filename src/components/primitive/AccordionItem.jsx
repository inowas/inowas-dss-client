import React, {PropTypes, Component} from 'react';

import Icon from './Icon';

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

    render() {
        const {active, className, children, toggleActive} = this.props;

        return (
            <div className={'accordion-item' + ' ' + (className || '')} data-active={active}>
                <div className="accordion-item-header" onClick={toggleActive}>
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
