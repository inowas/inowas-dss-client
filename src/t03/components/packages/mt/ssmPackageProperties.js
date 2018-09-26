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
import Boundary from "../../../../core/boundaries/Boundary";


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
        return this.setState({
            selectedBoundary: boundaryId
        });
    };

    handleSelectSubstance = (e, {value}) => {
        this.setState({selectedSubstance: value});
    };

    static substanceOptions(substances) {
        return substances.map((s, key) => ({
            key: key,
            value: s.id,
            text: s.name
        }));
    }

    addSubstance = (name) => {
        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);
        const substance = SsmSubstance.create(name);
        ssmPackage.addSubstance(substance);
        this.props.onChange(ssmPackage);
        this.setState({
            mtPackage: ssmPackage.toObject,
            selectedSubstance: substance.id
        });
    };

    handleChangeSubstance = substance => {
        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);
        ssmPackage.updateSubstance(substance);
        this.props.onChange(ssmPackage);
        return this.setState({mtPackage: ssmPackage.toObject});
    };

    removeSubstance = () => {
        const ssmPackage = SsmPackage.fromObject(this.state.mtPackage);
        ssmPackage.removeSubstance(this.state.selectedSubstance);
        //TODO: Remove substances from optimization?!
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
        const substances = ssmPackage.substances;
        const selectedSubstance = substances.filter(s => s.id === this.state.selectedSubstance)[0];

        let selectedBoundary;
        if (this.state.selectedBoundary) {
            selectedBoundary = BoundaryFactory.fromObjectData(boundaries.filter(b => b.id === this.state.selectedBoundary)[0]);
        }

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
                                options={SsmPackageProperties.substanceOptions(substances)}
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

                    {(selectedSubstance instanceof SsmSubstance) && (selectedBoundary instanceof Boundary) &&
                    <SsmSubstanceEditor
                        boundary={selectedBoundary}
                        onChange={this.handleChangeSubstance}
                        readOnly={readonly}
                        stressPeriods={stressPeriods}
                        substance={selectedSubstance}
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
