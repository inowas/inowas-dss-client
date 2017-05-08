import React from 'react';

import '../../less/toolT16.less';

export default class Info extends React.Component {

    render() {
        return (
            <div className="padding-30">
                <h2>
                    Suitable methods
                </h2>

                <div className="center-vertical center-horizontal">
                    <ul className="list-style">
                        <li> D10 = {this.props.data.d10.toFixed(4)} </li>
                        <li> D60 = {this.props.data.d60.toFixed(4)} </li>
                        <li> U = {this.props.data.U.toFixed(2)} </li>
                    </ul>
                </div>
                <div className="center-vertical center-horizontal">
                    <p>
                        The suitable method for this grain type is <strong>Hazen</strong>
                    </p>
                </div>
            </div>
        )
    }
}