import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Accordion from '../components/primitive/Accordion';
import AccordionItem from '../components/primitive/AccordionItem';
import { Link } from 'react-router';
import Icon from '../components/primitive/Icon';
import Popup from '../components/primitive/Popup';
import StackedNav from '../components/primitive/StackedNav';
import { fetchDashboardModelsT07 } from '../actions/dashboard';

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
        popupVisible: true
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
                    <button onClick={this.setToolSelection( tool.slug )} className="link" href="#">{tool.slug}</button>
                </li>
            );
        });
    }

    renderTableRows( models ) {
        return models.map(( model, index ) => {
            return (
                <tr key={index}>
                    <td>{model.id}</td>
                    <td>{model.name}</td>
                    <td/>
                    <td/>
                    <td>{model.created_at}</td>
                    <td>{model.user_id}</td>
                    <td>
                        <Link className="link" to={'tools/T07/' + model.model_id}>edit</Link>
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
                            {this.renderTableRows( activeTool.models )}
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
        const { tools } = this.props.dashboardStore;

        return (
            <div className="dashboard">
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
