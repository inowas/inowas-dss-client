import ConfiguredRadium from 'ConfiguredRadium';
import React from "react";
import PropTypes from "prop-types";
import {pure} from "recompose";
import {
    OPTIMIZATION_EDIT_SAVED,
    OPTIMIZATION_EDIT_UNSAVED
} from "../../selectors/optimization";
import {Button, Dropdown, Grid, Icon, Message, Transition} from "semantic-ui-react";

const styles = {
    iconFix: {
        width: 'auto',
        height: 'auto'
    },
    msgFix: {
        paddingTop: '6.929px',
        paddingBottom: '6.929px',
        fontSize: '1rem',
        textAlign: 'center'
    },
    tableWidth: {
        width: '99%'
    }
};

class OptimizationToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editState: props.editState
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            editState: nextProps.editState
        });
    }

    render() {
        return (
            <Grid style={styles.tableWidth}>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        {this.props.back &&
                        <Button icon
                                style={styles.iconFix}
                                onClick={this.props.back.onClick}
                                labelPosition="left">
                            <Icon name="left arrow"/>
                            Back
                        </Button>
                        }
                    </Grid.Column>
                    <Grid.Column>
                        {this.state.editState === OPTIMIZATION_EDIT_UNSAVED &&
                        <Message warning style={styles.msgFix}>Changes not saved!</Message>
                        }
                        <Transition visible={this.state.editState === OPTIMIZATION_EDIT_SAVED} animation="drop"
                                    duration={500}>
                            <Message positive style={styles.msgFix}>Changes saved!</Message>
                        </Transition>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        {this.props.dropdown &&
                        <Dropdown
                            button floating labeled
                            direction="left"
                            style={styles.iconFix}
                            name="type"
                            className="icon"
                            text={this.props.dropdown.text}
                            icon={this.props.dropdown.icon}
                            options={this.props.dropdown.options}
                            onChange={this.props.dropdown.onChange}
                        />
                        }
                        {this.props.save &&
                        <Button icon positive
                                style={styles.iconFix}
                                onClick={this.props.save.onClick}
                                labelPosition="left">
                            <Icon name="save"/>
                            Save
                        </Button>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

OptimizationToolbar.propTypes = {
    back: PropTypes.object,
    dropdown: PropTypes.object,
    save: PropTypes.object,
    editState: PropTypes.number
};

export default pure(ConfiguredRadium(OptimizationToolbar));