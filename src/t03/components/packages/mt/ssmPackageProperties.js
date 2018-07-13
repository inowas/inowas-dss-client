import PropTypes from 'prop-types';
import React from 'react';
import SsmPackage from '../../../../core/modflow/mt3d/ssmPackage';
import {LayoutComponents} from '../../../../core/index';
import AbstractPackageProperties from './AbstractPackageProperties';
import SsmPackageDataTable from './SsmPackageDataTable';
import Stressperiods from '../../../../core/modflow/Stressperiods';

class SsmPackageProperties extends AbstractPackageProperties {

    handleOnSave = () => {
        this.props.onChange(SsmPackage.fromObject(this.state.mtPackage));
    };

    handleAddSubstance = (name) => {
        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);
        ssmPackage.addSubstance(name);
        this.setState({mtPackage: ssmPackage.toObject});
    };

    getData = (stressPeriods) => {
        const dateTimeValues = [];
        stressPeriods.stress_periods.forEach( sp => dateTimeValues.push());
    };

    render() {
        const {readonly, stressPeriods} = this.props;
        const {mtPackage} = this.state;

        if (!stressPeriods) {
            return null;
        }

        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);


        const config = [];
        config.push({property: 'values.0', label: 'sHead'});
        config.push({property: 'values.1', label: 'eHead'});

        return null;

        return (
            <LayoutComponents.Column heading="Data">
                <SsmPackageDataTable
                    config={config}
                    readOnly={this.props.readOnly}
                    rows={boundary.getIndexedDateTimeValues(this.props.opId)}
                    onChange={this.onRowsChange}
                />
            </LayoutComponents.Column>

        );
    }
}

SsmPackageProperties.propTypes = {
    mtPackage: PropTypes.instanceOf(SsmPackage),
    stressPeriods: PropTypes.instanceOf(Stressperiods),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default SsmPackageProperties;
