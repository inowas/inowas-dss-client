import React, {Component, PropTypes} from 'react';

// import Add from '../../../icons/add.svg';

import '../../../less/icon.less';
import icons from '../../../icons';

export default class Icon extends Component {

    render() {
        const { name, className } = this.props;
        const icon = icons[name];
        if (icon === undefined) {
            // eslint-disable-next-line no-console
            console.warn('Unknown icon: ' + name);
            return null;
        }

        return (
            <span className={'icon' + ' ' + (className || '')}>
                {icon}
            </span>
        );
    }
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
};
