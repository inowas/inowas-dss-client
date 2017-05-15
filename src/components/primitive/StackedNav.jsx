import React, {Component, PropTypes} from 'react';

import '../../less/stackedNav.less';

export default class StackedNav extends Component {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.array.isRequired
    }

    render() {
        const {className, children, ...rest} = this.props;

        return (
            <div {...rest} className={'nav-stacked tile col col-abs-2' + ' ' + (className || '')}>
                {children}
            </div>
        );
    }

}
