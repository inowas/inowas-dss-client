import React from 'react';

export default class Info extends React.Component {

    render() {
        return (
            <div className="padding-30">
                <h2>
                    SELECT FLOW DOMAIN
                </h2>

                <div className="center-vertical center-horizontal">
                    <p>
                        The regional system is divided into the two subdomains on either side of the water divide.
                        The water divide is located at <strong>{this.props.data.xwd}m</strong>.
                    </p>
                </div>
            </div>
        )
    }
}