import React from 'react';
import Accordion from '../components/primitive/Accordion';
import AccordionItem from '../components/primitive/AccordionItem';
import Icon from '../components/primitive/Icon';

import '../../less/dashboard.less';

export default class Dashboard extends React.Component {

    render() {

        return (
            <div className="dashboard">
                <div className="app-width grid-container">
                    <div className="tile col col-abs-2">
                        <h2>Dashboard</h2>
                        <Accordion>
                            <AccordionItem icon={<Icon name="dataset" />} heading="Datasets">
                                <ul className="panel">
                                    <li>
                                        <a href="#" className="active">Dataset 01</a>
                                    </li>
                                    <li>
                                        <a href="#">Dataset 02</a>
                                    </li>
                                    <li>
                                        <a href="#">Dataset 03</a>
                                    </li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem icon={<Icon name="folder" />} heading="Projects">
                                <ul className="panel">
                                    <li>
                                        <a href="#" className="active">Project 01</a>
                                    </li>
                                    <li>
                                        <a href="#">Project 02</a>
                                    </li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="tile col col-abs-3 stretch">
                        <a href="#">
                            <i className="flaticon-multiply"></i>
                        </a>
                        <h2 className="section-title">Models</h2>
                        <form className="details-search">
                            <input className="form-control" placeholder="Search..." type="text"/>
                        </form>
                        <ul className="functions-edit">
                            <li>
                                <a href="#">
                                    <i className="flaticon-add"></i>Add new</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="flaticon-download"></i>Import</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="flaticon-share-1"></i>Share</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="flaticon-garbage-2"></i>Delete</a>
                            </li>
                        </ul>
                        <ul className="functions-public">
                            <li>
                                <a href="#">Personal</a>
                            </li>
                            <li>
                                <span>|</span>
                            </li>
                            <li>
                                <a href="#">Public</a>
                            </li>
                        </ul>
                        <div className="table-responsive">
                            <table className="table table-striped">
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
