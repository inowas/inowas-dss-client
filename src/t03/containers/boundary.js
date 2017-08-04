import * as React from 'react';
import {PropTypes} from 'react';
import {pure} from 'recompose';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import styleGlobals from 'styleGlobals';
import {DataTable} from "../../core/dataTable";

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
        id: PropTypes.string,
        type: PropTypes.string,
        boundaries: PropTypes.array,
        setEditorState: PropTypes.func
    };

    render () {
        const { boundaries, type, setEditorState } = this.props;

        return (
            <div style={[ styles.wrapper ]}>
                <div style={[ styles.header ]}>
                    <span style={[ styles.type ]}>{type}
                        ({boundaries.length})</span>
                    <button style={styles.headerButton.button} className="link">
                        <Icon style={styles.headerButton.icon} name="add"/>Add new
                    </button>
                    {type === 'wel' &&
                    <button onClick={() => setEditorState( 'wells' )} style={styles.headerButton.button} className="link">
                        <Icon style={styles.headerButton.icon} name="marker"/>View on Map
                    </button>
                    }
                </div>
                <div style={[ styles.body ]}>

                    <DataTable id={this.props.id} tool={'T03'} />
                </div>
            </div>
        );
    }
}


export default pure( BoundariesOverview );
