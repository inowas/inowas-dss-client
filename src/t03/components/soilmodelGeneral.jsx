import React from 'react';
import PropTypes from 'prop-types';

class soilmodelGeneral extends React.Component {

    render () {
        const { soilmodel, readOnly } = this.props;

        return (
            <div className="grid-container">
                <section className="col col-rel-2 stacked">
                    <form>
                        <div className="form-group">
                            <label>WetFct</label>
                            <input disabled={readOnly}
                                   className="input"
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

soilmodelGeneral.propTypes = {
    soilmodel: PropTypes.object.isRequired,
    readOnly: PropTypes.bool.isRequired
};

export default soilmodelGeneral;
