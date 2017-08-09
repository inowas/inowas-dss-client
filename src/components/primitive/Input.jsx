import React, { Component, PropTypes } from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import Icon from './Icon';
import dateFormat from 'dateformat';

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

    datetimeWrapper: {
        maxWidth: '100%'
    },

    input: {
        padding: 8,
        flex: 1,
        maxWidth: '100%',
        border: 0,
        background: 'transparent'
    },

    icon: {
        height: 20,
        width: 20,
        marginLeft: 8
    }
};

@ConfiguredRadium
export default class Input extends Component {

    static propTypes = {
        type: PropTypes.oneOf([
            'checkbox',
            'color',
            'date',
            'datetime',
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
        appearance: PropTypes.oneOf([ 'default', 'visibleOnFocus' ]),
        style: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.object ])
    }

    static defaultProps = {
        type: 'text',
        appearance: 'default'
    };

    defaultHandleChange = e => {
        this.props.onChange( e.target.value, e.target.name, e );
    }

    datetimeHandleDateChange = e => {
        const { onChange, value } = this.props;
        const dateArray = e.target.value.split( '-' );
        onChange(new Date(Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2], value.getUTCHours( ), value.getUTCMinutes( ))));
    }

    datetimeHandleTimeChange = e => {
        const { onChange, value } = this.props;
        const timeArray = e.target.value.split( ':' );
        onChange(new Date(Date.UTC(value.getUTCFullYear( ), value.getUTCMonth( ), value.getUTCDate( ), timeArray[0], timeArray[1])));
    }

    render( ) {
        const {
            type,
            style,
            appearance,
            value,
            onChange, // eslint-disable-line no-unused-vars
            ...rest
        } = this.props;

        return (
            <div style={[ styles.wrapper.base, styles.wrapper[appearance], style ]}>
                {type === 'search'
                    ? <Icon name="search" style={[ styles.icon ]}/>
                    : null}
                {(( ) => {
                    if ( type === 'datetime' ) {
                        return (
                            <div style={[styles.datetimeWrapper]}>
                                <input style={[ styles.input ]} onChange={this.datetimeHandleDateChange} type="date" value={dateFormat( value, 'yyyy-mm-dd', true )} {...rest}/>
                                <input style={[ styles.input ]} onChange={this.datetimeHandleTimeChange} type="time" value={dateFormat( value, 'HH:MM', true )} {...rest}/>
                            </div>
                        );
                    }

                    return ( <input style={[ styles.input ]} onChange={this.defaultHandleChange} type={type} value={value} {...rest}/> );
                })( )}
            </div>
        );
    }
}
