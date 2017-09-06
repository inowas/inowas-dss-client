import React from 'react';
import image13B from '../../images/tools/T13B.png';
import image13C from '../../images/tools/T13C.png';

export default class Settings extends React.Component {
    image() {
        var object= [];
        if (this.props.data.xwd >= 0) {
            object= {
                name: 'PropertyWrapper 13B',
                img: image13B,
                href: "../T13B/13B_1"
            }
        } else {
            object= {
                name: 'PropertyWrapper 13C',
                img: image13C,
                href: "../T13C/13C_1"
            }
        }
        return object;
    };
    render() {
        return (
            <div className="padding-30">
                <div className="center-vertical center-horizontal">
                    <a href={this.image().href}>
                        <strong>{this.image().name}</strong>
                        <img className="sketch-image" src={this.image().img} />
                    </a>
                </div>
            </div>
        )
    }
}
