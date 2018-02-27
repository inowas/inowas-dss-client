import * as T14A from './T14A';
import * as T14B from './T14B';
import * as T14C from './T14C';
import * as T14D from './T14D';
import {createSimpleToolReducer} from '../../core/helpers/createSimpleToolReducer';

export const getInitialState = tool => {
    if (tool === 'T14') {
        return null;
    }

    if (tool === 'T14A') {
        return T14A.getInitialState(tool);
    }

    if (tool === 'T14B') {
        return T14B.getInitialState(tool);
    }

    if (tool === 'T14C') {
        return T14C.getInitialState(tool);
    }

    if (tool === 'T14D') {
        return T14D.getInitialState(tool);
    }

    return null;
};

export const createReducer = tool => {
    return createSimpleToolReducer(tool, getInitialState(tool));
};
