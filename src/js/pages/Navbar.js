import React from "react"

export default class NavBar extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Inowas</a>
                        </div>
                        <div id="navbar" className="">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tools <span className="caret"/></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="/#/tools/T09A">DEPTH OF SALTWATER INTERFACE</a></li>
                                        <li><a href="/#/tools/T09B">FRESHWATER-SALTWATER INTERFACE</a></li>
                                        <li><a href="/#/tools/T09C">UPCONING</a></li>
                                        <li><a href="/#/tools/T09D">CRITICAL WELL DISCHARGE</a></li>
                                        <li><a href="/#/tools/T09E">SEA LEVEL RISE</a></li>
                                        <li><a href="/#/tools/scenario-analysis">SCENARIO ANALYSIS</a></li>
                                    </ul>
                                </li>
                                <li><a href="/#/modflow/list">Modflow</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }

}
