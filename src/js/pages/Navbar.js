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
                                        <li><a href="/#/tools/T09C">T09c Upconing</a></li>
                                        <li><a href="/#/modflow/list">T03 Numerical model setup (MODFLOW)</a></li>
                                        <li><a href="/#/scenarioanalysis/list">T07 Application specific scenarios analyzer</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }

}
