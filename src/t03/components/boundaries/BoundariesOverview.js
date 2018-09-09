import * as React from 'react';
import PropTypes from 'prop-types';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../../components/primitive/Icon';
import Button from '../../../components/primitive/Button';
import styleGlobals from 'styleGlobals';
import {BoundaryOverview} from '../index';
import GenericImport from '../../../core/import/GenericImport';

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

const state = {};
state.import = false;

class BoundariesOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            import: false
        };
    }

    toggleImport = () => {
        this.setState({
            import: !this.state.import
        });
    };

    render() {
        const {
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
        let upload = '';

        if (type && !readOnly) {
            upload = (
                <Button
                    type="link"
                    icon={<Icon name="import"/>}
                    onClick={this.toggleImport}
                    style={{marginRight: 10}}
                >
                    Upload
                </Button>
            );
            addNew = (
                <Button
                    icon={<Icon name="add"/>}
                    type="link"
                    onClick={() => createBoundary(property, type)}>
                    Add new
                </Button>
            );
        }

        return (
            <div style={[styles.wrapper]}>
                <div style={[styles.header]}>
                    {upload}
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
                {this.state.import &&
                <GenericImport onClose={this.toggleImport} type={'boundary'} boundaryType={type}/>
                }
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

export default ConfiguredRadium(BoundariesOverview);
