import React from "react";

export default class Icon extends React.Component {

    render() {
        const className = "icon-" + this.props.icon;

        return (
            <span className={"icon " + className + " " + this.props.className}></span>
        );
    }

}

Icon.propTypes = {
    icon: React.PropTypes.string.isRequired,
}
