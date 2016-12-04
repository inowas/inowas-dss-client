import React from "react";
import StressPeriodListItem from "./StressPeriodListItem"

export default class StressPeriodsList extends React.Component {

    render() {
        const stressPeriods = this.props.stressperiods;

        let items = "";
        if (stressPeriods.length > 0) {
            items = stressPeriods.map(function (sp) {
                return (
                    <StressPeriodListItem key={sp.id} stressPeriod={sp}/>
                )
            });

            return (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Flux</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </table>
            );
        }

        return null;
    }
}
