import React from 'react';
import PropTypes from 'prop-types';
import ConfiguredRadium from 'ConfiguredRadium';
import styleGlobals from 'styleGlobals';
import Icon from './Icon';
import { Formatter } from '../../core';

const styles = {
    wrapper: {
        base: {
            display: 'flex',
            alignItems: 'center',
            borderRadius: styleGlobals.dimensions.borderRadius,
            minWidth: 0
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
        },

        disabled: {
            opacity: 0.5,
            cursor: 'not-allowed'
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
        background: 'transparent',
        cursor: 'inherit',
        minWidth: 0
    },

    icon: {
        height: 20,
        width: 20,
        marginLeft: 8
    }
};

@ConfiguredRadium
class Input extends React.Component {
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
            'week',
            'textarea'
        ]),
        appearance: PropTypes.oneOf(['default', 'visibleOnFocus']),
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
            PropTypes.object
        ]),
        disabled: PropTypes.bool,
        cast: PropTypes.func,
        validator: PropTypes.func
    };

    static defaultProps = {
        type: 'text',
        appearance: 'default',
        disabled: false
    };

    defaultHandleChange = e => {
        const { cast, validator, onChange } = this.props;

        let value = e.target.value;

        value = cast ? cast(value) : value;
        value = validator ? validator(value) : value;

        onChange(value, e);
    };

    datetimeHandleDateChange = e => {
        const { onChange, value } = this.props;
        const dateArray = e.target.value.split('-');
        onChange(
            new Date(
                Date.UTC(
                    dateArray[0],
                    dateArray[1] - 1,
                    dateArray[2],
                    value.getUTCHours(),
                    value.getUTCMinutes()
                )
            )
        );
    };

    datetimeHandleTimeChange = e => {
        const { onChange, value } = this.props;
        const timeArray = e.target.value.split(':');
        onChange(
            new Date(
                Date.UTC(
                    value.getUTCFullYear(),
                    value.getUTCMonth(),
                    value.getUTCDate(),
                    timeArray[0],
                    timeArray[1]
                )
            )
        );
    };

    render() {
        const {
            type,
            style,
            inputStyle,
            appearance,
            value,
            disabled,
            onChange, // eslint-disable-line no-unused-vars
            cast, // eslint-disable-line no-unused-vars
            validator, // eslint-disable-line no-unused-vars
            ...rest
        } = this.props;

        return (
            <div
                style={[
                    styles.wrapper.base,
                    styles.wrapper[appearance],
                    disabled && styles.wrapper.disabled,
                    style
                ]}
            >
                {type === 'search' ? (
                    <Icon name="search" style={[styles.icon]} />
                ) : null}

                {(() => {
                    switch (type) {
                        case 'datetime':
                            return (
                                <div style={[styles.datetimeWrapper]}>
                                    <input
                                        style={[styles.input]}
                                        onChange={this.datetimeHandleDateChange}
                                        type="date"
                                        value={Formatter.dateToYmd(value)}
                                        disabled={disabled}
                                        {...rest}
                                    />
                                    <input
                                        style={[styles.input]}
                                        onChange={this.datetimeHandleTimeChange}
                                        type="time"
                                        value={Formatter.dateToTime(value)}
                                        disabled={disabled}
                                        {...rest}
                                    />
                                </div>
                            );
                        case 'textarea':
                            return (
                                <textarea
                                    style={[styles.input, inputStyle]}
                                    onChange={this.defaultHandleChange}
                                    type={type}
                                    value={value}
                                    disabled={disabled}
                                    {...rest}
                                />
                            );
                        default:
                            return (
                                <input
                                    style={[styles.input]}
                                    onChange={this.defaultHandleChange}
                                    type={type}
                                    value={value}
                                    disabled={disabled}
                                    {...rest}
                                />
                            );
                    }
                })()}
            </div>
        );
    }
}

export default Input;
