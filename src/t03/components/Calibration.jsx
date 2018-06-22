import React from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import PropTypes from 'prop-types';
import styleGlobals from 'styleGlobals';

import {Container, Header, Segment, Table} from 'semantic-ui-react';
import {
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const styles = {
    columnContainer: {
        display: 'flex',
        marginRight: 10
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

class Calibration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            calibrationData: null
        };
    }

    componentWillReceiveProps(nextProps) {
        const {getFileStatus} = nextProps;

        if (getFileStatus.status === 'loading') {
            return this.setState({
                loading: true
            });
        }

        if (getFileStatus.status === 'success') {
            return this.setState({
                loading: false,
                calibrationData: JSON.parse(getFileStatus.data.replace(/\bNaN\b/g, 'null'))
            });
        }

        return null;
    }

    chartObservedVsCalculatedHeads = ({simulated, observed, deltaStd}) => {
        const data = simulated.map((s, i) => ({y: s, x: observed[i]}));

        const min = Math.floor(Math.min(...observed, ...simulated) / 10) * 10;
        const max = Math.ceil(Math.min(...observed, ...simulated) / 10) * 10;
        const line = [{x: min, y: min}, {x: max, y: max}];
        const linePlusDelta = [{x: min, y: min + deltaStd}, {x: max, y: max + deltaStd}];
        const lineMinusDelta = [{x: min, y: min - deltaStd}, {x: max, y: max - deltaStd}];

        return (
            <Segment raised>
                <ResponsiveContainer width={'100%'} aspect={2.0}>
                    <ScatterChart>
                        <CartesianGrid/>
                        <XAxis dataKey={'x'} type="number" name={'observed'} domain={[min, max]}/>
                        <YAxis dataKey={'y'} type="number" name={'simulated'} domain={['auto', 'auto']}/>
                        <Scatter name={'Observed vs. calculated Heads'} data={data} fill={'#8884d8'}/>
                        <Scatter data={line} line={{stroke: 'black', strokeWidth: 2}} shape={() => null}/>
                        <Scatter data={linePlusDelta} line={{stroke: 'red', strokeWidth: 2}} shape={() => null}/>
                        <Scatter data={lineMinusDelta} line={{stroke: 'red', strokeWidth: 2}} shape={() => null}/>
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                    </ScatterChart>
                </ResponsiveContainer>
            </Segment>
        );
    };

    chartWeightedResidualsVsSimulatedHeads = ({simulated, weightedResiduals, linRegressSW}) => {
        const data = simulated.map((s, i) => ({x: s, y: weightedResiduals[i]}));
        const xMin = Math.floor(Math.min(...simulated) / 10) * 10;
        const xMax = Math.ceil(Math.max(...simulated) / 10) * 10;
        const yMin = xMin * linRegressSW[0] + linRegressSW[1];
        const yMax = xMax * linRegressSW[0] + linRegressSW[1];

        // noinspection JSSuspiciousNameCombination
        const domainY = Math.ceil(Math.max(yMax, yMin));
        const line = [{x: xMin, y: yMin}, {x: xMax, y: yMax}];

        return (
            <Segment raised>
                <ResponsiveContainer width={'100%'} aspect={2.0}>
                    <ScatterChart>
                        <CartesianGrid/>
                        <XAxis dataKey={'x'} type="number" name={'simulated'} domain={[xMin, xMax]}/>
                        <YAxis dataKey={'y'} type="number" name={'weighted'} domain={[-domainY, domainY]}/>
                        <Scatter name={'Weighted residuals vs. simulated heads'} data={data} fill={'black'}/>
                        <Scatter data={line} line={{stroke: 'red', strokeWidth: 2}} shape={() => null}/>
                        <ReferenceLine y={0} stroke="blue" strokeWidth={2}/>
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                    </ScatterChart>
                </ResponsiveContainer>
                <div className="diagram-labels-right">
                    <div className="diagram-label" style={{color: 'red'}}>
                        <p>f(x) = {linRegressSW[0].toFixed(3)}x + {linRegressSW[1].toFixed(3)}</p>
                    </div>
                </div>
            </Segment>
        );
    };

    chartRankedResidualsAgainstNormalProbability = ({npf, rankedResiduals, linRegressRN}) => {
        const data = npf.map((n, i) => ({x: n, y: rankedResiduals[i]}));
        const max = Math.max(
            Math.abs(Math.floor(Math.min(...rankedResiduals, ...npf))),
            Math.ceil(Math.max(...rankedResiduals, ...npf))
        );
        const xDomain = [-max, max];
        const yMin = -max * linRegressRN[0] + linRegressRN[1];
        const yMax = max * linRegressRN[0] + linRegressRN[1];
        const line = [{x: -max, y: yMin}, {x: max, y: yMax}];
        const yDomain = [Math.floor(yMin), Math.ceil(yMax)];

        return (
            <Segment raised>
                <ResponsiveContainer width={'100%'} aspect={2.0}>
                    <ScatterChart>
                        <CartesianGrid/>
                        <XAxis dataKey={'x'} type="number" name={'npf'} domain={xDomain}/>
                        <YAxis dataKey={'y'} type="number" name={'ranked residuals'} domain={yDomain}/>
                        <Scatter name={'NPF vs. ranked residuals'} data={data} fill={'black'}/>
                        <Scatter data={line} line={{stroke: 'red', strokeWidth: 2}} shape={() => null}/>
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                    </ScatterChart>
                </ResponsiveContainer>
                <div className="diagram-labels-right">
                    <div className="diagram-label" style={{color: 'red'}}>
                        <p>f(x) = {linRegressRN[0].toFixed(3)}x + {linRegressRN[1].toFixed(3)}</p>
                    </div>
                </div>
            </Segment>
        );
    };


    render() {
        const {files, loadFile} = this.props;
        const {loading, calibrationData} = this.state;

        if (files.filter(f => f.endsWith('.stat')).length === 0) {
            return (
                <p>No calibration data.</p>
            );
        }

        if (!loading && !calibrationData) {
            loadFile('stat');
        }

        if (!calibrationData) {
            return (
                <p>loading...</p>
            );
        }

        return (
            <div style={[styles.columnContainer]}>
                <Container fluid>
                    <Header size={'large'}>Calculate statistics</Header>
                    <Segment raised>
                        <Table celled>
                            <Table.Body style={{overflowY: 'auto'}}>
                                <Table.Row>
                                    <Table.Cell>Number of data points</Table.Cell>
                                    <Table.Cell>n</Table.Cell>
                                    <Table.Cell>{calibrationData.n}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Maximum Absolute Residual</Table.Cell>
                                    <Table.Cell>R<sub>MAX</sub></Table.Cell>
                                    <Table.Cell>{calibrationData.rMax}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Minimum Absolute Residual</Table.Cell>
                                    <Table.Cell>R<sub>MIN</sub></Table.Cell>
                                    <Table.Cell>{calibrationData.rMin}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Residual Mean</Table.Cell>
                                    <Table.Cell>R<sub>MEAN</sub></Table.Cell>
                                    <Table.Cell>{calibrationData.rMean}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Absolute residual Mean</Table.Cell>
                                    <Table.Cell>|R<sub>MEAN</sub>|</Table.Cell>
                                    <Table.Cell>{calibrationData.absRMean}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Standard error of estimation</Table.Cell>
                                    <Table.Cell>SSE</Table.Cell>
                                    <Table.Cell>{calibrationData.sse}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Root Mean Squared Error</Table.Cell>
                                    <Table.Cell>RMSE</Table.Cell>
                                    <Table.Cell>{calibrationData.rmse}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Normalized Root Mean Squared Error</Table.Cell>
                                    <Table.Cell>NRMSE</Table.Cell>
                                    <Table.Cell>{calibrationData.nrmse}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Correlation Coefficient Pearson R</Table.Cell>
                                    <Table.Cell>R</Table.Cell>
                                    <Table.Cell>{calibrationData.R}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Coefficient of determination</Table.Cell>
                                    <Table.Cell>R<sup>2</sup></Table.Cell>
                                    <Table.Cell>{calibrationData.R2}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>

                    <Header size={'large'}>Simulated vs. Observed Values</Header>
                    {this.chartObservedVsCalculatedHeads({...calibrationData})}

                    <Header size={'large'}>Weighted residuals vs. simulated heads</Header>
                    {this.chartWeightedResidualsVsSimulatedHeads({...calibrationData})}

                    <Header size={'large'}>Ranked residuals against normal probability</Header>
                    {this.chartRankedResidualsAgainstNormalProbability({...calibrationData})}

                </Container>
            </div>
        );
    }
}

Calibration.propTypes = {
    files: PropTypes.array,
    getFileStatus: PropTypes.object.isRequired,
    loadFile: PropTypes.func.isRequired,
};

export default ConfiguredRadium(Calibration);
