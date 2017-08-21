import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/primitive/Input';
import Button from '../../components/primitive/Button';
import styleGlobals from 'styleGlobals';
import ConfiguredRadium from 'ConfiguredRadium';
import * as filters from '../../calculations/filter';
import Select from '../../components/primitive/Select';
import {last, first} from 'lodash';
import { getInitialLayerState } from '../selectors/model';
import { WebData } from '../../core';

const styles = {
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    columns: {
        display: 'flex',
        flex: 1
    },

    column: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },

    columnFlex1: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },

    columnFlex2: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    columnBody: {
        flex: 1,
        minHeight: 0,
        overflow: 'auto'
    },

    heading: {
        borderBottom: '1px solid ' + styleGlobals.colors.graySemilight,
        fontWeight: 300,
        fontSize: 16,
        textAlign: 'left',
        paddingBottom: 10
    },

    inputBlock: {
        marginTop: 10
    },

    rightAlign: {
        textAlign: 'right'
    },

    absoluteRight: {
        position: 'absolute',
        right: 0
    },

    buttonMarginRight: {
        marginRight: 10
    },

    buttonMarginLeft: {
        marginLeft: 10
    },

    label: {
        fontWeight: 600,
        paddingLeft: 8,
        paddingRight: 8
    },

    input: {
        marginTop: 5
    },

    dateInput: {
        maxWidth: 125
    },

    rateInput: {
        maxWidth: 70
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

const getValueForInput = (value) => value instanceof Array ? (first(value)[0] + '...' + last(value)[1]) : value ;
const getTypeForInput = (value) => value instanceof Array ? 'text' : 'number' ;

@ConfiguredRadium
class SoilmodelLayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            layer: getInitialLayerState()
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return {
                layer: nextProps.layer ? {...prevState.layer, ...nextProps.layer} : prevState.layer,
            };
        });
    }

    handleInputChange = (value, name) => {
        this.setState( (prevState, props) => {
            return {
                ...prevState,
                layer: {
                    ...prevState.layer,
                    [name]: value,
                }
            };
        });
    };

    handleNativeInputChange = (event) => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const filter = target.dataset.filter;

        if (filter) {
            value = filters[filter](value);
        }

        this.setState((prevState) => {
            return {
                ...prevState,
                layer: {
                    ...prevState.layer,
                    [name]: value
                }
            };
        });
    };

    save = () => {
        this.props.onSave(this.state.layer);
    };


    render () {
        const { readOnly, updateLayerStatus } = this.props;
        const { layer } = this.state;

        const processingData = {status: WebData.Selector.getType(updateLayerStatus), errorMessage: WebData.Selector.getErrorMessage(updateLayerStatus)};
        const processing = WebData.Component.Processing(
            <Button onClick={this.save}>Save</Button>
        );

        return (
            <div className="grid-container">
                <section className="col col-rel-2 stacked">
                    <form>
                        <div className="form-group">
                            <label style={styles.label} >Name</label>
                            <Input disabled={readOnly}
                                   className="input"
                                   name="name"
                                   onChange={(value, name) => this.handleInputChange(value, name)}
                                   value={layer.name}
                                   placeholder="Name"/>
                        </div>
                        <div className="form-group">
                            <label style={styles.label} >Description</label>
                            <textarea disabled={readOnly}
                                   className="input"
                                   name="description"
                                   onChange={this.handleNativeInputChange}
                                   value={layer.description}
                                   placeholder="Description"/>
                        </div>
                        {layer.top !== 'undefined' && <div className="form-group">
                            <label style={styles.label} >Top</label>
                            <input disabled={readOnly}
                                   type="number" name="top" className="input"
                                   value={layer.top}
                                   data-filter="filterFloat"
                                   onChange={this.handleNativeInputChange}
                                   placeholder="top"/>
                        </div>}
                        <div className="form-group">
                            <label style={styles.label} >Bottom</label>
                            <input disabled={readOnly}
                                   type={getTypeForInput(layer.botm)} name="botm" className="input"
                                   value={getValueForInput(layer.botm)}
                                   data-filter="filterFloat"
                                   onChange={this.handleNativeInputChange}
                                   placeholder="botm"/>
                        </div>
                        <div className="form-group">
                            <label style={styles.label} >HK</label>
                            <input disabled={readOnly}
                                   type={getTypeForInput(layer.hk)} name="hk" className="input"
                                   value={getValueForInput(layer.hk)}
                                   data-filter="filterFloat"
                                   onChange={this.handleNativeInputChange}
                                   placeholder="hk"/>
                        </div>
                        <div className="form-group">
                            <label style={styles.label} >Hani</label>
                            <input disabled={readOnly}
                                   type={getTypeForInput(layer.hani)} name="hani" className="input"
                                   value={getValueForInput(layer.hani)}
                                   data-filter="filterFloat"
                                   onChange={this.handleNativeInputChange}
                                   placeholder="hani"/>
                        </div>
                        <div className="form-group">
                            <label style={styles.label} >VKA</label>
                            <input disabled={readOnly}
                                   type={getTypeForInput(layer.vka)} name="vka" className="input"
                                   value={getValueForInput(layer.vka)}
                                   data-filter="filterFloat"
                                   onChange={this.handleNativeInputChange}
                                   placeholder="vka"/>
                        </div>
                        <div className="form-group">
                            <label style={styles.label} >Layer Average</label>
                            <Select style={[ styles.input ]} name="layavg" disabled={readOnly}
                                    value={layer.layavg}
                                    onChange={(data) => this.handleInputChange(data ? data.value : undefined, 'layavg')}
                                    options={[
                                        {
                                            value: 0,
                                            label: 'Layer AVG 1'
                                        }, {
                                            value: 1,
                                            label: 'Layer AVG 2'
                                        }, {
                                            value: 2,
                                            label: 'Layer AVG 3'
                                        }
                                    ]}/>
                        </div>
                        <div className="form-group">
                            <label style={styles.label} >laywet</label>
                            <input disabled={readOnly}
                                   type={getTypeForInput(layer.laywet)} name="laywet" className="input"
                                   value={getValueForInput(layer.laywet)}
                                   data-filter="filterFloat"
                                   onChange={this.handleNativeInputChange}
                                   placeholder="laywet"/>
                        </div>
                        <div className="form-group">
                            <label style={styles.label} >ss</label>
                            <input disabled={readOnly}
                                   type={getTypeForInput(layer.ss)} name="ss" className="input"
                                   value={getValueForInput(layer.ss)}
                                   data-filter="filterFloat"
                                   onChange={this.handleNativeInputChange}
                                   placeholder="ss"/>
                        </div>
                        <div className="form-group">
                            <label style={styles.label} >sy</label>
                            <input disabled={readOnly}
                                   type={getTypeForInput(layer.sy)} name="sy" className="input"
                                   value={getValueForInput(layer.sy)}
                                   data-filter="filterFloat"
                                   onChange={this.handleNativeInputChange}
                                   placeholder="sy"/>
                        </div>
                    </form>
                </section>
                <div style={styles.saveButtonWrapper}>
                    {processing(processingData)}
                </div>
            </div>
        );
    }
}

SoilmodelLayer.propTypes = {
    layer: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    updateLayerStatus: PropTypes.object,
};

export default SoilmodelLayer;
