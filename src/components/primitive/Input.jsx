import React, { PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import Icon from './Icon';

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid ' + styleGlobals.colors.graySemilight,
        borderRadius: styleGlobals.dimensions.borderRadius,

        ':hover': {
            border: '1px solid ' + styleGlobals.colors.graySemidark,
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
        ...rest
    } = props;
    return (
        <div style={[ styles.wrapper, style ]}>
            {type === 'search'
                ? <Icon name="search" style={[styles.icon]}/>
                : null}
            <input style={[styles.input]} {...rest} type={type}/>
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
    style: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ])
};

Input.defaultProps = {
    type: 'text'
};

export default Input;
