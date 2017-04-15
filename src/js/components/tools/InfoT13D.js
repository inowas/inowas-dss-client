import React from 'react';

export default class Info extends React.Component {

    render() {
        return (
            <div className="padding-30">
                <h2>
                    Select Tool
                </h2>

                <div className="center-vertical center-horizontal">
                    <p>
                        The water divide is located at <strong>{this.props.data.xwd}m</strong>. Proceed with:
                    </p>
                </div>
            </div>
        )
    }
}