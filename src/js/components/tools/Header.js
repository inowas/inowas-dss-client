import React from 'react';

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Default example'
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
