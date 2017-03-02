import React from 'react'
import {Link} from 'react-router';
import Icon from './primitive/Icon';
import '../../less/navbar.less';

export default class NavBar extends React.Component {

    render() {
        return (
            <header className="navbar-wrapper">
                <div className="navbar app-width">
                    <nav className="nav-left">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link className="nav-element" to="/tools">
                                    <Icon name="settings" />Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-element" href="http://wiki.inowas.hydro.tu-dresden.de">
                                    <Icon name="file" />Documentation
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-element" href="http://kb.inowas.hydro.tu-dresden.de">
                                    <Icon name="dataset" />Datasets (<strong>18</strong>)
                                </a>
                            </li>
                            <li className="nav-item nav-item-has-children">
                                <span className="nav-element">
                                    <Icon name="folder" />Projects (<strong>1</strong>)
                                </span>
                                <ul className="nav-list">
                                    <li className="nav-item">
                                        <a className="nav-element" href="#">INOWAS Project</a>
                                    </li>
                                    <li className="nav-item nav-item-add-new">
                                        <a className="nav-element" href="#">+ Add project</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item nav-item-has-children">
                                <span className="nav-element">
                                    <Icon name="layer_vertical" />Applications (<strong>2</strong>)
                                </span>
                                <ul className="nav-list">
                                    <li className="nav-item">
                                        <a className="nav-element" href="#">A03. Restoration of groundwater levels</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-element" href="#">A05. Assessment of saltwater intrusion</a>
                                    </li>
                                    <li className="nav-item nav-item-add-new">
                                        <a className="nav-element" href="#">+ Add application</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item nav-item-has-children">
                                <span className="nav-element">
                                    <Icon name="tools" />Tools (<strong>9</strong>)
                                </span>
                                <ul className="nav-list">
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T02'}>T02 Groundwater mounding (Hantush)</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T06'}>T06 MAR method selection</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T07'}>T07 Scenario Analysis</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T09A'}>T09_a Saltwater intrusion / Depth of freshwater-saltwater interface (Ghyben-Herzberg)</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T09B'}>T09_b Saltwater intrusion / Shape of freshwater-saltwater interface (Glover)</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T09C'}>T09_c Saltwater intrusion / Upconing</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T09D'}>T09_d Saltwater intrusion / Critical well discharge</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T13A'}>T13_a Travel time / Aquifer with no-flow and fixed-head boundaries</Link>
                                    </li>
                                    <li  className="nav-item">
                                        <Link className="nav-element" to={'tools/T13B'}>T13_b Aquifer system with two fixed head boundary conditions</Link>
                                    </li>
                                    <li  className="nav-item">
                                        <Link className="nav-element" to={'tools/T13C'}>T13_c Aquifer system with two fixed head boundary conditions</Link>
                                    </li>
                                    <li  className="nav-item">
                                        <Link  className="nav-element" to={'tools/T13E'}>T13_e Aquifer system with one pumping well at constant rate, no groundwater recharge</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T14A'}>T14_a Fully penetrating stream with no streambed resistance</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T14B'}>T14_b Fully penetrating stream with semipervious layer</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T14C'}>T14_c Partially penetrating stream with streambed resistance</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T14D'}>T14_d Partially penetrating stream in an aquitard overlying a pumped aquifer</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T16A'}>T16_a Saturated hydraulic conductivity based on grain size distribution</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/T18'}>T18 SAT basin design</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/modflow/list'}>T03 Numerical model setup (MODFLOW)</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-element" to={'tools/scenarioanalysis/list'}>T07 Application specific scenarios analyzer</Link>
                                    </li>
                                    <li className="nav-item nav-item-add-new">
                                        <a className="nav-element" href="#">+ Add tool</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <nav className="nav-right">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <a className="nav-element" href="#">
                                    <Icon name="person" />Hey, Ralf Junghanns
                                </a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </header>
        );
    }
}
