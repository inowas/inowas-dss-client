import React from 'react';
import Accordion from '../components/primitive/Accordion';
import AccordionItem from '../components/primitive/AccordionItem';
import Icon from '../components/primitive/Icon';
import StackedNav from '../components/primitive/StackedNav';

import '../../less/dashboard.less';

export default class Dashboard extends React.Component {

    render() {

        return (
            <div className="dashboard">
                <div className="app-width grid-container">
                    <StackedNav>
                        <h2>Dashboard</h2>
                        <Accordion>
                            <AccordionItem icon={< Icon name = "dataset" />} heading="Datasets">
                                <ul className="nav-sub">
                                    <li>
                                        <a className="link" href="#">Dataset 01</a>
                                    </li>
                                    <li>
                                        <a className="link" href="#">Dataset 02</a>
                                    </li>
                                    <li>
                                        <a className="link" href="#">Dataset 03</a>
                                    </li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem icon={< Icon name = "folder" />} heading="Projects">
                                <ul className="nav-sub">
                                    <li>
                                        <a className="link" href="#">Project 01</a>
                                    </li>
                                    <li>
                                        <a className="link" href="#">Project 02</a>
                                    </li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </StackedNav>

                    <div className="tile col col-abs-3 stretch">
                        <h2 className="section-title">Models</h2>
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

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Project</th>
                                        <th>Application</th>
                                        <th>Date created</th>
                                        <th>Created by</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>MAR on Rio Primero</td>
                                        <td>INOWAS</td>
                                        <td>A06</td>
                                        <td>24.10.2006 18:40</td>
                                        <td>Ralf Junghanns</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Hanoi groundwater overexploitation</td>
                                        <td>INOWAS</td>
                                        <td>A03</td>
                                        <td>13.06.2009 15:12</td>
                                        <td>Daniela Via</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Tracer tests in Pirna Copitz</td>
                                        <td>INOWAS</td>
                                        <td>A14</td>
                                        <td>18.07.2012 21:42</td>
                                        <td>Jana Ringleb</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Study on Barranca River</td>
                                        <td>AyA</td>
                                        <td>A06</td>
                                        <td>28.09.2016 15:39</td>
                                        <td>José Bonilla</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
