import React from 'react';

export default class Settings extends React.Component {
    image() {
        var object= [];
        if (this.props.data.xwd >= 0) {
            object= {
                name: 'Tool 13B',
                img: '/images/tools/T13B.png',
                href: "#/tools/T13B"
            }
        } else {
            object= {
                name: 'Tool 13C',
                img: '/images/tools/T13C.png',
                href: "#/tools/T13C"
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
