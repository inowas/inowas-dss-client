import * as React from 'react';
import {PropTypes} from 'react';
import {pure} from 'recompose';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import styleGlobals from 'styleGlobals';
import {DataTable} from '../../core/dataTable';
import {newBoundary} from '../../routes';

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
    },

    headerButton: {
        button: {
            marginRight: 14
        },

        icon: {
            marginRight: 6
        }
    }
};

@ConfiguredRadium
class BoundariesOverview extends React.PureComponent {

    static propTypes = {
        tool: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        property: PropTypes.string.isRequired,
        type: PropTypes.string,
        boundaries: PropTypes.array.isRequired,
        removeBoundary: PropTypes.func.isRequired
    };

    render() {
        const { tool, boundaries, property, type, id, removeBoundary } = this.props;

        let addNew = '';

        if (type) {
            addNew = (<button style={styles.headerButton.button} className="link" onClick={() => newBoundary(tool, id, property, type)}>
                <Icon style={styles.headerButton.icon} name="add"/>Add new
            </button>);
        }

        return (
            <div style={[ styles.wrapper ]}>
                <div style={[ styles.header ]}>
                    {addNew}
                </div>
                <div style={[ styles.body ]}>
                    <DataTable rows={boundaries} id={id} removeBoundary={removeBoundary} tool={'T03'} />
                </div>
            </div>
        );
    }
}


export default pure( BoundariesOverview );
