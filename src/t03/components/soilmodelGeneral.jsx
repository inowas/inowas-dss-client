import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/primitive/Input';
import ConfiguredRadium from 'ConfiguredRadium';
import { LayoutComponents } from '../../core';

@ConfiguredRadium
class SoilmodelGeneral extends React.Component {
    render() {
        const { soilmodel, readOnly } = this.props;

        return (
            <div>
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
            </div>
        );
    }
}

SoilmodelGeneral.propTypes = {
    soilmodel: PropTypes.object.isRequired,
    readOnly: PropTypes.bool.isRequired
};

export default SoilmodelGeneral;
