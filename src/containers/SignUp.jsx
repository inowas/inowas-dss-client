import '../less/login.less';

import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {signup} from '../actions/user';
import {connect} from 'react-redux';
import {isUserLoggedIn} from '../reducers/user';
import {push} from 'react-router-redux';
import {withRouter} from 'react-router';
import {Button, Container, Form, Grid, Header, Image, Menu, Message} from 'semantic-ui-react';
import logo from '../images/favicon.png';

const styles = {
    link: {
        cursor: 'pointer'
    }
};

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.checkAuthentication(this.props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            loading: false,
            validInput: false,
            success: false,
            error: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuthentication(nextProps);
    }

    checkAuthentication() {
        if (this.props.userLoggedIn) {
            this.pushTo('/');
        }
    }

    pushTo = (url) => {
        this.props.push(url);
    };

    onNameChange = e => {
        const name = e.target.value;

        this.setState({
            name,
            validInput: this.validate(
                name,
                this.state.email,
                this.state.password,
                this.state.passwordConfirmation,
                this.state.username
            )
        });
    };

    onUsernameChange = e => {
        const username = e.target.value;
        this.setState({
            username,
            validInput: this.validate(
                this.state.name,
                this.state.email,
                this.state.password,
                this.state.passwordConfirmation,
                username
            )
        });
    };

    onEmailChange = e => {
        const email = e.target.value;
        this.setState({
            email,
            validInput: this.validate(
                this.state.name,
                email,
                this.state.password,
                this.state.passwordConfirmation,
                this.state.username
            )
        });
    };

    onPasswordChange = e => {
        const password = e.target.value;
        this.setState({
            password,
            validInput: this.validate(
                this.state.name,
                this.state.email,
                password,
                this.state.passwordConfirmation,
                this.state.username
            )
        });
    };

    onPasswordConfirmationChange = e => {
        const passwordConfirmation = e.target.value;
        this.setState({
            passwordConfirmation,
            validInput: this.validate(
                this.state.name,
                this.state.email,
                this.state.password,
                passwordConfirmation,
                this.state.username
            )
        });
    };

    validateUsername = (username) => {
        const re = /^[a-zA-Z\-]+$/;

        if (username.length <= 5) {
            return false;
        }

        return re.test(username);
    };

    validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    validate = (name, email, password, passwordConfirmation, username) => {
        if (password.length < 5) {
            return false;
        }

        if (!this.validateEmail(email)) {
            return false;
        }

        if (password !== passwordConfirmation) {
            return false;
        }

        if (!this.validateUsername(username)) {
            return false;
        }

        return name.length > 5;
    };

    onSignUpClick = () => {
        const redirectTo = location.protocol + '//' + location.hostname + '/login';
        this.props.signup(this.state.name, this.state.username, this.state.email, this.state.password, redirectTo);
        this.setState({loading: true});
    };

    renderButton = () => {
        if (this.state.success) {
            return (
                <Message color={'blue'}>
                    Thank you, please check your E-Mail Inbox.
                </Message>
            );
        }

        return (
            <Button
                color={'blue'}
                fluid size="large"
                onClick={this.onSignUpClick}
                disabled={!this.state.validInput}
            >
                Sign up
            </Button>
        );
    };

    render() {
        return (
            <div>
                <Menu inverted>
                    <Menu.Item name="home" onClick={() => this.pushTo('/')}/>
                </Menu>
                <Container textAlign={'center'} className={'signup'}>
                    <Grid textAlign="center">
                        <Grid.Column style={{maxWidth: 350}}>
                            <Header as="h2">
                                <Image src={logo}/>
                                <Header.Content>
                                    Sign up for a new account
                                </Header.Content>
                            </Header>
                            <Form size={'small'} className="fluid segment">
                                <Form.Field>
                                    <input
                                        type="text"
                                        onChange={this.onNameChange}
                                        placeholder="Name"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        type="text"
                                        onChange={this.onUsernameChange}
                                        placeholder="Username"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        type="text"
                                        onChange={this.onEmailChange}
                                        placeholder="Email"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        onChange={this.onPasswordChange}
                                        placeholder="Password"
                                        type="password"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        onChange={this.onPasswordConfirmationChange}
                                        placeholder="Confirm Password"
                                        type="password"
                                    />
                                </Form.Field>
                                {this.renderButton()}
                            </Form>
                            <Message attached="bottom" warning>
                                Already registered?&nbsp;<a style={styles.link} onClick={() => this.pushTo('/login')}>Login
                                here!</a>.
                            </Message>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userLoggedIn: isUserLoggedIn(state.user)
    };
};

SignUp.propTypes = {
    push: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    userLoggedIn: PropTypes.bool.isRequired
};

// eslint-disable-next-line no-class-assign
SignUp = withRouter(connect(mapStateToProps, {push, signup})(SignUp));

export default SignUp;
