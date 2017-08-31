import React, { Component, PropTypes } from 'react';
import { ModelEditorResultsHead } from '../containers/index';
import { pure } from 'recompose';

const ModelEditorResults = ({ type, tool }) => {
    switch (type) {
        case 'heads':
            return <ModelEditorResultsHead tool={tool} />;
        default:
            return null;
    }
};

export default pure(ModelEditorResults);
