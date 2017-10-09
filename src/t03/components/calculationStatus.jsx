import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import styleGlobals from 'styleGlobals';
import { model } from '../selectors/index';
import Icon from '../../components/primitive/Icon';

const styles = {
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },

    listItem: {
        base: {
            padding: styleGlobals.dimensions.spacing.small,
        },
    },
    icon: {
        marginRight: '0.5em'
    }
};

const states = [
    {
        name: 'preprocessing',
        value: model.CALCULATION_STATE_PREPROCESSING,
    },
    {
        name: 'queued',
        value: model.CALCULATION_STATE_QUEUED,
    },
    {
        name: 'started',
        value: model.CALCULATION_STATE_STARTED,
    },
    {
        name: 'finished',
        value: model.CALCULATION_STATE_FINISHED,
    },
];

const status = ({ calculation }) => {
    return (<ul style={[ styles.list, styles.listItem.base ]}>
            {states.map( v => <li key={v.name} style={[ styles.listItem.base ]}>
                <Icon name={calculation.state >= v.value ? 'checked' : 'unchecked'} style={styles.icon}/>
                <span>{v.name}</span>
            </li> )}
        </ul>
    );
};

export default ConfiguredRadium( status );
