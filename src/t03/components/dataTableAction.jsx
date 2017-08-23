import * as React from 'react';
import { Helper } from '../../core';
import Icon from '../../components/primitive/Icon';
import Button from '../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import {pure} from 'recompose';

const styles = {
    iconInButton: {
        marginRight: styleGlobals.dimensions.spacing.small,
        color: styleGlobals.colors.font
    },

    actions: {
        textAlign: 'right'
    },
};

const dataTableActions = ({ component }) => {
    return (
        <div style={[ styles.actions ]}>
            <Button onClick={(e) => component.onAdd(e, Helper.addDays(1))} type="link">
                <Icon name="add" style={[ styles.iconInButton ]}/>Add D
            </Button>
            <Button onClick={(e) => component.onAdd(e, Helper.addMonths(1))} type="link">
                <Icon name="add" style={[ styles.iconInButton ]}/>Add M
            </Button>
            <Button onClick={(e) => component.onAdd(e, Helper.addYears(1))} type="link">
                <Icon name="add" style={[ styles.iconInButton ]}/>Add Y
            </Button>
            <Button onClick={(e) => component.onDelete(e)} type="link">
                <Icon name="trash" style={[ styles.iconInButton ]}/>Delete
            </Button>
        </div>
    );
};

export default pure(ConfiguredRadium(dataTableActions));
