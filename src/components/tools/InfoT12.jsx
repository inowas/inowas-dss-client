import React from 'react';

import '../../less/toolT16.less';

export default class Info extends React.Component {

    render() {
        return (
            <div className="padding-30">
                <h2>
                    Results
                </h2>
                <div className="center-vertical center-horizontal">
                    <ul className="list-style">
                        <li> MFi<sub>cor2</sub> = {(this.props.data.MFIcor2.toExponential(2))} s/l<sup>2</sup>
                        </li>
                        <li> v<sub>c</sub> = {(this.props.data.vc).toFixed(2)}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}