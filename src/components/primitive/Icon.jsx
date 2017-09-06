import React, {Component, PropTypes} from 'react';

import '../../less/icon.less';
import icons from '../../icons';
import ConfiguredRadium from 'ConfiguredRadium';

@ConfiguredRadium
export default class Icon extends Component {

    static propTypes = {
        style: PropTypes.object,
        name: PropTypes.string.isRequired,
        className: PropTypes.string
    };

    render() {
        const { name, style, className, ...rest } = this.props;
        const icon = icons[name];
        if (icon === undefined) {
            // eslint-disable-next-line no-console
            console.warn('Unknown icon: ' + name);
            return null;
        }

        return (
            <span style={[style]} {...rest} className={'icon' + ' ' + (className || '')}>
                {icon}
            </span>
        );
    }
}
