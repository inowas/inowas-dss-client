import React, { PropTypes, Component } from 'react';

export default class WellProperties extends Component {

    static propTypes = {
        well: PropTypes.object.isRequired,
        updateWell: PropTypes.func.isRequired
    }

    updateWell = property => {
        return e => {
            const { well } = this.props;
            const updatedWell = {
                ...well
            };
            let value = e.target.value;

            // handle multiple select inputs -> get all selected options as array
            if (e.target.tagName.toLowerCase() === 'select' && e.target.multiple) {
                value = [];
                Array.apply(null, e.target.options).forEach(o => {
                    if (o.selected) {
                        value.push(Number(o.value));
                    }
                });
            }

            updatedWell[property] = value;
            this.props.updateWell( updatedWell );
        };
    }

    render( ) {
        const { well } = this.props;
        return (
            <table>
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>
                            <input onChange={this.updateWell('name')} value={well.name} type="text" className="input" placeholder="name"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Type:</td>
                        <td>
                            <select onChange={this.updateWell('wellType')} value={well.wellType} className="select">
                                <option>type 1</option>
                                <option>type 2</option>
                                <option>type 3</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Latitude:</td>
                        <td>
                            <input onChange={this.updateWell('lat')} value={well.lat} type="number" className="input" placeholder="Latitude"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Longitude:</td>
                        <td>
                            <input onChange={this.updateWell('lng')} value={well.lng} type="number" className="input" placeholder="Longitude"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Layers:</td>
                        <td>
                            <select onChange={this.updateWell('affectedLayers')} className="select" value={well.affectedLayers} multiple>
                                <option value={0}>layer 0</option>
                                <option value={2}>layer 1</option>
                                <option value={3}>layer 2</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

}
