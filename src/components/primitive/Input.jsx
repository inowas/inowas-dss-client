import React, { PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import Icon from './Icon';

const styles = {
    wrapper: {

        base: {
            display: 'flex',
            alignItems: 'center',
            borderRadius: styleGlobals.dimensions.borderRadius
        },

        default: {
            border: '1px solid ' + styleGlobals.colors.graySemilight,

            ':hover': {
                border: '1px solid ' + styleGlobals.colors.graySemidark
            }
        },

        visibleOnFocus: {
            border: '1px solid transparent',

            ':focus': {
                border: '1px solid ' + styleGlobals.colors.graySemilight
            },

            ':hover': {
                border: '1px solid ' + styleGlobals.colors.graySemidark
            }
        }

    },

    input: {
        padding: 8,
        flex: 1,
        border: 0,
        background: 'transparent'
    },

    icon: {
        height: 20,
        width: 20,
        marginLeft: 8
    }
};

const Input = ConfiguredRadium( function( props ) {
    const {
        type,
        style,
        onChange,
        appearance,
        ...rest
    } = props;
    return (
        <div style={[ styles.wrapper.base, styles.wrapper[appearance], style ]}>
            {type === 'search'
                ? <Icon name="search" style={[styles.icon]}/>
                : null}
            <input style={[styles.input]} onChange={e => onChange(e.target.value)} {...rest} type={type}/>
        </div>
    );
});

Input.propTypes = {
    type: PropTypes.oneOf([
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week'
    ]),
    appearance: PropTypes.oneOf(['default', 'visibleOnFocus']),
    style: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
    onChange: PropTypes.func
};

Input.defaultProps = {
    type: 'text',
    appearance: 'default'
};

export default Input;
