import React from 'react';
import PropTypes from 'prop-types';

const htmlLabel = ({html}) => {
    return (
        <p dangerouslySetInnerHTML={{__html: html}} />
    );
};

htmlLabel.propTypes = {
    html: PropTypes.string
};

export default htmlLabel;
