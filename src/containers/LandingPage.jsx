import '../less/landingPage.less';

import Footer from '../components/Footer';
import Navbar from './Navbar';
import Popup from '../components/primitive/Popup';
import Icon from '../components/primitive/Icon';
import React from 'react';
import Slider from '../components/primitive/Slider';
import SliderControl from '../components/primitive/SliderControl';
import SliderControlItem from '../components/primitive/SliderControlItem';
import SliderItem from '../components/primitive/SliderItem';
import carouselSlide01 from '../images/landingPage/carousel-slide-01.png';
import carouselSlide02 from '../images/landingPage/carousel-slide-02.png';
import carouselSlide03 from '../images/landingPage/carousel-slide-03.png';
import carouselSlide04 from '../images/landingPage/carousel-slide-04.png';
import documentationImage from '../images/landingPage/documentation-image.png';
import geoDatabaseImage from '../images/landingPage/geo-database-image.png';
import screenshot01 from '../images/landingPage/screenshot-1.png';
import screenshot02 from '../images/landingPage/screenshot-2.png';
import screenshot03 from '../images/landingPage/screenshot-3.png';
import toolBoxIcon01 from '../images/landingPage/toolbox-icon-01.png';
import toolBoxIcon02 from '../images/landingPage/toolbox-icon-02.png';
import toolBoxIcon03 from '../images/landingPage/toolbox-icon-03.png';
import toolBoxIcon04 from '../images/landingPage/toolbox-icon-04.png';
import toolBoxIcon05 from '../images/landingPage/toolbox-icon-05.png';
import toolBoxIcon06 from '../images/landingPage/toolbox-icon-06.png';
import toolBoxIcon07 from '../images/landingPage/toolbox-icon-07.png';
import toolBoxIcon08 from '../images/landingPage/toolbox-icon-08.png';
import toolBoxIcon09 from '../images/landingPage/toolbox-icon-09.png';
import toolBoxImage01 from '../images/landingPage/toolbox-image-01.png';
import toolBoxImage02 from '../images/landingPage/toolbox-image-02.png';
import toolBoxImage03 from '../images/landingPage/toolbox-image-03.png';

export default class LandingPage extends React.Component {

    state = {
        screenshotsPopupVisible: false,
        screenshotsSliderIndex: 0
    }

    openScreenshotsPopup = (index) => {
        return () => {
            this.setState({
                screenshotsSliderIndex: index,
                screenshotsPopupVisible: true
            });
        };
    }

    closeScreenshotsPopup = () => {
        this.setState({
            screenshotsPopupVisible: false
        });
    }

    render( ) {
        return (
            <div className="application-wrapper landingPage-wrapper">
                <Navbar info='Beta version! Public release in 2018. <a href="https://tu-dresden.de/bu/umwelt/hydro/inowas/about/kontakt">Contact us!</a>' />
                <header className="header">
                    <div className="app-width">
                        <Slider control={<SliderControl><SliderControlItem /><SliderControlItem /><SliderControlItem /><SliderControlItem /></SliderControl>}>

                            <SliderItem>
                                <div className="caption">
                                    <h2>Web MAR Apps</h2>
                                    <p>Web-based applications for planning, management and optimization of managed aquifer recharge (MAR) schemes</p>
                                </div>
                                <div className="image-wrapper">
                                    <img src={carouselSlide01} alt="Web MAR Apps" width="558" height="326"/>
                                </div>
                            </SliderItem>

                            <SliderItem>
                                <div className="caption">
                                    <h2>Web MAR Tools</h2>
                                    <p>Free web-based modeling tools for simulation of processes ocurring during managed aquifer recharge</p>
                                </div>
                                <div className="image-wrapper">
                                    <img src={carouselSlide02} alt="Web MAR Tools" width="558" height="326" className="second-slide"/>
                                </div>
                            </SliderItem>

                            <SliderItem>
                                <div className="caption">
                                    <h2>Web MAR Data</h2>
                                    <p>Free web-based geospatial information system to upload, manage and share MAR-related geospatial and time series data</p>
                                </div>
                                <div className="image-wrapper">
                                    <img src={carouselSlide03} alt="Web MAR Data" width="558" height="326" className="third-slide"/>
                                </div>
                            </SliderItem>

                            <SliderItem>
                                <div className="caption">
                                    <h2>Web MAR Wiki</h2>
                                    <p>Detailed documentation of all applications, tools and database components, including practical examples and references for further read.</p>
                                </div>
                                <div className="image-wrapper">
                                    <img src={carouselSlide04} alt="Web MAR Wiki" width="558" height="326" className="fourth-slide"/>
                                </div>
                            </SliderItem>

                        </Slider>
                    </div>
                </header>

                <div className="app-width content">

                    <div className="row mar">
                        <h2>Free web-based modelling platform</h2>
                        <p className="description align-center">Managed aquifer recharge (MAR) represents the purposeful recharge of an aquifer for later water recovery or for environmental benefits. To meet various site-specific requirements, different water infiltration techniques are available, making MAR a reliable instrument for sustainable groundwater management. The present platform provides a collection of free web-based tools aimed at planning, management and optimization of main components of MAR schemes:
                        </p>

                        <Slider nextPrevNavigation={false} control={<SliderControl><SliderControlItem /><SliderControlItem /><SliderControlItem /><SliderControlItem /></SliderControl>}>
                                <SliderItem className="first">
                                    <div className="tooltip tooltip-bottom" role="tooltip">
                                        A05. Sustain environmental surface water flows
                                    </div>
                                </SliderItem>

                                <SliderItem className="second">
                                    <div className="tooltip tooltip-bottom" role="tooltip">
                                        A12. Design and operational optimization of MAR schemes
                                    </div>
                                </SliderItem>

                                <SliderItem className="third">
                                    <div className="tooltip tooltip-bottom" role="tooltip">
                                        A02. Maximize natural storage capacity
                                    </div>
                                </SliderItem>

                                <SliderItem className="fourth">
                                    <div className="tooltip tooltip-bottom" role="tooltip">
                                        A03. Restoration of groundwater levels
                                    </div>
                                </SliderItem>

                        </Slider>

                        <p className="description align-center">There are 13 applications available on the INOWAS platform that cover most of the challanges encountered at MAR sites, both from the quantitative and qualitative perspective: from optimization of MAR site location (<a href="https://wiki.inowas.hydro.tu-dresden.de/a13-optimisation-of-mar-site-location/" target="_blank">
                                <strong>A11</strong>
                            </a>), assessment of saltwater intrusion (<a href="https://wiki.inowas.hydro.tu-dresden.de/a07-assessment-of-seawater-intrusion/" target="_blank">
                                <strong>A07</strong>
                            </a>), application of MAR for the restoration of groundwater levels in overexploited aquifers (<a href="https://wiki.inowas.hydro.tu-dresden.de/a03-restoration-of-groundwater-levels/" target="_blank">
                                <strong>A03</strong>
                            </a>), for the maximization of natural storage capacity of the aquifers (<a href="https://wiki.inowas.hydro.tu-dresden.de/a02-maximise-natural-storage-capacity/" target="_blank">
                                <strong>A02</strong>
                            </a>), for improvement of water quality (<a href="https://wiki.inowas.hydro.tu-dresden.de/a08-improve-water-quality/" target="_blank">
                                <strong>A08</strong>
                            </a>), through design and operational optimization of MAR schemes (<a href="https://wiki.inowas.hydro.tu-dresden.de/a12-design-optimization-of-mar-schemes/" target="_blank">
                                <strong>A12</strong>
                            </a>), clogging development (<a href="https://wiki.inowas.hydro.tu-dresden.de/a10-clogging-development-assessment/" target="_blank">
                                <strong>A10</strong>
                            </a>), assessment of the risk associated with MAR (<a href="https://wiki.inowas.hydro.tu-dresden.de/a09-risk-assessment/" target="_blank">
                                <strong>A09</strong>
                            </a>) etc.</p>

                        <div className="align-center">
                            <a className="button button-primary more" href="https://wiki.inowas.hydro.tu-dresden.de/category/applications/" target="_blank">Read more</a>
                        </div>

                    </div>

                    <div className="row toolbox">
                        <h2>Toolbox</h2>
                        <div className="grid-container">
                            <div className="col col-rel-1 stretch toolbox-panel-01">
                                <img className="toolbox-image" src={toolBoxImage01} />
                                <div className="panel-body">
                                    <p>
                                        <strong>Simple</strong> tools derived from data mining and empirical correlations
                                    </p>
                                </div>
                            </div>
                            <div className="col col-rel-1 stretch toolbox-panel-02">
                                <img className="toolbox-image" src={toolBoxImage02} />
                                <div className="panel-body">
                                    <p>
                                        <strong>Practical</strong> implementation of analytical equations of groundwater flow
                                    </p>
                                </div>
                            </div>

                            <div className="col col-rel-1 stretch toolbox-panel-03">
                                <img className="toolbox-image" src={toolBoxImage03} />
                                <div className="panel-body">
                                    <p>
                                        <strong>Reliable</strong> simulations using complex numerical flow models (i.e. MODFLOW)
                                    </p>
                                </div>
                                </div>
                        </div>

                        <p className="description align-center">
                            The applications are based on a collection of simple, practical and reliable web-based tools of various degrees of complexity. The tools are either included in application-specific workflows or used as standalone modelling instruments.
                        </p>


                        <div className="toolbox-icons">
                            <h3>Examples of tools</h3>

                            <Slider nextPrevNavigation={false} control={(<SliderControl className="toolbox-slider-control">
                                    <SliderControlItem className="toolbox-slider-control-item"><img src={toolBoxIcon01}/></SliderControlItem>
                                    <SliderControlItem className="toolbox-slider-control-item"><img src={toolBoxIcon02}/></SliderControlItem>
                                    <SliderControlItem className="toolbox-slider-control-item"><img src={toolBoxIcon03}/></SliderControlItem>
                                    <SliderControlItem className="toolbox-slider-control-item"><img src={toolBoxIcon04}/></SliderControlItem>
                                    <SliderControlItem className="toolbox-slider-control-item"><img src={toolBoxIcon05}/></SliderControlItem>
                                    <SliderControlItem className="toolbox-slider-control-item"><img src={toolBoxIcon06}/></SliderControlItem>
                                    <SliderControlItem className="toolbox-slider-control-item"><img src={toolBoxIcon07}/></SliderControlItem>
                                    <SliderControlItem className="toolbox-slider-control-item"><img src={toolBoxIcon08}/></SliderControlItem>
                                    <SliderControlItem className="toolbox-slider-control-item"><img src={toolBoxIcon09}/></SliderControlItem>
                                </SliderControl>)}>

                                <SliderItem>
                                    <div className="carousel-caption">
                                        <h3>T05. Optimisation of ASR well location</h3>
                                        <p>Optimisation algorithm for finding the best location of ASR injection wells resulting in maximum groundwater storage increase for a given injection rate</p>
                                    </div>
                                </SliderItem>

                                <SliderItem>
                                    <div className="carousel-caption">
                                        <h3>T04. GIS-based site suitability mapping</h3>
                                        <p>WebGIS-based multi-criteria decision analysis tool for preliminary ranking of areas that could be suitable for MAR application</p>
                                    </div>
                                </SliderItem>

                                <SliderItem>
                                    <div className="carousel-caption">
                                        <h3>T09. Simple saltwater intrusion equations</h3>
                                        <p>Analytical equations for the analysis and prediction of the location of the saltwater interface in a groundwater system</p>
                                    </div>
                                </SliderItem>

                                <SliderItem>
                                    <div className="carousel-caption">
                                        <h3>T02. Groundwater mounding calculator (Hantush)</h3>
                                        <p>The groundwater mounding calculator solves the Hantush analytical equation for groundwater mounding beneath an infiltration basin</p>
                                    </div>
                                </SliderItem>

                                <SliderItem>
                                    <div className="carousel-caption">
                                        <h3>T08. 1D transport model (Ogata-Banks)</h3>
                                        <p>1D advection-dispersion equation using the Ogata-Banks solution as function of various parameters</p>
                                    </div>
                                </SliderItem>

                                <SliderItem>
                                    <div className="carousel-caption">
                                        <h3>T01. ASR efficiency assessment (Ward)</h3>
                                        <p>Assessment of the suitability of a proposed site for an ASR system based on lateral groundwater flow, dispersive mixing, mixed convection and free aquifer convection</p>
                                    </div>
                                </SliderItem>

                                <SliderItem>
                                    <div className="carousel-caption">
                                        <h3>T03. Numerical model setup (MODFLOW, MT3DMS, SEAWAT)</h3>
                                        <p>Setup a new MODFLOW model for a study area to better understand the local groundwater flow system or as basis for scenario analysis</p>
                                    </div>
                                </SliderItem>

                                <SliderItem>
                                    <div className="carousel-caption">
                                        <h3>T21. Estimation of aquifer storage capacity</h3>
                                        <p>Estimation of aquifer storage capacity based on long-term measurements of aquifer recharge, groundwater extraction, and discharge</p>
                                    </div>
                                </SliderItem>

                                <SliderItem>
                                    <div className="carousel-caption">
                                        <h3>T07. Application-specific scenarios analyzer</h3>
                                        <p>This tool makes use of the output files of the MODFLOW-based model and uses them for the customized analysis of user-defined model scenarios</p>
                                    </div>
                                </SliderItem>

                            </Slider>

                        </div>
                    </div>
                    <div className="align-center">
                        <a className="button button-primary more" href="https://wiki.inowas.hydro.tu-dresden.de/category/tools/">Read more</a>
                    </div>

                    <div className="row geo-database">
                        <h2>Geo Database</h2>

                        <p className="description">
                            A new MAR information system was developed for the storage, management and visualisation of geo-referenced and time series data used for the planning of MAR applications.
                        </p>
                        <figure>
                            <img src={geoDatabaseImage} width="700" height="315" className="" alt=""/>
                        </figure>

                        <div className="grid-container">
                            <div className="col col-rel-1 stretch">
                                <div className="panel geo-panel-01">
                                    <div className="panel-heading">
                                        <Icon name="archive" />
                                    </div>
                                    <div className="panel-body">
                                        <p>The INOWAS Information System was designed considering the necessity to handle different forms of information, including various geographical data types, time-series and others.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-rel-1 stretch">
                                <div className="panel geo-panel-02">
                                    <div className="panel-heading">
                                        <Icon name="folder_open" />
                                    </div>
                                    <div className="panel-body">
                                        <p>Data can be uploaded as raster, shape or raw text files and can be visualised in different ways: as data table, as simple graph or geo-referenced map.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col col-rel-1 stretch">
                                <div className="panel geo-panel-03">
                                    <div className="panel-heading">
                                        <Icon name="dataset" />
                                    </div>
                                    <div className="panel-body">
                                        <p>The data model which is used in the INOWAS Information System is based on the ISO 19156:2011 – “Geographic information — Observations and measurements” standard.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="align-center">
                            <a className="button button-primary more" href="https://kb.inowas.hydro.tu-dresden.de">Read more</a>
                        </div>

                    </div>

                    <div className="row documentation">
                        <h2>Documentation</h2>
                        <figure>
                            <img src={documentationImage} width="1238" height="388" className="" alt=""/>
                        </figure>
                        <p className="description align-center">Detailed documentation of all tools, applications and geo database, including practical examples and references for further read. The documentation can be accessed at any time from the individual pages, providing valuable support for project development.</p>
                        <div className="align-center">
                            <a className="button button-primary more" href="http:/wiki.inowas.hydro.tu-dresden.de">Read more</a>
                        </div>
                    </div>

                    <div className="row screenshots">
                        <h2>Screenshots</h2>
                        <div className="grid-container">
                            <div className="col col-rel-1 stretch">
                                <img  onClick={this.openScreenshotsPopup(0)} src={screenshot01}/>
                            </div>
                            <div className="col col-rel-1 stretch">
                                <img  onClick={this.openScreenshotsPopup(1)} src={screenshot02}/>
                            </div>
                            <div className="col col-rel-1 stretch">
                                <img  onClick={this.openScreenshotsPopup(2)} src={screenshot03}/>
                            </div>
                        </div>

                        <Popup visible={this.state.screenshotsPopupVisible} close={this.closeScreenshotsPopup} width={'80%'}>
                            <Slider activeIndex={this.state.screenshotsSliderIndex} control={<SliderControl><SliderControlItem /><SliderControlItem /><SliderControlItem /></SliderControl>}>

                                <SliderItem>
                                    <img src={screenshot01}/>
                                </SliderItem>

                                <SliderItem>
                                    <img src={screenshot02}/>
                                </SliderItem>

                                <SliderItem>
                                    <img src={screenshot03}/>
                                </SliderItem>

                            </Slider>
                        </Popup>

                        <p className="description align-center">Unified, user-friendly and modern graphic user interface that combines modern design elements with powerful server capabilities for a smooth browser-based modeling experience and reliable simulation results.
                        </p>
                    </div>

                </div>
                <Footer />
            </div>
        );
    }
}
