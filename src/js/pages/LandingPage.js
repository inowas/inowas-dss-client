import React from "react"

import Login from "../components/landingPage/Login";

export default class LandingPage extends React.Component {

    render() {
        return (
            <div className="landingPage-wrapper">
                <div className="container-top">
                    <Login />
                    <div id="startCarousel" className="carousel fade" data-ride="carousel" data-interval="4000">
                        <ol className="carousel-indicators">
                            <li data-target="#startCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#startCarousel" data-slide-to="1"></li>
                            <li data-target="#startCarousel" data-slide-to="2"></li>
                            <li data-target="#startCarousel" data-slide-to="3"></li>
                        </ol>

                        <div className="carousel-inner" role="listbox">
                            <div className="item active">
                                <img src="../images/landingPage/carousel-slide-01.png" alt="Web MAR Apps" width="558" height="326" className="first-slide"/>
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h2>Web MAR Apps</h2>
                                        <p>Web-based applications for planning, management and optimization of managed aquifer recharge (MAR) schemes</p>
                                    </div>
                                </div>
                            </div>

                            <div className="item">
                                <img src="../images/landingPage/carousel-slide-02.png" alt="Web MAR Tools" width="558" height="326" className="second-slide"/>
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h2>Web MAR Tools</h2>
                                        <p>Free web-based modeling tools for simulation of processes ocurring during managed aquifer recharge</p>
                                    </div>
                                </div>
                            </div>

                            <div className="item">
                                <img src="../images/landingPage/carousel-slide-03.png" alt="Web MAR Data" width="558" height="326" className="third-slide"/>
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h2>Web MAR Data</h2>
                                        <p>Free web-based geospatial information system to upload, manage and share MAR-related geospatial and time series data</p>
                                    </div>
                                </div>
                            </div>

                            <div className="item">
                                <img src="../images/landingPage/carousel-slide-04.png" alt="Web MAR Wiki" width="558" height="326" className="fourth-slide"/>
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h2>Web MAR Wiki</h2>
                                        <p>Detailed documentation of all applications, tools and database components, including practical examples and references for further read.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <a className="left carousel-control" href="#startCarousel" role="button" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#startCarousel" role="button" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>

                    </div>

                </div>

                <div className="container">

                    <div className="row mar top-space">
                        <h2>Free web-based modelling platform</h2>
                        <p className="description align-center">Managed aquifer recharge (MAR) represents the purposeful recharge of an aquifer for later water recovery or for environmental benefits. To meet various site-specific requirements, different water infiltration techniques are available, making MAR a reliable instrument for sustainable groundwater management. The present platform provides a collection of free web-based tools aimed at planning, management and optimization of main components of MAR schemes: </p>

                        <div id="marCarousel" className="carousel fade" data-ride="carousel" data-interval="3000">
                            <ol className="carousel-indicators">
                                <li data-target="#marCarousel" data-slide-to="0" className="active"></li>
                                <li data-target="#marCarousel" data-slide-to="1"></li>
                                <li data-target="#marCarousel" data-slide-to="2"></li>
                                <li data-target="#marCarousel" data-slide-to="3"></li>
                            </ol>

                            <div className="carousel-inner" role="listbox">

                                <div className="fill fill-app-bg"></div>

                                
                                
                                <div className="item active">
                                    <img src="../images/landingPage/mar-application.png" alt="Web Mar Apps" className="second-slide"/>
                                    <div className="carousel-caption">
                                        <div className="tooltip tooltip-bottom" role="tooltip">
                                            <div className="tooltip-inner">
                                                <p>A05. Sustain environmental surface water flows</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="item">
                                    <img src="../images/landingPage/mar-application.png" alt="Web Mar Apps" className="first-slide"/>
                                    <div className="carousel-caption">
                                        <div className="tooltip tooltip-bottom" role="tooltip">
                                            <div className="tooltip-inner">
                                                <p>A12. Design and operational optimization of MAR schemes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <img src="../images/landingPage/mar-application.png" alt="Web Mar Apps" className="third-slide"/>
                                    <div className="carousel-caption">
                                        <div className="tooltip tooltip-bottom" role="tooltip">
                                            <div className="tooltip-inner">
                                                <p>A02. Maximize natural storage capacity</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <img src="../images/landingPage/mar-application.png" alt="Web Mar Apps" className="fourth-slide"/>
                                    <div className="carousel-caption">
                                        <div className="tooltip tooltip-bottom" role="tooltip">
                                            <div className="tooltip-inner">
                                                <p>A03. Restoration of groundwater levels</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <p className="description align-center">There are 13 applications available on the INOWAS platform that cover most of the challanges and issues encountered at MAR sites, both from the quantitative and qualitative perspective: from optimization of MAR site location (A11), assessment of saltwater intrusion (A07), application of MAR for the restoration of groundwater levels in overexploited aquifers (A03), for the maximization of natural storage capacity of the aquifers (A02), for improvement of water quality (A08), through design and operational optimization of MAR schemes (A12), clogging development (A10), assessment of the risk associated with MAR (A09) etc.</p>
                        
                        <div className="align-center">
                            <a className="btn more" href="#">Read more</a>
                        </div>

                    </div>

                    <div className="row toolbox top-space">
                        <h2>Toolbox</h2>
                        <div className="col-md-4">
                            <div className="panel toolbox-panel-01">            
                                <div className="panel-heading"></div>
                                <div className="panel-body text-center">
                                    <p><strong>Simple</strong> tools derived from data mining and empirical correlations</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="panel toolbox-panel-02">
                                <div className="panel-heading"></div>
                                <div className="panel-body text-center">
                                    <p><strong>Practical</strong> implementation of analytical equations of groundwater flow</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="panel toolbox-panel-03">
                                <div className="panel-heading"></div>
                                <div className="panel-body text-center">
                                    <p><strong>Reliable</strong> simulations using complex numerical flow models (i.e. MODFLOW)</p>
                                </div>
                            </div>
                        </div>
                        <p className="description align-center">The applications are based on a collection of simple, practical and reliable web-based tools of various degrees of complexity. The tools are either included in application-specific workflows or used as standalone modelling instruments.</p>
                        <p className="description align-center"><strong>Examples of tools</strong>:</p>
                    </div>

                    <div className="row toolbox-icons">

                        <div id="toolsCarousel" className="carousel fade" data-ride="carousel" data-interval="false">

                            <ol className="carousel-indicators">
                                <li data-target="#toolsCarousel" data-slide-to="0" className="active">
                                    <img src="../images/icons/toolbox-icon-01.png"/>
                                </li>
                                <li data-target="#toolsCarousel" data-slide-to="1">
                                    <img src="../images/icons/toolbox-icon-02.png"/>
                                </li>
                                <li data-target="#toolsCarousel" data-slide-to="2">
                                    <img src="../images/icons/toolbox-icon-03.png"/>
                                </li>
                                <li data-target="#toolsCarousel" data-slide-to="3">
                                    <img src="../images/icons/toolbox-icon-04.png"/>
                                </li>
                                <li data-target="#toolsCarousel" data-slide-to="4">
                                    <img src="../images/icons/toolbox-icon-05.png"/>
                                </li>
                                <li data-target="#toolsCarousel" data-slide-to="5">
                                    <img src="../images/icons/toolbox-icon-06.png"/>
                                </li>
                                <li data-target="#toolsCarousel" data-slide-to="6">
                                    <img src="../images/icons/toolbox-icon-07.png"/>
                                </li>
                                <li data-target="#toolsCarousel" data-slide-to="7">
                                    <img src="../images/icons/toolbox-icon-08.png"/>
                                </li>
                                <li data-target="#toolsCarousel" data-slide-to="8">
                                    <img src="../images/icons/toolbox-icon-09.png"/>
                                </li>
                            </ol>

                            <div className="carousel-inner" role="listbox">

                                <div className="item active">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h3>T05. Optimisation of ASR well location</h3>
                                            <p>Optimisation algorithm for finding the best location of ASR injection wells resulting in maximum groundwater storage increase for a given injection rate</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h3>T04. GIS-based site suitability mapping</h3>
                                            <p>WebGIS-based multi-criteria decision analysis tool for preliminary ranking of areas that could be suitable for MAR application</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h3>T09. Simple saltwater intrusion equations</h3>
                                            <p>Analytical equations for the analysis and prediction of the location of the saltwater interface in a groundwater system</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h3>T02. Groundwater mounding calculator (Hantush)</h3>
                                            <p>The groundwater mounding calculator solves the Hantush analytical equation for groundwater mounding beneath an infiltration basin</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h3>T08. 1D transport model (Ogata-Banks)</h3>
                                            <p>1D advection-dispersion equation using the Ogata-Banks solution as function of various parameters</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h3>T01. ASR efficiency assessment (Ward)</h3>
                                            <p>Assessment of the suitability of a proposed site for an ASR system based on lateral groundwater flow, dispersive mixing, mixed convection and free aquifer convection</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h3>T03. Numerical model setup (MODFLOW, MT3DMS, SEAWAT)</h3>
                                            <p>Setup a new MODFLOW model for a study area to better understand the local groundwater flow system or as basis for scenario analysis</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h3>T21. Estimation of aquifer storage capacity</h3>
                                            <p>Estimation of aquifer storage capacity based on long-term measurements of aquifer recharge, groundwater extraction, and discharge</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h3>T07. Application-specific scenarios analyzer</h3>
                                            <p>This tool makes use of the output files of the MODFLOW-based model and uses them for the customized analysis of user-defined model scenarios</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="align-center">
                        <a className="btn more" href="http://wiki.inowas.hydro.tu-dresden.de/category/tools/">Read more</a>
                    </div>

                    <div className="row geo-database top-space">
                        <h2>Geo Database</h2>
                        <p className="description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                        <figure>
                            <img src="../images/landingPage/geo-database-image.png" width="700" height="315" className="" alt=""/>
                        </figure>
                        <div className="col-md-4">
                            <div className="panel geo-panel-01">
                                <div className="panel-heading"></div>
                                <div className="panel-body">
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="panel geo-panel-02">
                                <div className="panel-heading"></div>
                                <div className="panel-body">
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="panel geo-panel-03">
                                <div className="panel-heading"></div>
                                <div className="panel-body">
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                                </div>
                            </div>
                        </div>

                        <div className="align-center">
                            <a className="btn more" href="http://kb.inowas.hydro.tu-dresden.de">Read more</a>
                        </div>

                    </div>

                    <div className="row documentation top-space">
                        <h2>Documentation</h2>
                        <figure>
                            <img src="../images/landingPage/documentation-image.png" width="1238" height="388" className="" alt=""/>
                        </figure>
                        <p className="description align-center">Detailed documentation of all tools, applications and geo database, including practical examples and references for further read. The documentation can be accessed at any time from the individual pages, providing valuable support for project development.</p>
                        <div className="align-center">
                            <a className="btn more" href="http:/wiki.inowas.hydro.tu-dresden.de">Read more</a>
                        </div>
                    </div>

                </div>

                <footer className="footer">
                    <div className="container">

                        <div className="col-md-3 footer-section">
                            <div className="footer-col-header">Header 1</div>
                            <ul className="footer-list">

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">Sign up!</a>
                                </li>

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">Log in</a>
                                </li>
                                
                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">My profile</a>
                                </li>
                                
                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">Documentation</a>
                                </li>

                            </ul>
                        </div>

                        <div className="col-md-3 footer-section">
                            <div className="footer-col-header">Documentation</div>
                            <ul className="footer-list">

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">Projects</a>
                                </li>
                                
                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">Applications</a>
                                </li>

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">Tools</a>
                                </li>

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">Database</a>
                                </li>

                            </ul>
                        </div>

                    </div>

                </footer>
            </div>
        );
    }

}
