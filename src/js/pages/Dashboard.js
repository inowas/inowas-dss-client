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
        active: 'T07',
        popupVisible: false,
        navigation: [{
            name: 'Documentation',
            path: 'https://wiki.inowas.hydro.tu-dresden.de/',
            icon: <Icon name="file"/>
        }, {
            name: 'Datasets',
            path: 'https://kb.inowas.hydro.tu-dresden.de',
            icon: <Icon name="dataset"/>
        }/* , {
            name: 'Projects',
            icon: <Icon name="folder"/>
        }, {
            name: 'Applications',
            icon: <Icon name="layer_vertical"/>
        }, {
            name: 'Tools',
            icon: <Icon name="layer_horizontal_hatched"/>
        }*/]
    }

    componentDidMount() {
        this.props.dispatch(fetchDashboardModelsT07( ));
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
                    <td>{model.user_name}</td>
                    <td>
                        {!model.fake && <Link className="link" to={basePath + model.model_id}>use it <Icon name="arrow_right"/></Link>}
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
                                <button className="link" onClick={this.showPopup}>
                                    <Icon name="add"/>
                                    <span>Add new</span>
                                </button>
                            </li>
                            <li>
                                <button className="link" onClick={this.showPopup}>
                                    <Icon name="import"/>
                                    <span>Import</span>
                                </button>
                            </li>
                            <li>
                                <button className="link" onClick={this.showPopup}>
                                    <Icon name="share"/>
                                    <span>Share</span>
                                </button>
                            </li>
                            <li>
                                <button className="link" onClick={this.showPopup}>
                                    <Icon name="trash"/>
                                    <span>Delete</span>
                                </button>
                            </li>
                        </ul>
                        <ul className="col toolbar-public">
                            {/* <li>
                                <a className="link" href="#">Personal</a>
                            </li>*/}
                            <li>
                                <button className="link">Public</button>
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

    showPopup = () => {
        this.setState({
            popupVisible: true
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
                        <Accordion firstActive={1}>
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
                    <h2>Warning</h2>
                    <p>
                        You don't have the permissions to do this.
                    </p>
                </Popup>
            </div>
        );
    }
}
