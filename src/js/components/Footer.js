import React, { Component } from 'react';

import { Link } from 'react-router';

import '../../less/footer.less';

export default class Slider extends Component {

    render( ) {
        return (
            <footer className="footer">
                <div className="content app-width grid-container">
                    <nav className="col col-abs-1">
                        <ul className="nav">
                            <li>
                                <Link className="link" to={'/impressum'}>Impressum</Link>
                            </li>
                            <li>
                                <a className="link" href="https://tu-dresden.de/bu/umwelt/hydro/inowas/project/kontakt" target="_blank">Contact</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="col col-abs-1">
                        <h3>Developed by</h3>
                        <a href="https://tu-dresden.de/bu/umwelt/hydro/inowas" target="_blank">
                            <img src="../images/logo-inowas.svg" alt="INOWAS logo"/>
                        </a>
                    </div>
                    <div className="col col-abs-1">
                        <h3>Supported by</h3>
                        <a href="https://tu-dresden.de/" target="_blank">
                            <img src="../images/logo-tud.svg" alt="TUD logo"/>
                        </a>
                    </div>
                    <div className="col col-abs-1">
                        <h3>Funded by</h3>
                        <a href="https://www.bmbf.de/en/index.html" target="_blank">
                            <img src="../images/logo-bmbf.svg" alt="Federal Ministry of Education and Research logo"/>
                        </a>
                    </div>
                </div>
            </footer>
        );
    }

}
