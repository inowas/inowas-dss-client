import React from "react"

export default class LandingPage extends React.Component {

    render() {
        return (
            <div className="landingPage-wrapper">
                <div className="container-top">
                    <form className="form-signin">
                        <h2 className="form-signin-heading">Sign up!</h2>
                        <label for="user" className="sr-only">Username</label>
                        <input id="user" className="form-control" placeholder="Username" required="" autoFocus="" type="text"/>
                        <label for="inputPassword" className="sr-only">Password</label>
                        <input id="inputPassword" className="form-control" placeholder="Password" required="" type="password"/>
                        <div className="checkbox">
                            <label>
                                <input value="remember-me" type="checkbox"/>
                                Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Go</button>
                    </form>
                    <div id="startCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#startCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#startCarousel" data-slide-to="1"></li>
                            <li data-target="#startCarousel" data-slide-to="2"></li>
                            <li data-target="#startCarousel" data-slide-to="3"></li>
                        </ol>

                        <div className="carousel-inner" role="listbox">
                            <div className="item active">
                                <img src="../images/landingPage/carousel-slide-01.png" alt="Web Mar Apps" width="558" height="326" className="first-slide"/>
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h2>Web Mar Apps</h2>
                                        <p>Web-based applications for planning, management and optimisation of managed aquifer recharge (MAR) schemes</p>
                                    </div>
                                </div>
                            </div>

                            <div className="item">
                                <img src="../images/landingPage/carousel-slide-01.png" alt="Web Mar Apps" width="558" height="326" className="second-slide"/>
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h2>Web Mar Apps</h2>
                                        <p>Web-based applications for planning, management and optimisation of managed aquifer recharge (MAR) schemes</p>
                                    </div>
                                </div>
                            </div>

                            <div className="item">
                                <img src="../images/landingPage/carousel-slide-01.png" alt="Web Mar Apps" width="558" height="326" className="third-slide"/>
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h2>Web Mar Apps</h2>
                                        <p>Web-based applications for planning, management and optimisation of managed aquifer recharge (MAR) schemes</p>
                                    </div>
                                </div>
                            </div>

                            <div className="item">
                                <img src="../images/landingPage/carousel-slide-01.png" alt="Web Mar Apps" width="558" height="326" className="fourth-slide"/>
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h2>Web Mar Apps</h2>
                                        <p>Web-based applications for planning, management and optimisation of managed aquifer recharge (MAR) schemes</p>
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
                        <h2>Managed Aquifer Recharge</h2>
                        <p className="description">Managed aquifer recharge (MAR) represents the purposeful recharge of an aquifer for later recovery or environmental benefits. A MAR scheme typically includes the following components: (1) water capture zone, (2) pre-treatment, (3) recharge, (4) subsurface storage, (5) recovery, (6) post-treatment, and (7) re-use. To meet site-specific requirements, different techniques are available, making MAR a reliable instrument for sustainable groundwater management.</p>

                        <div id="marCarousel" className="carousel fade" data-ride="carousel" data-interval="2000">
                            <ol className="carousel-indicators">
                                <li data-target="#marCarousel" data-slide-to="0" className="active"></li>
                                <li data-target="#marCarousel" data-slide-to="1"></li>
                                <li data-target="#marCarousel" data-slide-to="2"></li>
                                <li data-target="#marCarousel" data-slide-to="3"></li>
                            </ol>

                            <div className="carousel-inner" role="listbox">

                                <div className="fill fill-app-bg"></div>

                                <div className="item active">
                                    <img src="../images/landingPage/mar-applications-01.png" alt="Web Mar Apps" className="first-slide"/>
                                    <div className="carousel-caption">
                                        <div className="tooltip tooltip-bottom" role="tooltip">
                                            <div className="tooltip-inner">
                                                <p>A02. Maximize natural aquifer storage capacity</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <img src="../images/landingPage/mar-applications-02.png" alt="Web Mar Apps" className="second-slide"/>
                                    <div className="carousel-caption">
                                        <div className="tooltip tooltip-bottom" role="tooltip">
                                            <div className="tooltip-inner">
                                                <p>A02. Maximize natural aquifer storage capacity</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <img src="../images/landingPage/mar-applications-03.png" alt="Web Mar Apps" className="third-slide"/>
                                    <div className="carousel-caption">
                                        <div className="tooltip tooltip-bottom" role="tooltip">
                                            <div className="tooltip-inner">
                                                <p>A02. Maximize natural aquifer storage capacity</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <img src="../images/landingPage/mar-applications-04.png" alt="Web Mar Apps" className="fourth-slide"/>
                                    <div className="carousel-caption">
                                        <div className="tooltip tooltip-bottom" role="tooltip">
                                            <div className="tooltip-inner">
                                                <p>A02. Maximize natural aquifer storage capacity</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

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
                                    <p>Simple tools derived from data mining and empirical correlations</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="panel toolbox-panel-02">
                                <div className="panel-heading"></div>
                                <div className="panel-body text-center">
                                    <p>Practical implementation of analytical equations of groundwater flow</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="panel toolbox-panel-03">
                                <div className="panel-heading"></div>
                                <div className="panel-body text-center">
                                    <p>Reliable simulations using complex numerical flow models (i.e. MODFLOW)</p>
                                </div>
                            </div>
                        </div>
                        <p className="description">The applications are based on a collection of simple, practical and reliable web tools for planning, management and optimization of managed aquifer recharge schemes. The tools of various degrees of complexity are either included in application-specific workflows or used as standalone web-based instruments.</p>
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
                        <a className="btn more" href="#">Read more</a>
                    </div>

                    <div className="row geo-database top-space">
                        <h2>Geo Database</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                        <figure>
                            <img src="../images/landingPage/geo-database-image.png" width="773" height="236" className="" alt=""/>
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
                            <a className="btn more" href="#">Read more</a>
                        </div>

                    </div>

                    <div className="row documentation top-space">
                        <h2>Full documentation</h2>
                        <figure>
                            <img src="../images/landingPage/documentation-image.png" width="1238" height="388" className="" alt=""/>
                        </figure>
                        <p className="top-space">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                        <div className="align-center">
                            <a className="btn more" href="#">Read more</a>
                        </div>
                    </div>

                </div>

                <footer className="footer">
                    <div className="container">

                        <div className="col-md-3 footer-section">
                            <div className="footer-col-header">Applications</div>
                            <ul className="footer-list">

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">A03. Restoration of groundwater levels</a>
                                </li>

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">A05. Assessment of saltwater intrusion</a>
                                </li>

                            </ul>
                        </div>

                        <div className="col-md-3 footer-section">
                            <div className="footer-col-header">Tools</div>
                            <ul className="footer-list">

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">T09. Simple saltwater intrusion equations</a>
                                </li>

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">T03. Numerical model setup (MODFLOW)</a>
                                </li>

                                <li className="footer-list-item">
                                    <a className="footer-list-link" href="#">T07. Application-specific scenarios analyser</a>
                                </li>

                            </ul>
                        </div>

                    </div>

                </footer>
            </div>
        );
    }

}
