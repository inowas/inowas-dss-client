import * as React from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {Dropdown} from 'semantic-ui-react';
import BoundaryFactory from '../../../core/boundaries/BoundaryFactory';
import Boundary from '../../../core/boundaries/Boundary';

class BoundarySelector extends React.Component {
    handleSelectBoundary = (e, {value}) => {
        return this.props.onChange(value);
    };

    boundaryOptions = () => this.props.boundaries.map(b => ({
        key: b.id,
        value: b.id,
        text: b.name
    }));

    selectedBoundary = () => {
        if (this.props.selected) {
            const boundaryObj = this.props.boundaries.filter(b => b.id === this.props.selected)[0];
            if (boundaryObj.hasOwnProperty('active_cells')) {
                return BoundaryFactory.fromObjectData(boundaryObj);
            }
        }

        return null;
    };

    layerOptions = () => {
        if (this.selectedBoundary() instanceof Boundary) {
            return this.selectedBoundary().affectedLayers.map(l => ({
                key: l,
                value: l,
                text: l
            }));
        }

        return null;
    };

    render() {
        const selectedBoundary = this.selectedBoundary();

        return (
            <div>
                <Dropdown
                    placeholder="Select Boundary"
                    fluid
                    search
                    selection
                    options={this.boundaryOptions()}
                    onChange={this.handleSelectBoundary}
                    value={this.props.selected}
                />

                {selectedBoundary &&
                <Dropdown
                    disabled
                    fluid
                    multiple
                    options={this.layerOptions()}
                    placeholder={'Layers'}
                    selection
                    value={this.selectedBoundary().affectedLayers}
                />
                }

            </div>
        );
    }
}

BoundarySelector.propTypes = {
    boundaries: PropTypes.array.isRequired,
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default pure(BoundarySelector);
