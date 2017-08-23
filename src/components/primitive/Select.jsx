import 'react-select-plus/less/select.less';

import React, { PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import ReactSelect from 'react-select-plus';
import { pure } from 'recompose';

const RadiumReactSelect = ConfiguredRadium(ReactSelect);

// REVIEW what are those for?
export const extractSimpleValues = data => data.split(',');
export const hydrateSimpleValues = data => data.join(',');

const Select = ({ style, ...props }) =>
    <RadiumReactSelect wrapperStyle={style} {...props} />;

Select.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default pure(ConfiguredRadium(Select));
