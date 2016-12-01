import React from "react";

export default class StressPeriodListItem extends React.Component {

  render() {
    const stressPeriod = this.props.stressPeriod;
    return (
      <tr>
        <td>{stressPeriod.date_time_begin}</td>
        <td>{stressPeriod.flux}</td>
      </tr>
    )
  }
}
