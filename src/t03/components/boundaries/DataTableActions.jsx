import * as React from 'react';
import PropTypes from 'prop-types';
import { Helper } from '../../../core/index';
import Icon from '../../../components/primitive/Icon';
import Button from '../../../components/primitive/Button';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import {pure} from 'recompose';

const styles = {
    wrapper: {
        textAlign: 'right'
    },

    buttonNotLast: {
        marginRight: styleGlobals.dimensions.spacing.large
    }
};

const dataTableActions = ({ onAddWithIncrement, onDelete }) => {
    return (
        <div style={[styles.wrapper]}>
            <Button
                onClick={e => onAddWithIncrement(e, Helper.addDays(1))}
                type="link"
                icon={<Icon name="add" />}
                style={[styles.buttonNotLast]}
            >
                Add Day
            </Button>
            <Button
                onClick={e => onAddWithIncrement(e, Helper.addMonths(1))}
                type="link"
                icon={<Icon name="add" />}
                style={[styles.buttonNotLast]}
            >
                Add Month
            </Button>
            <Button
                onClick={e => onAddWithIncrement(e, Helper.addYears(1))}
                type="link"
                icon={<Icon name="add" />}
                style={[styles.buttonNotLast]}
            >
                Add Year
            </Button>
            <Button
                onClick={onDelete}
                type="link"
                icon={<Icon name="trash" />}
            >
                Delete
            </Button>
        </div>
    );
};

dataTableActions.propTypes = {
    onAddWithIncrement: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default pure(ConfiguredRadium(dataTableActions));
