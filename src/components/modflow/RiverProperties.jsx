import React, { Component, PropTypes } from 'react';

import Icon from '../primitive/Icon';

export default class WellProperties extends Component {

    static propTypes = {
        river: PropTypes.object.isRequired,
        updateRiver: PropTypes.func.isRequired,
        setState: PropTypes.func.isRequired
    }

    render( ) {
        const { river, setState } = this.props;
        return (
            <div>
                <h3>Geometry</h3>
                <button onClick={() => setState('river')} className="link">Edit on Map<Icon name="arrow_right"/></button>
                <table>
                    <thead>
                        <tr>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {river.geometry.map((c, index) => {
                            return (
                                <tr key={index}>
                                    <td>{c.lat}</td>
                                    <td>{c.lng}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
