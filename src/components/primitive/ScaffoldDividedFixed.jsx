import React from "react"

export default class ScaffoldDividedFixed extends React.Component {

    render() {
        return (
            <div className="page-wrapper divided-fixed-wrapper" >
                <div className="divided-fixed-left">
                  {this.props.left}
                </div>

                <div className="divided-fixed-right">
                    {this.props.right}
                </div>
            </div>
        );
    }

}

ScaffoldDividedFixed.propTypes = {
    left: React.PropTypes.node.isRequired,
    right: React.PropTypes.node.isRequired,
}
