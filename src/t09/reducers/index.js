import * as T09A from './T09A';
import * as T09B from './T09B';
import * as T09C from './T09C';
import * as T09D from './T09D';
import * as T09E from './T09E';
import * as T09F from './T09F';

import {createSimpleToolReducer} from '../../core/helpers/createSimpleToolReducer';

export const getInitialState = tool => {
    if (tool === 'T09') {
        return null;
    }

    if (tool === 'T09A') {
        return T09A.getInitialState(tool);
    }

    if (tool === 'T09B') {
        return T09B.getInitialState(tool);
    }

    if (tool === 'T09C') {
        return T09C.getInitialState(tool);
    }

    if (tool === 'T09D') {
        return T09D.getInitialState(tool);
    }

    if (tool === 'T09E') {
        return T09E.getInitialState(tool);
    }

    if (tool === 'T09F') {
        return T09F.getInitialState(tool);
    }

    return null;
};

export const createReducer = tool => {
    return createSimpleToolReducer(tool, getInitialState(tool));
};
