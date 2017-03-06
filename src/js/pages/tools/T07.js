import React from 'react';
import {connect} from 'react-redux';

import CrossSectionMap from '../../components/primitive/CrossSectionMap';
import Drawer from '../../components/primitive/Drawer';
import Header from '../../components/tools/Header';
import ScenarioSelect from '../../components/tools/ScenarioSelect';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

import '../../../less/4TileTool.less';
import '../../../less/toolT07.less';

import { fetchDetails } from '../../actions/T07';

@connect((store) => {
    return {tool: store.T07};
})
export default class T07 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scenarios: [
                {
                    baseModelId: 0,
                    id: 0,
                    name: 'name1',
                    description: 'description1',
                    thumbnail: 'scenarios_thumb.png',
                    selected: true
                }, {
                    baseModelId: 0,
                    id: 1,
                    name: 'name2',
                    description: 'description2',
                    thumbnail: 'scenarios_thumb.png',
                    selected: false
                }
            ],

            bounds: [
                [
                    20.942793923555, 105.75218379342
                ],
                [21.100124603334, 105.91170436595]
            ],
            boundingBox: [
                [
                    20.942793923555, 105.75218379342
                ],
                [21.100124603334, 105.91170436595]
            ],
            grid: [
                160, 170
            ],
            crossSection: null
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchDetails(this.props.params.id));
    }

    updateBounds = bounds => {
        this.setState({
            bounds: [
                [
                    bounds.getNorth(), bounds.getEast()
                ],
                [bounds.getSouth(), bounds.getWest()]
            ]
        });
    };

    setCrossSection = (lat, lng) => {
        const {boundingBox, grid} = this.state;

        const dlat = (boundingBox[1][0] - boundingBox[0][0]) / grid[0]; // row width of bounding box grid
        const dlng = (boundingBox[1][1] - boundingBox[0][1]) / grid[1]; // column width of bounding box grid
        const roundedLat = Math.floor(lat / dlat) * dlat; // start of the row

        console.log('Clicked Cell in grid of bounding box:');
        console.log('x:', Math.floor((lng - boundingBox[0][1]) / dlng )); // x coordinate of bounding box grid from 0 to grid[1]-1
        console.log('y:', grid[0] - 1 - Math.floor((lat - boundingBox[0][0]) / dlat )); // y coordinate of bounding box grid from 0 to grid[0]-1

        if (lat < boundingBox[0][0] || lat > boundingBox[1][0] || lng < boundingBox[0][1] || lng > boundingBox[1][1]) {
            // clickedPoint is outside boundingBox
            return;
        }

        this.setState({
            crossSection: [
                [roundedLat, boundingBox[0][1]
                ],
                [
                    roundedLat + dlat,
                    boundingBox[1][1]
                ]
            ]
        });
    };

    toggleSelection = id => {
        const state = {
            ...this.state
        };
        const scenario = state.scenarios.find(s => {
            return s.id == id;
        });
        scenario.selected = !scenario.selected;
        this.setState(state);
    }

    render() {
        const {boundingBox, scenarios, bounds, crossSection} = this.state;

        return (
            <div className="toolT07 app-width">
                <Drawer visible>
                    <ScenarioSelect scenarios={scenarios} toggleSelection={this.toggleSelection}/>
                </Drawer>
                <Header title={'T07. Scenario Analysis'}/>
                <div className="grid-container">
                    <section className="tile col col-min-2 stretch">
                        <CrossSectionMap boundingBox={boundingBox} bounds={bounds} updateBounds={this.updateBounds} setCrossSection={this.setCrossSection} crossSection={crossSection}/>
                    </section>

                    <section className="tile col col-min-2 stretch">
                        <CrossSectionMap boundingBox={boundingBox} bounds={bounds} updateBounds={this.updateBounds} setCrossSection={this.setCrossSection} crossSection={crossSection}/>
                    </section>
                </div>

                <div className="grid-container">
                    <section className="tile col stretch">
                        <ResponsiveContainer width={'100%'} aspect={3}>
                            <LineChart data={[{x: 0, z: 0}, {x: 1, z: 1}, {x: 2, z: 4}]} margin={{
                                top: 20,
                                right: 20,
                                left: 20,
                                bottom: 20
                            }}>
                                <XAxis label="x" type="number" dataKey="x"/>
                                <YAxis label="z" type="number" domain={['auto', 'auto']}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Line isAnimationActive={false} dataKey={'z'} stroke="#1EB1ED" strokeWidth="2"/>
                            </LineChart>
                        </ResponsiveContainer>
                    </section>
                </div>
            </div>
        );
    }
}
