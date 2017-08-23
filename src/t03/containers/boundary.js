import * as React from 'react';
import { PropTypes } from 'react';
import { pure } from 'recompose';

import ConfiguredRadium from 'ConfiguredRadium';
import Icon from '../../components/primitive/Icon';
import Button from '../../components/primitive/Button';
import styleGlobals from 'styleGlobals';
import { newBoundary } from '../../routes';
import { BoundaryOverview } from '../components';

const styles = {
    wrapper: {
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    header: {
        marginBottom: 10,
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
    static propTypes = {
        tool: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        property: PropTypes.string.isRequired,
        type: PropTypes.string,
        boundaries: PropTypes.array.isRequired,
        removeBoundary: PropTypes.func.isRequired
    };

    render() {
        const {
            tool,
            boundaries,
            property,
            type,
            id,
            removeBoundary
        } = this.props;

        let addNew = '';

        if (type) {
            addNew = (
                <Button
                    icon={<Icon name="add" />}
                    type="link"
                    onClick={() => newBoundary(tool, id, property, type)}
                >
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
                        tool={tool}
                        property={property}
                    />
                </div>
            </div>
        );
    }
}

export default pure(BoundariesOverview);
