import PropTypes from 'prop-types';
import React from 'react';

import AbstractMt3dPackage from '../../../../core/modflow/mt3d/AbstractMt3dPackage';
import Mt3dPackageFactory from '../../../../core/modflow/mt3d/Mt3dPackageFactory';

class AbstractPackageProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mtPackage: props.mtPackage.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            mtPackage: nextProps.mtPackage.toObject
        });
    }

    handleOnChange = (e) => {
        const {name, value} = e.target;

        return this.setState({
            mtPackage: {
                ...this.state.mtPackage,
                [name]: value
            }
        });
    };

    handleOnBlur = (cast) => (e) => {
        const {name} = e.target;
        let value;

        (typeof cast === 'function') ? value = cast(e.target.value) : value = e.target.value;
        const mtPackage = {...this.state.mtPackage, [name]: value};
        this.setState({mtPackage});
        this.props.onChange(Mt3dPackageFactory.fromData(mtPackage));
    };
}

AbstractPackageProperties.propTypes = {
    mtPackage: PropTypes.instanceOf(AbstractMt3dPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};

export default AbstractPackageProperties;
