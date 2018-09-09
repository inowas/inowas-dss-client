import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../components/primitive/Input';
import ConfiguredRadium from 'ConfiguredRadium';
import {LayoutComponents} from '../../../core/index';

class SoilmodelGeneral extends React.Component {
    render() {
        const {soilmodel, readOnly} = this.props;

        return (
            <section>
                <LayoutComponents.InputGroup label="WetFct">
                    <Input
                        disabled={readOnly}
                        onChange={() => null}
                        name="name"
                        value={soilmodel.general.wetfct}
                        placeholder="Name"
                    />
                </LayoutComponents.InputGroup>
            </section>
        );
    }
}

SoilmodelGeneral.propTypes = {
    soilmodel: PropTypes.object.isRequired,
    readOnly: PropTypes.bool.isRequired
};

export default ConfiguredRadium(SoilmodelGeneral);
