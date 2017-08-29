import 'react-select-plus/less/select.less';

import React, { PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import ReactSelect from 'react-select-plus';
import { pure } from 'recompose';

const RadiumReactSelect = ConfiguredRadium(ReactSelect);

export const mapOptionValues = options => options.map(option => option.value);

const Select = ({ style, ...props }) => {
    // the inner components of react-select-plus don't use radium, so we have to make sure to pass an object and no array as wrapperStyle prop
    let reducedStyle = style;
    if (style instanceof Array) {
        reducedStyle = style.reduce((acc, val) => ({ ...acc, ...val }), {});
    }

    return <RadiumReactSelect wrapperStyle={reducedStyle} {...props} />;
};

Select.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default pure(ConfiguredRadium(Select));
