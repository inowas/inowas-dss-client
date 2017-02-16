import React from 'react';

import '../../../less/toolHeader.less';

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.title ? props.title : 'Default title'
        }
    }

    handleStateChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        const { name } = this.state;
        return (
            <div className="tool-header">
                <input onChange={this.handleStateChange} className="name-input" type="text" value={name} name="name"/>
            </div>
        )
    }
}
