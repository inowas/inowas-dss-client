import React, { PropTypes } from 'react';

import ConfiguredRadium from 'ConfiguredRadium';
import { pure } from 'recompose';
import styleGlobals from 'styleGlobals';
import uuid from 'uuid';

const styles = {
    wrapper: {
        marginBottom: styleGlobals.dimensions.spacing.medium
    },

    inputContainer: {
        display: 'flex'
    },

    input: {
        flex: 1
    },

    inputNotLast: {
        marginRight: styleGlobals.dimensions.spacing.medium
    },

    label: {
        fontWeight: 600,
        marginBottom: styleGlobals.dimensions.spacing.small,
        marginLeft: styleGlobals.dimensions.spacing.medium
    }
};

const InputGroup = ({
    style,
    label,
    labelProps: { style: labelStyle, ...labelProps }, // extract styles from labelProps, keep the rest
    children
}) => {
    // pass styles to every child and make sure it got an id
    const modifiedChildren = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
            style: [
                styles.input,
                index !== React.Children.count(children) - 1 &&
                    styles.inputNotLast,
                child.props.style
            ],
            id: child.props.id || uuid.v4()
        });
    });

    return (
        <div style={[styles.wrapper, style]}>
            {label &&
                <label
                    htmlFor={
                        /* get the id of the first child */
                        React.Children.count(modifiedChildren) >= 1
                            ? React.Children.toArray(modifiedChildren)[0].props
                                  .id
                            : ''
                    }
                    style={[styles.label, labelStyle]}
                    {...labelProps}
                >
                    {label}
                </label>}
            <div style={[styles.inputContainer]}>
                {modifiedChildren}
            </div>
        </div>
    );
};

InputGroup.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.node,
    labelProps: PropTypes.object,
    children: PropTypes.node
};

InputGroup.defaultProps = {
    labelProps: {} // so that destructuring always works
};

export default pure(ConfiguredRadium(InputGroup));
