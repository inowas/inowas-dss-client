import 'react-select/less/select.less';

import React, { PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import ReactSelect from 'react-select';

const RadiumReactSelect = ConfiguredRadium( ReactSelect );

const Select = ConfiguredRadium( function( props ) {
    return <RadiumReactSelect {...props}/>;
});

export default Select;
