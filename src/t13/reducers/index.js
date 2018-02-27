import * as T13A from './T13A';
import * as T13B from './T13B';
import * as T13C from './T13C';
import * as T13D from './T13D';
import * as T13E from './T13E';
import {createSimpleToolReducer} from '../../core/helpers/createSimpleToolReducer';

export const getInitialState = tool => {
    if (tool === 'T13') {
        return null;
    }

    if (tool === 'T13A') {
        return T13A.getInitialState(tool);
    }

    if (tool === 'T13B') {
        return T13B.getInitialState(tool);
    }

    if (tool === 'T13C') {
        return T13C.getInitialState(tool);
    }

    if (tool === 'T13D') {
        return T13D.getInitialState(tool);
    }

    if (tool === 'T13E') {
        return T13E.getInitialState(tool);
    }

    return null;
};

export const createReducer = tool => {
    return createSimpleToolReducer(tool, getInitialState(tool));
};
