import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import { pure } from 'recompose';
import styleGlobals from 'styleGlobals';
import { LayoutComponents } from '../../core';
import Input from '../../components/primitive/Input';

const styles = {
    columnContainer: {
        display: 'flex'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    },

    expandVertical: {
        flex: 1
    },
};

const optimizationParameters = ({ model, route, routeType }) => {
    return (<div style={[ styles.columnContainer ]}>
        <LayoutComponents.Column heading="Parameters" style={[ styles.columnNotLast ]}>
            <form>
                <LayoutComponents.InputGroup label="Number of generations of genetic algorithm">
                    <Input
                        value={100}
                        min={1}
                        max={100}
                        placeholder="ngen"
                    />
                </LayoutComponents.InputGroup>
                <LayoutComponents.InputGroup label="Population size of genetic algorithm">
                    <Input
                        value={100}
                        min={2}
                        max={100}
                        placeholder="pop_size"
                    />
                </LayoutComponents.InputGroup>
                <LayoutComponents.InputGroup label="Probability of individual to be produced by mutation">
                    <Input
                        value={0.1}
                        min={0}
                        max={1}
                        placeholder="mutpb"
                    />
                </LayoutComponents.InputGroup>
            </form>
        </LayoutComponents.Column>
    </div>);
};

export default pure( ConfiguredRadium( optimizationParameters ) );
