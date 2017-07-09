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
                        <li> MFi<sub>cor2</sub> = <strong>{(this.props.data.MFIcor2.toExponential(2))}</strong> s/l<sup>2</sup>
                        </li>
                        {/*<li> v<sub>c</sub> = <strong>{(this.props.data.vc).toFixed(2)}</strong> m/year*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        )
    }
}