import * as React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Button from '../../components/primitive/Button';
import styleGlobals from 'styleGlobals';
import { BoundaryOverview } from '../components';

const styles = {
    wrapper: {
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    header: {
        marginBottom: styleGlobals.dimensions.spacing.medium,
        minHeight: 15,
        textAlign: 'right'
    },

    body: {
        minHeight: 0,
        flex: 1,
        overflow: 'auto'
    }
};

@ConfiguredRadium
class BoundariesOverview extends React.PureComponent {

    render() {
        const {
            tool,
            boundaries,
            property,
            type,
            id,
            removeBoundary,
            editBoundary,
            editBoundaryOnMap,
            createBoundary,
            readOnly
        } = this.props;

        let addNew = '';

        if (type && !readOnly) {
            addNew = (
                <Button
                    icon={<Icon name="add" />}
                    type="link"
                    onClick={() => createBoundary(property, type)}>
                    Add new
                </Button>
            );
        }

        return (
            <div style={[styles.wrapper]}>
                <div style={[styles.header]}>
                    {addNew}
                </div>
                <div style={[styles.body]}>
                    <BoundaryOverview
                        rows={boundaries}
                        id={id}
                        removeBoundary={removeBoundary}
                        editBoundary={editBoundary}
                        editBoundaryOnMap={editBoundaryOnMap}
                        property={property}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        );
    }
}

BoundariesOverview.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    type: PropTypes.string,
    boundaries: PropTypes.array.isRequired,
    removeBoundary: PropTypes.func.isRequired,
    editBoundary: PropTypes.func.isRequired,
    editBoundaryOnMap: PropTypes.func.isRequired,
    createBoundary: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    tool: PropTypes.string,
};

export default pure(BoundariesOverview);
