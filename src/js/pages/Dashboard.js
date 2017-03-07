import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import Accordion from '../components/primitive/Accordion';
import AccordionItem from '../components/primitive/AccordionItem';
import { Link } from 'react-router';
import Icon from '../components/primitive/Icon';
import Popup from '../components/primitive/Popup';
import StackedNav from '../components/primitive/StackedNav';
import { fetchDashboardModelsT07 } from '../actions/dashboard';
import Navbar from './Navbar';

import '../../less/dashboard.less';

@connect(( store ) => {
    return ({ dashboardStore: store.dashboard });
})
export default class Dashboard extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        dashboardStore: PropTypes.object.isRequired
    };

    state = {
        active: null,
        popupVisible: false, // TODO remove popup
        navigation: [{
            name: 'Documentation',
            path: '',
            icon: <Icon name="file"/>
        }, {
            name: 'Datasets',
            path: 'http://kb.inowas.hydro.tu-dresden.de',
            icon: <Icon name="dataset"/>
        }, {
            name: 'Projects',
            icon: <Icon name="folder"/>
        }, {
            name: 'Applications',
            icon: <Icon name="layer_vertical"/>
        }, {
            name: 'Tools',
            icon: <Icon name="layer_horizontal_hatched"/>,
            sub: [{
                name: 'T02 Groundwater mounding (Hantush)',
                path: 'tools/T02'
            }, {
                name: 'T06 MAR method selection',
                path: 'tools/T06'
            }, {
                name: 'T07 Scenario Analysis',
                path: 'tools/T07'
            }, {
                name: 'T09_a Saltwater intrusion / Depth of freshwater-saltwater interface (Ghyben-Herzberg)',
                path: 'tools/T09A'
            }, {
                name: 'T09_b Saltwater intrusion / Shape of freshwater-saltwater interface (Glover)',
                path: 'tools/T09B'
            }, {
                name: 'T09_c Saltwater intrusion / Upconing',
                path: 'tools/T09C'
            }, {
                name: 'T09_d Saltwater intrusion / Critical well discharge',
                path: 'tools/T09D'
            }, {
                name: 'T13_a Travel time / Aquifer with no-flow and fixed-head boundaries',
                path: 'tools/T13A'
            }, {
                name: 'T13_b Aquifer system with two fixed head boundary conditions',
                path: 'tools/T13B'
            }, {
                name: 'T13_c Aquifer system with two fixed head boundary conditions',
                path: 'tools/T13C'
            }, {
                name: 'T13_e Aquifer system with one pumping well at constant rate, no groundwater recharge',
                path: 'tools/T13E'
            }, {
                name: 'T14_a Fully penetrating stream with no streambed resistance',
                path: 'tools/T14A'
            }, {
                name: 'T14_b Fully penetrating stream with semipervious layer',
                path: 'tools/T14B'
            }, {
                name: 'T14_c Partially penetrating stream with streambed resistance',
                path: 'tools/T14C'
            }, {
                name: 'T14_d Partially penetrating stream in an aquitard overlying a pumped aquifer',
                path: 'tools/T14D'
            }, {
                name: 'T16_a Saturated hydraulic conductivity based on grain size distribution',
                path: 'tools/T16A'
            }, {
                name: 'T18 SAT basin design',
                path: 'tools/T18'
            }, {
                name: 'T03 Numerical model setup (MODFLOW)',
                path: 'tools/modflow/list'
            }, {
                name: 'T22 Mar portal',
                path: 'tools/T22'
            }]
        }]
    }

    setToolSelection = ( slug ) => {
        return ( ) => {
            if ( slug === 'T07' ) {
                this.props.dispatch(fetchDashboardModelsT07( ));
            }
            this.setState({ active: slug });
        };
    }

    renderTools( tools ) {
        return tools.map(( tool, index ) => {
            return (
                <li key={index}>
                    <button onClick={this.setToolSelection( tool.slug )} className="link" href="#">{tool.slug + ': ' + tool.name}</button>
                </li>
            );
        });
    }

    renderTableRows( basePath, models ) {
        return models.map(( model, index ) => {
            const createdAt = new Date(model.created_at);

            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{model.name}</td>
                    <td>{model.project}</td>
                    <td>{model.application}</td>
                    <td>{dateFormat(createdAt, 'mm/dd/yyyy HH:MM')}</td>
                    <td>{model.user_id}</td>
                    <td>
                        {!model.fake && <Link className="link" to={basePath + model.model_id}>edit</Link>}
                    </td>
                </tr>
            );
        });
    }

    renderDataTable( ) {
        const { active } = this.state;
        const { tools } = this.props.dashboardStore;
        const activeTool = tools.find(t => {
            return t.slug === active;
        });

        if ( active ) {
            return (
                <div className="tile col col-abs-3 stretch">
                    <h2 className="section-title">Models of {activeTool.slug}</h2>
                    <div className="grid-container toolbar">
                        <div className="col col-rel-1 toolbar-search">
                            <input className="input" placeholder="Search..." type="text"/>
                        </div>
                        <ul className="col stretch toolbar-edit">
                            <li>
                                <a className="link" href="#">
                                    <Icon name="add"/>
                                    <span>Add new</span>
                                </a>
                            </li>
                            <li>
                                <a className="link" href="#">
                                    <Icon name="import"/>
                                    <span>Import</span>
                                </a>
                            </li>
                            <li>
                                <a className="link" href="#">
                                    <Icon name="share"/>
                                    <span>Share</span>
                                </a>
                            </li>
                            <li>
                                <a className="link" href="#">
                                    <Icon name="trash"/>
                                    <span>Delete</span>
                                </a>
                            </li>
                        </ul>
                        <ul className="col toolbar-public">
                            <li>
                                <a className="link" href="#">Personal</a>
                            </li>
                            <li>
                                <a className="link" href="#">Public</a>
                            </li>
                        </ul>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Project</th>
                                <th>Application</th>
                                <th>Date created</th>
                                <th>Created by</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableRows( activeTool.path, activeTool.models )}
                        </tbody>
                    </table>
                </div>
            );
        }
        return null;
    }

    closePopup = () => {
        this.setState({
            popupVisible: false
        });
    }

    render( ) {
        const {navigation} = this.state;
        const { tools } = this.props.dashboardStore;

        return (
            <div className="dashboard">
                <Navbar links={navigation} />
                <div className="app-width grid-container">
                    <StackedNav>
                        <h2>Dashboard</h2>
                        <Accordion>
                            <AccordionItem icon={< Icon name = "folder" />} heading="Projects">
                                <ul className="nav-sub">
                                    <li>
                                        <a className="link" href="#">Inowas</a>
                                    </li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem icon={< Icon name = "tools" />} heading="Tools">
                                <ul className="nav-sub">
                                    {this.renderTools( tools )}
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </StackedNav>
                    {this.renderDataTable( )}
                </div>
                <Popup visible={this.state.popupVisible} close={this.closePopup}>
                    <div>Test Popup</div><br /><br /><br /><br /><br />
                    <span>Test</span>
                </Popup>
            </div>
        );
    }
}
