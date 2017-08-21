import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/primitive/Input';

class SoilmodelGeneral extends React.Component {

    render () {
        const { soilmodel, readOnly } = this.props;

        return (
            <div className="grid-container">
                <section className="col col-rel-2 stacked">
                    <form>
                        <div className="form-group">
                            <label>WetFct</label>
                            <Input disabled={readOnly}
                                   className="input"
                                   onChange={() => null}
                                   name="name"
                                   value={soilmodel.general.wetfct}
                                   placeholder="Name"/>
                        </div>
                    </form>
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
