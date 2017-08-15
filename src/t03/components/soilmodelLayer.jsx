import React from 'react';
import PropTypes from 'prop-types';

class soilmodelLayer extends React.Component {

    render () {
        const { layer, readOnly } = this.props;

        return (
            <div className="grid-container">
                <section className="col col-rel-2 stacked">
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input disabled={readOnly}
                                   className="input"
                                   name="name"
                                   value={layer.name}
                                   placeholder="Name"/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input disabled={readOnly}
                                   className="input"
                                   name="name"
                                   value={layer.description}
                                   placeholder="Name"/>
                        </div>
                        <div className="form-group">
                            <label>Hani</label>
                            <input disabled={readOnly}
                                   className="input"
                                   name="name"
                                   value={layer.hani}
                                   placeholder="Name"/>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}

soilmodelLayer.propTypes = {
    layer: PropTypes.object.isRequired,
    readOnly: PropTypes.bool.isRequired
};

export default soilmodelLayer;
