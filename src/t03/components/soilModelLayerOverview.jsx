import * as React from 'react';
import { pure } from 'recompose';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Button from '../../components/primitive/Button';
import styleGlobals from 'styleGlobals';
import { SoilModelLayerDataTable } from '../components';
import { WebData } from '../../core';

const styles = {
    wrapper: {
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    header: {
        display: 'flex',
        flex: 1,
        marginBottom: 10,
        minHeight: 30
    },

    body: {
        minHeight: 0,
        flex: 1,
        overflow: 'auto'
    },

    type: {
        flex: 1,
        border: '1px solid ' + styleGlobals.colors.graySemilight,
        borderRadius: styleGlobals.dimensions.borderRadius,
        marginRight: 14,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10
    }
};
const SoilModelLayerOverview = ({
    layers,
    property,
    id,
    createLayer,
    removeLayer,
    editLayer,
    addLayerStatus,
    readOnly
}) => {
    return (
        <div style={[styles.wrapper]}>
            <div style={[styles.header]}>
                {!readOnly &&
                <WebData.Component.Loading status={addLayerStatus}>
                    <Button
                        type="link"
                        onClick={createLayer}
                        icon={<Icon name="add"/>}
                    >
                        Add new Layer
                    </Button>
                </WebData.Component.Loading>
                }
            </div>
            <div style={[styles.body]}>
                <SoilModelLayerDataTable
                    rows={layers}
                    id={id}
                    remove={removeLayer}
                    edit={editLayer}
                    property={property}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
};

export default ConfiguredRadium(pure(SoilModelLayerOverview));
