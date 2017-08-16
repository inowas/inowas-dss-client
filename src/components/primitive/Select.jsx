import 'react-select-plus/less/select.less';

import React, { PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import ReactSelect from 'react-select-plus';

const RadiumReactSelect = ConfiguredRadium( ReactSelect );

const Select = ConfiguredRadium( function( props ) {
    return <RadiumReactSelect {...props}/>;
});

export default Select;
