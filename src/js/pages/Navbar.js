import React from "react"

import {Link} from "react-router";

export default class NavBar extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar-top">
                        <div className="container">

                            <ul className="level_1" role="menubar">
                                <li className="submenu">
                                    <a href="">
                                        <i className="flaticon-settings-6"></i>Dashboard 
                                    </a>
                                </li>
                                <li className="submenu">
                                    <a href="http://wiki.inowas.hydro.tu-dresden.de">
                                        <i className="flaticon-file"></i>Documentation</a>
                                </li>
                                <li className="submenu">
                                    <a href="">
                                        <i className="flaticon-database-1"></i>Datasets (<strong>18</strong>)
                                    </a>
                                </li>
                                <li className="submenu dropdown">
                                    <a href="" className="dropdown-toggle">
                                        <i className="flaticon-folder-4"></i>Projects (<strong>1</strong>)
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a href="#">INOWAS Project</a>
                                        </li>
                                        <li className="add-new">
                                            <a href="#">+ Add project</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="submenu dropdown">
                                    <a href="" className="dropdown-toggle">
                                        <i className="flaticon-windows-1"></i>Applications (<strong>2</strong>)
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a href="#">A03. Restoration of groundwater levels</a>
                                        </li>
                                        <li>
                                            <a href="#">A05. Assessment of saltwater intrusion</a>
                                        </li>
                                        <li className="add-new">
                                            <a href="#">+ Add application</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="submenu dropdown">
                                    <a href="" className="dropdown-toggle">
                                        <i className="flaticon-controls-4"></i>
                                        Tools (<strong>4</strong>)
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to={'tools/T09B'}>T09_b Freshwater-saltwater interface (Glover equation)</Link>
                                        </li>
                                        <li>
                                            <Link to={'tools/T09C'}>T09_c Upconing</Link>
                                        </li>
                                        <li>
                                            <Link to={'tools/modflow/list'}>T03 Numerical model setup (MODFLOW)</Link>
                                        </li>
                                        <li>
                                            <Link to={'tools/scenarioanalysis/list'}>T07 Application specific scenarios analyzer</Link>
                                        </li>
                                        <li className="add-new">
                                            <a href="#">+ Add tool</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul className="navbar-right">
                                <li>
                                    <a href="">
                                        <i className="flaticon-user"></i>Hey, Ralf Junghanns</a>
                                </li>
                            </ul>

                        </div>
                    </nav>
                </header>
                {this.props.children}
            </div>
        );
    }
}
