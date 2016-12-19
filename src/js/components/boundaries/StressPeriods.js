import React from "react";

export default class StressPeriods extends React.Component {

    renderTableHead(bType) {

        let headNames = [];
        switch (bType){
            case 'CHD':
                headNames = ['Start Date', 'Start Head', 'End Head'];
                break;
            case 'GHB':
                headNames = ['Start Date', 'Stage', 'Conductivity'];
                break;
            case 'RCH':
                headNames = ['Start Date', 'Recharge'];
                break;
            case 'RIV':
                headNames = ['Start Date', 'Stage', 'Conductivity', 'River Bottom Elevation'];
                break;
            case 'WEL':
                headNames = ['Start Date', 'Flux'];
                break;

            default:
                headNames = [];
        }

        return (
            <thead>
            <tr>
                {headNames.map( h => {return <th key={Math.random()}>{h}</th>})}
                <th>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-plus" />
                        </button>
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-import" />
                        </button>
                    </div>
                </th>
            </tr>
            </thead>
        );
    }

    renderStressPeriods(bType) {
        this.props.data.sort( (a,b) => {
            return new Date(a.date_time_begin) - (new Date(b.date_time_begin));
        });

        switch (bType) {
            case 'CHD':
                return this.props.data.map(s => {
                    return (
                        <tr key={s.id}>
                            <td>{new Date(s.date_time_begin).toLocaleDateString()}</td>
                            <td>{s.s_head}</td>
                            <td>{s.e_head}</td>
                            <td>
                                <button className="btn btn-xs btn-danger" type="button">
                                    <span className="glyphicon glyphicon-trash" />
                                </button>
                            </td>
                        </tr>
                    );
                });
                break;

            case 'WEL':
                return this.props.data.map(s => {
                    return (
                        <tr key={s.id}>
                            <td>{new Date(s.date_time_begin).toLocaleDateString()}</td>
                            <td>{s.flux}</td>
                            <td>
                                <button className="btn btn-xs btn-danger" type="button">
                                    <span className="glyphicon glyphicon-trash" />
                                </button>
                            </td>
                        </tr>
                    );
                });
                break;

            case 'RIV':
                return this.props.data.map(s => {
                    return (
                        <tr key={s.id}>
                            <td>{new Date(s.date_time_begin).toLocaleDateString()}</td>
                            <td>{s.stage}</td>
                            <td>{s.conductivity}</td>
                            <td>{s.bottom_elevation}</td>
                            <td>
                                <button className="btn btn-xs btn-danger" type="button">
                                    <span className="glyphicon glyphicon-trash" />
                                </button>
                            </td>
                        </tr>
                    );
                });
                break;

            case 'GHB':
                return this.props.data.map(s => {
                    return (
                        <tr key={s.id}>
                            <td>{new Date(s.date_time_begin).toLocaleDateString()}</td>
                            <td>{s.stage}</td>
                            <td>{s.conductivity}</td>
                            <td>
                                <button className="btn btn-xs btn-danger" type="button">
                                    <span className="glyphicon glyphicon-trash" />
                                </button>
                            </td>
                        </tr>
                    );
                });
                break;

            default:
                return "";
        }
    }

    render() {
        const bType = this.props.bType;
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><a href="./">Table</a></li>
                </ul>

                <table className="table table-striped">
                    {this.renderTableHead(bType)}
                    <tbody>
                        {this.renderStressPeriods(bType)}
                    </tbody>
                </table>
            </div>
        );
    }
}
