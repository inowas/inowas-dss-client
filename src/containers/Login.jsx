import '../less/login.less';

import React, {Component, PropTypes} from 'react';

import {authenticate} from '../actions/user';
import {connect} from 'react-redux';
import {isUserLoggedIn} from '../reducers/user';
import {push} from 'react-router-redux';
import {withRouter} from 'react-router';
import {Button, Container, Form, Grid, Header, Image, Message} from 'semantic-ui-react';
import logo from '../images/favicon.png';
import Navbar from "./Navbar";

const styles = {
    link: {
        cursor: 'pointer'
    }
};

class Login extends Component {
    static propTypes = {
        userLoggedIn: PropTypes.bool.isRequired,
        push: PropTypes.func.isRequired,
        authenticate: PropTypes.func.isRequired
    };


    constructor(props) {
        super(props);
        this.checkAuthentication(this.props);
        this.state = {
            username: null,
            password: null,
            loading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuthentication(nextProps);
    }

    checkAuthentication(props) {
        // eslint-disable-next-line no-shadow
        const {userLoggedIn, push} = props;
        if (userLoggedIn) {
            push('/tools');
        }
    }

    pushToSignUp = () => {
        this.props.push('/signup');
    };

    onUsernameChange = e => {
        this.setState({
            username: e.target.value
        });
    };

    onPasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    };

    onLoginClick = () => {
        this.props.authenticate(this.state.username, this.state.password);
        this.setState({
            loading: true
        });
    };

    render() {
        return (
            <div>
                <Navbar />
                <Container textAlign={'center'} className={'login'}>
                    <Grid textAlign="center">
                        <Grid.Column style={{maxWidth: 350}}>
                            <Header as="h2">
                                <Image src={logo}/>
                                <Header.Content>
                                    Log-in to your account
                                </Header.Content>
                            </Header>
                            <Form size={'small'} className="fluid segment">
                                    <Form.Field>
                                        <input
                                            onChange={this.onUsernameChange}
                                            placeholder="Username"
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <input
                                            onChange={this.onPasswordChange}
                                            placeholder="Password"
                                            type="password"
                                        />
                                    </Form.Field>
                                    <Button
                                        color={'blue'}
                                        fluid size="large"
                                        onClick={this.onLoginClick}
                                    >
                                        Login
                                    </Button>
                            </Form>
                            <Message attached="bottom" warning>
                               New to us?&nbsp;<a onClick={this.pushToSignUp} style={styles.link}>Sign Up here!</a>.
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

// eslint-disable-next-line no-class-assign
Login = withRouter(connect(mapStateToProps, {push, authenticate})(Login));

export default Login;
