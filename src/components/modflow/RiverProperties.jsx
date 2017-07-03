import React, { Component, PropTypes } from 'react';

import Icon from '../primitive/Icon';

export default class RiverProperties extends Component {

    static propTypes = {
        river: PropTypes.object.isRequired,
        updateRiver: PropTypes.func.isRequired,
        setEditorState: PropTypes.func.isRequired
    }

    render( ) {
        const { river, setEditorState } = this.props;
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
                        {river.geometry.coordinates.map((c, index) => {
                            return (
                                <tr key={index}>
                                    <td>{c[1]}</td>
                                    <td>{c[0]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
