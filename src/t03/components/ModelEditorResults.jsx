import React from 'react';
import PropTypes from 'prop-types';
import { ModelEditorResultsHead } from '../containers/index';
import { pure } from 'recompose';

const ModelEditorResults = ({ type, tool }) => {
    return <ModelEditorResultsHead tool={tool} />;
};

ModelEditorResults.propTypes = {
    tool: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};


export default pure(ModelEditorResults);
