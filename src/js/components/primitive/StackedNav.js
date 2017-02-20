import React from 'react';

import '../../../less/stackedNav.less';

export default class StackedNav extends React.Component {

    render() {
        const {className, children} = this.props;

        return (
            <div className={'nav-stacked tile col col-abs-2' + ' ' + (className || '')}>
                {children}
            </div>
        );
    }

}

StackedNav.propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.array.isRequired
}
