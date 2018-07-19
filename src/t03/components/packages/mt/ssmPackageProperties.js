import PropTypes from 'prop-types';
import React from 'react';
import SsmPackage from '../../../../core/modflow/mt3d/ssmPackage';
import {LayoutComponents} from '../../../../core/index';
import AbstractPackageProperties from './AbstractPackageProperties';
import Stressperiods from '../../../../core/modflow/Stressperiods';
import styleGlobals from 'styleGlobals';
import {Button, Dropdown, Form, Icon} from 'semantic-ui-react';
import BoundarySelector from '../../core/BoundarySelector';
import SsmSubstanceEditor from './SsmSubstanceEditor';
import SsmSubstance from '../../../../core/modflow/mt3d/SsmSubstance';
import BoundaryFactory from "../../../../core/boundaries/BoundaryFactory";


const styles = {
    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    rightAlign: {
        textAlign: 'right'
    },

    buttonFix: {
        width: 'auto',
        height: 'auto'
    },

    dropDownWithButtons: {
        marginRight: 0,
        marginLeft: 0,
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    buttonMarginRight: {
        marginRight: 10
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    },

    observationPointSelection: {
        wrapper: {
            display: 'flex',
            marginBottom: styleGlobals.dimensions.spacing.medium,
            alignItems: 'center'
        },

        input: {
            flex: 1,
            marginRight: styleGlobals.dimensions.spacing.medium
        },

        button: {
            paddingTop: styleGlobals.dimensions.spacing.medium,
            paddingBottom: styleGlobals.dimensions.spacing.medium,
            paddingLeft: styleGlobals.dimensions.spacing.medium,
            paddingRight: styleGlobals.dimensions.spacing.medium,
            marginLeft: styleGlobals.dimensions.spacing.medium
        }
    }
};

class SsmPackageProperties extends AbstractPackageProperties {

    constructor(props) {
        super(props);
        this.state.selectedBoundary = null;
        this.state.selectedSubstance = null;
    }

    handleSelectBoundary = boundaryId => {
        this.props.onSelectBoundary(boundaryId);
        return this.setState((prevState) => ({
            selectedBoundary: boundaryId,
            substances: SsmPackage.fromObject(prevState.mtPackage).getSubstancesByBoundaryId(boundaryId)
        }));
    };

    handleSelectSubstance = (e, {value}) => {
        this.setState({selectedSubstance: value});
    };

    get substanceOptions() {
        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);
        return ssmPackage.getSubstancesByBoundaryId(this.state.selectedBoundary).map((b, key) => ({
            key: key,
            value: key,
            text: b.name
        }));
    }

    addSubstance = (name) => {
        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);
        const boundary = this.props.boundaries.filter(b => b.id === this.state.selectedBoundary)[0];
        ssmPackage.addSubstance(
            this.state.selectedBoundary,
            SsmSubstance.create(name, BoundaryFactory.fromObjectData(boundary), this.props.stressPeriods.count)
        );
        this.props.onChange(ssmPackage);
        this.setState({
            mtPackage: ssmPackage.toObject,
            selectedSubstance: ssmPackage.getNumberOfSubstancesByBoundaryId(this.state.selectedBoundary) - 1
        });
    };

    handleChangeSubstance = substance => {
        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);
        ssmPackage.updateSubstance(this.state.selectedBoundary, this.state.selectedSubstance, substance);
        this.props.onChange(ssmPackage);
        return this.setState({mtPackage: ssmPackage.toObject});
    };

    removeSubstance = () => {
        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);
        ssmPackage.removeSubstance(this.state.selectedBoundary, this.state.selectedSubstance);
        this.props.onChange(ssmPackage);
        return this.setState({
            mtPackage: ssmPackage.toObject,
            selectedSubstance: 0
        });
    };

    render() {
        const {boundaries, readonly, stressPeriods} = this.props;

        if (boundaries.length === 0) {
            return <div>Please add some boundaries first.</div>;
        }

        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);
        const substance = ssmPackage.getSubstanceByBoundaryIdAndKey(this.state.selectedBoundary, this.state.selectedSubstance);

        return (
            <div style={styles.columns}>
                <LayoutComponents.Column
                    heading="Boundary"
                    style={[styles.columnNotLast]}
                >
                    <BoundarySelector
                        boundaries={boundaries}
                        onChange={this.handleSelectBoundary}
                        selected={this.state.selectedBoundary}
                    />
                </LayoutComponents.Column>
                <LayoutComponents.Column heading="Substances">
                    <Form>
                        <Form.Group style={styles.dropDownWithButtons}>
                            <Dropdown
                                placeholder="Select Substance"
                                fluid
                                search
                                selection
                                options={this.substanceOptions}
                                onChange={this.handleSelectSubstance}
                                value={this.state.selectedSubstance}
                            />
                            <Button.Group>
                                <Button
                                    style={styles.buttonFix}
                                    icon
                                    onClick={() => this.addSubstance('new substance')}
                                    disabled={readonly}
                                >
                                    <Icon name="add circle"/>
                                </Button>

                                <Button
                                    style={styles.buttonFix}
                                    icon
                                    onClick={() => this.removeSubstance(this.state.selectedSubstance)}
                                    disabled={readonly}
                                >
                                    <Icon name="trash"/>
                                </Button>
                            </Button.Group>
                        </Form.Group>
                    </Form>

                    {(substance instanceof SsmSubstance) && <SsmSubstanceEditor
                        onChange={this.handleChangeSubstance}
                        readOnly={readonly}
                        substance={substance}
                        stressPeriods={stressPeriods}
                    />}
                </LayoutComponents.Column>
            </div>
        );
    }
}

SsmPackageProperties.propTypes = {
    boundaries: PropTypes.array.isRequired,
    stressPeriods: PropTypes.instanceOf(Stressperiods),
    mtPackage: PropTypes.instanceOf(SsmPackage),
    onChange: PropTypes.func.isRequired,
    onSelectBoundary: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};


export default SsmPackageProperties;
