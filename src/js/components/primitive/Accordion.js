import React from 'react';

import '../../../less/accordion.less';

export default class Accordion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: null
        }
    }

    toggleActiveItem = (index) => {
        if(index == this.state.activeIndex) {
            index = null;
        }
        this.setState({activeIndex: index});
    }

    render() {
        const { className } = this.props;
        let index = 0;
        const children = React.Children.map(this.props.children, (child) => {
            const currentIndex = index++;
            const active = (currentIndex == this.state.activeIndex);
            return React.cloneElement(child, {index: currentIndex, active, toggleActive: this.toggleActiveItem});
        });

        return (
            <div className={'accordion' + ' ' + className}>
                {children}
            </div>
        );
    }

}

Accordion.propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.array.isRequired
}
