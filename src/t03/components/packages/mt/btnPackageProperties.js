import PropTypes from 'prop-types';
import React from 'react';
import {Accordion, Form, Icon, Input} from 'semantic-ui-react';

import AbstractPackageProperties from './AbstractPackageProperties';
import BtnPackage from '../../../../core/modflow/mt3d/btnPackage';

const styles = {
    accordionFix: {
        width: 'auto'
    },
    inputFix: {
        padding: '0',
        height: 'auto'
    }
};

const documentation = {
    ncomp: <div>Total number of chemical species included in the current simulation. For single-species simulation, set
        <i>NCOMP</i> = 1.</div>,
    mcomp: <div>Total number of “mobile” species, must be equal to or less than NCOMP. For single-species simulation,
        set <i>MCOMP</i> = 1.</div>,
    prsity: <div>“Effective” porosity of the porous medium in a single porosity system. Note that if a dual porosity
        system is simulated, <i>PRSITY</i> should be specified as the “mobile” porosity, i.e., the ratio of
        interconnected pore
        spaces filled with mobile waters over the bulk volume of the porous medium.</div>,
    icbund: <div>Boundary condition type shared by all species.
        <ul>
            <li><i>ICBUND</i> = 0 inactive concentration cell for all species</li>
            <li><i>ICBUND</i> {"<"} 0 constant concentration cell for all species</li>
            <li><i>ICBUND</i> {">"} 0 active (variable) concentration cell where the concentration will be calculated
            </li>
        </ul>
    </div>,
    sconc: <div>Starting concentration (initial condition) at the beginning of the simulation (unit: ML-3).</div>,
    cinact: <div>Value for indicating an inactive concentration cell (<i>ICBUND</i> = 0). Even if it is not anticipated
        to have
        inactive cells in the model, a value for <i>CINACT</i> still must be submitted.</div>,
    thkmin: <div>Minimum saturated thickness in a cell, expressed as the decimal fraction of the model layer thickness,
        below which the cell is considered inactive. The default value is 0.01 (i.e., 1% of the model layer
        thickness).</div>,
    ifmtcn: <div>Flag indicating whether the calculated concentration should be printed to the standard output text file
        and also serves as a printing-format code if it is printed <ul>
            <li><i>IFMTCN</i> {">"} 0 concentration is printed in the wrap form</li>
            <li><i>IFMTCN</i> {"<"} 0 concentration is printed in the strip form</li>
            <li><i>IFMTCN</i> = 0 concentration is not printed</li>
        </ul></div>,
    ifmtnp: <div>Flag indicating whether the number of particles in each cell (integers) should be printed and also
        serves as a printing-format code if they are printed. The convention is the same as that used for <i>IFMTCN</i>.
    </div>,
    ifmtrf: <div>Flag indicating whether the model-calculated retardation factor should be printed and also serves as a
        printing-format code if it is printed. The convention is the same as that used for <i>IFMTCN</i>.</div>,
    ifmtdp: <div>Flag indicating whether the model-calculated, distance weighted dispersion coefficient should be
        printed and also serves as a printing-format code if it is printed. The convention is the same as that
        used for <i>IFMTCN</i>.</div>,
    nprs: <div>Flag indicating the frequency of the output, and also indicating whether the output frequency is
        specified in terms of total elapsed simulation time or the transport step number. Note that what are
        actually printed or saved is controlled by the input values entered in the preceding record. <ul>
            <li><i>NPRS</i> {">"} 0 simulation results will be printed to the standard output text file</li>
            <li><i>NPRS</i> {"<"} 0 simulation results will be printed or saved whenever the number of transport
                steps is an even multiple of NPRS
            </li>
            <li><i>NPRS</i> = 0 simulation results will not be printed or saved except at the end of simulation</li>
        </ul></div>,
    nprobs: <div>Integer indicating how frequently the concentration at the specified observation points should be
        saved in the observation file. Concentrations are saved every NPROBS step.</div>,
    nprmas: <div>Integer indicating how frequently the mass budget information should be saved in the mass balance
        summary file. Mass budget information is saved every NPRMAS step.</div>,
    dt0: <div>Transport stepsize within each time step of the flow solution. DT0 is interpreted differently depending on
        whether the solution option chosen is explicit or implicit:
        <ul>
            <li>For explicit solutions (i.e., the GCG solver
                is not used), the program will always calculate a maximum transport stepsize which meets the various
                stability criteria. Setting DT0 to zero causes the model calculated transport stepsize to be used in the
                simulation. However, the model-calculated DT0 may not always be optimal. In this situation, DT0 should
                be
                adjusted to find a value that leads to the best results. If DT0 is given a value greater than the
                model-calculated stepsize, the model-calculated stepsize, instead of the user-specified value, will be
                used
                in the simulation.
            </li>
            <li>For implicit solutions (i.e., the GCG solver is used), DT0 is the initial
                transport stepsize. If it is specified as zero, the model-calculated value of DT0, based on the
                user-specified Courant number in the Advection Package, will be used. The subsequent transport stepsize
                may
                increase or remain constant depending on the user specified transport stepsize multiplier TTSMULT and
                the
                solution scheme for the advection term.
            </li>
        </ul>
    </div>,
    mxstrn: <div>Maximum number of transport steps allowed within one time step of the flow solution. If the number of
        transport steps within a flow time step exceeds MXSTRN, the simulation is terminated. </div>,
    ttsmult: <div>Multiplier for successive transport steps within a flow time step, if the Generalized Conjugate
        Gradient (GCG) solver is used and the solution option for the advection term is the standard finite difference
        method. A value between 1.0 and 2.0 is generally adequate. If the GCG package is not used, the transport
        solution is solved explicitly as in the original MT3D code, and TTSMULT is always set to 1.0 regardless of the
        user-specified input. Note that for the particle tracking based solution options and the 3rd-order TVD scheme,
        TTSMULT does not apply.</div>,
    ttsmax: <div>Maximum transport stepsize allowed when transport stepsize multiplier TTSMULT > 1.0. Setting TTSMAX = 0
        imposes no maximum limit.</div>
};

class BtnPackageProperties extends AbstractPackageProperties {
    render() {
        if (!this.state.mtPackage) {
            return null;
        }

        const {readonly} = this.props;
        const {activeIndex, mtPackage} = this.state;

        return (
            <Form>
                <Accordion styled style={styles.accordionFix}>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClickAccordion}>
                        <Icon name='dropdown'/>
                        Basic Transport Parameters
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Total species (Ncomp)</label>
                                <Input
                                    type='number'
                                    name='ncomp'
                                    value={mtPackage.ncomp}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.ncomp, 'NCOMP')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Mobile species (Mcomp)</label>
                                <Input
                                    type={'number'}
                                    name={'mcomp'}
                                    value={mtPackage.mcomp}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.mcomp, 'MCOMP', 'top right')}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Porosity (Prsity)</label>
                                <Input
                                    type={'number'}
                                    name={'prsity'}
                                    value={mtPackage.prsity}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseFloat)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.prsity, 'PRSITY')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Concentration boundary indicator (Icbund)</label>
                                <Input
                                    type={'number'}
                                    name={'icbund'}
                                    value={mtPackage.icbund}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseFloat)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.icbund, 'ICBUND', 'top right')}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Starting concentration (Sconc)</label>
                            <Input
                                type={'number'}
                                name={'sconc'}
                                value={mtPackage.sconc}
                                disabled={readonly}
                                onBlur={this.handleOnBlur(parseFloat)}
                                onChange={this.handleOnChange}
                                style={styles.inputFix}
                                icon={this.renderInfoPopup(documentation.sconc, 'SCONC', 'top right')}
                            />
                        </Form.Field>
                    </Accordion.Content>
                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClickAccordion}>
                        <Icon name='dropdown'/>
                        Inactive Cells
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Inactive concentration cells (Cinact)</label>
                                <Input
                                    type={'number'}
                                    name={'cinact'}
                                    value={mtPackage.cinact}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur((value) => parseFloat(value).toExponential())}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.cinact, 'CINACT')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Minimum saturated thickness (Thkmin)</label>
                                <Input
                                    type={'number'}
                                    name={'thkmin'}
                                    value={mtPackage.thkmin}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseFloat)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.thkmin, 'THKMIN', 'top right')}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Accordion.Content>
                    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClickAccordion}>
                        <Icon name='dropdown'/>
                        Output Control Options
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Ifmtcn</label>
                                <Input
                                    type={'number'}
                                    name={'ifmtcn'}
                                    value={mtPackage.ifmtcn}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.ifmtcn, 'IFMTCN')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Ifmtnp</label>
                                <Input
                                    type={'number'}
                                    name={'ifmtnp'}
                                    value={mtPackage.ifmtnp}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.ifmtnp, 'IFMTNP', 'top right')}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Ifmtrf</label>
                                <Input
                                    type={'number'}
                                    name={'ifmtrf'}
                                    value={mtPackage.ifmtrf}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.ifmtrf, 'IFMTRF')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Ifmtdp</label>
                                <Input
                                    type={'number'}
                                    name={'ifmtdp'}
                                    value={mtPackage.ifmtdp}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.ifmtdp, 'IFMTDP', 'top right')}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Nprs</label>
                                <Input
                                    type={'number'}
                                    name={'nprs'}
                                    value={mtPackage.nprs}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.nprs, 'NPRS')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Nprobs</label>
                                <Input
                                    type={'number'}
                                    name={'nprobs'}
                                    value={mtPackage.nprobs}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.nprobs, 'NPROBS', 'top center')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Nprmas</label>
                                <Input
                                    type={'number'}
                                    name={'nprmas'}
                                    value={mtPackage.nprmas}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.nprmas, 'NPRMAS', 'top right')}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Accordion.Content>
                    <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClickAccordion}>
                        <Icon name='dropdown'/>
                        Transport steps
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Transport stepsize (Dt0)</label>
                                <Input
                                    type={'number'}
                                    name={'dt0'}
                                    value={mtPackage.dt0}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseFloat)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.dt0, 'DT0', 'bottom center')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Maximum transport steps (Mxstrn)</label>
                                <Input
                                    type={'number'}
                                    name={'mxstrn'}
                                    value={mtPackage.mxstrn}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseInt)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.mxstrn, 'MXSTRN', 'top right')}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Transport step multiplier (Ttsmult)</label>
                                <Input
                                    type={'number'}
                                    name={'ttsmult'}
                                    value={mtPackage.ttsmult}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseFloat)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.ttsmult, 'TTSMULT')}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Maximum transport stepsize (Ttsmax)</label>
                                <Input
                                    type={'number'}
                                    name={'ttsmax'}
                                    value={mtPackage.ttsmax}
                                    disabled={readonly}
                                    onBlur={this.handleOnBlur(parseFloat)}
                                    onChange={this.handleOnChange}
                                    style={styles.inputFix}
                                    icon={this.renderInfoPopup(documentation.ttsmax, 'TTSMAX', 'top right')}
                                />
                            </Form.Field>
                        </Form.Group>
                    </Accordion.Content>
                </Accordion>
            </Form>
        );
    }
}

BtnPackageProperties.propTypes = {
    mtPackage: PropTypes.instanceOf(BtnPackage),
    onChange: PropTypes.func.isRequired,
    readonly: PropTypes.bool.isRequired,
};

export default BtnPackageProperties;
