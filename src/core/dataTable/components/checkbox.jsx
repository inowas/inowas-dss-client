import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/primitive/Icon';

const checkbox = ({ props } = {}) => {
    const Checkbox = ({ value, onValue }) => (
        <Icon name={value ? 'checked' : 'unchecked'} onClick={() => onValue(!value)}/>
    );
    Checkbox.propTypes = {
        value: PropTypes.any,
        onClick: PropTypes.func,
        onValue: PropTypes.func
    };

    return Checkbox;
};

export default checkbox;
