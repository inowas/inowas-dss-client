import React, { Component, PropTypes } from 'react';
import { ModelEditorResultsHead } from '../containers/index';
import { pure } from 'recompose';

const ModelEditorResults = ({ type, tool }) => {
    // switch (type) {
    //     case 'heads':
    //         return <ModelEditorResultsHead tool={tool} />;
    //     default:
    //         return null;
    // }

    return <ModelEditorResultsHead tool={tool} />;
};

export default pure(ModelEditorResults);
