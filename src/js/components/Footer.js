import React, { Component } from 'react';

import { Link } from 'react-router';

import '../../less/footer.less';

export default class Slider extends Component {

    render( ) {
        return (
            <footer className="footer">
                <div className="content app-width grid-container">
                    <div className="col col-abs-1">
                        <Link className="link" to={'/impressum'}>Impressum</Link>
                    </div>
                    <div className="col col-abs-1">
                        <p>Developed by</p>
                        <a href="https://tu-dresden.de/bu/umwelt/hydro/inowas" target="_blank">
                            <img src="../images/logo-inowas.png" alt="Inowas logo"/>
                        </a>
                    </div>
                    <div className="col col-abs-1">
                        <p>Founded by</p>
                        <a href="https://www.bmbf.de/en/index.html" target="_blank">
                            <img src="../images/logo-bmbf.svg" alt="Federal Ministry of Education and Research logo"/>
                        </a>
                    </div>
                </div>
            </footer>
        );
    }

}
