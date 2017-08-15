import React from 'react';

export default class Info extends React.Component {

    renderCoWarning = () => {
        if (this.props.info.CoToHigh) {
            return <p>
                <i className="glyphicon glyphicon-warning-sign pull-right"/>
                C<sub>o</sub> is too high and a better pre-treatment is necessary.
            </p>
        }else {
            return <p>
                <i className="glyphicon glyphicon-warning-sign pull-right"/>
                C<sub>o</sub> is within acceptable loading.
            </p>
        }
    }

    renderCnWarning = () => {
        if (this.props.info.CnToHigh) {
            return <p>
                <i className="glyphicon glyphicon-warning-sign pull-right"/>
                C<sub>n</sub> is too high and a better pre-treatment is necessary.
            </p>
        }else {
            return <p>
                <i className="glyphicon glyphicon-warning-sign pull-right"/>
                C<sub>n</sub> is within acceptable loading.
            </p>
        }
    }

    renderText() {
        const {AH, AN, AO} = this.props.info
        const maxA = Math.max(AH, AN, AO);

        // if (maxA == AH) {
        //     return <p>
        //         The estimated field area is {maxA.toFixed(2)}m² and is calculated based on the maximum infiltration rate. The areas calculated based on limiting nitrogen and organic loading rates are {AN.toFixed(2)}
        //         and {AO.toFixed(2)}m², respectively. The area can be reduced by lowering the flow rate (Q).
        //     </p>
        // } else if (maxA == AN) {
        //     return <p>
        //         The estimated field area is {maxA.toFixed(2)}m² and is calculated based on the nitrogen limiting factor. The areas calculated based on limiting infiltration rate and organic loading rate are {AH.toFixed(2)}
        //         and {AO.toFixed(2)}m², respectively. The area can be reduced by lowering the flow rate (Q) or by the pre-treatment of infiltration water for the reduction of nitrogen concentration.
        //     </p>
        // } else {
        //     return <p>
        //         The estimated field area is {maxA.toFixed(2)}m² and is calculated based on the organic limiting factor. The areas calculated based on maximum infiltration rate and limiting nitrogen rate are {AH.toFixed(2)}
        //         and {AN.toFixed(2)}m², respectively. The area can be reduced by lowering the flow rate (Q) or by the pre-treatment of infiltration water for the reduction of organic matter concentration.
        //     </p>
        // }
        if (maxA == AH) {
            return <p>
                <b>Infiltration rate</b> is defining the estimated field area. The area can be reduced by lowering the flow rate (Q).
            </p>
        } else if (maxA == AN) {
            return <p>
            <b>Nitrogen loading</b> is defining the estimated field area. The area can be reduced by lowering the flow rate (Q) or by the pre-treatment of infiltration water for the reduction of nitrogen concentration.
            </p>
        } else {
            return <p>
            <b>BOD loading</b> is defining the estimated field area. The area can be reduced by lowering the flow rate (Q) or by the pre-treatment of infiltration water for the reduction of organic matter concentration.
            </p>
        }
    }

    render() {
        return (
            <div className="padding-30">
                {/*<h2>*/}
                    {/*Status*/}
                {/*</h2>*/}

                <div >
                    <div>
                        {this.renderCoWarning()}
                        {this.renderCnWarning()}
                        {/*{this.renderText()}*/}
                        <p> The required area calculated based on: </p>
                    </div>
                </div>
                <div>
                    <ul >
                        <li> Infiltration rate = {this.props.info.AH.toFixed(2)} m<sup>2</sup></li>
                        <li> BOD loading = {this.props.info.AO.toFixed(2)} m<sup>2</sup></li>
                        <li> Nitrogen loading = {this.props.info.AN.toFixed(2)} m<sup>2</sup> </li>
                    </ul>
                </div>
                <div className="center-vertical center-horizontal">
                    {this.renderText()}
                </div>
            </div>
        )

    }
}
