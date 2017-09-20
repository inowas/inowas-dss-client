import React from 'react';
import { Properties } from '../../t07/components/index';
import Navbar from '../../containers/Navbar';
import { withRouter } from 'react-router';
import Icon from '../../components/primitive/Icon';
import styleGlobals from 'styleGlobals';
import { Routing } from '../../t07/actions';

const styles = {
    wrapper: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: styleGlobals.dimensions.navBarHeight,
        bottom: 0,
        overflow: 'hidden'
    },

    overlayWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    overlay: {
        width: styleGlobals.dimensions.appWidth,
        padding: styleGlobals.dimensions.gridGutter,
        maxHeight: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex'
    }
};

class T07 extends React.Component {
    state = {
        navigation: []
    };

    close = () => {
        // eslint-disable-next-line no-shadow
        const { router, location } = this.props;

        router.push(location.pathname + '#view');
    };

    componentWillMount() {
        const {said} = this.props.params;
        if (said) {
            this.setState( prevState => {
                return {
                    ...prevState,
                    navigation: [
                        ...prevState.navigation,
                        {
                            name: 'Back to scenario analysis',
                            path: '/tools/T07A/' + said,
                            icon: <Icon name="layer_horizontal_hatched" />
                        },
                    ]
                };
            } );
        }
    }

    renderProperties() {
        const isVisible =
            this.props.location.hash !== '#edit' &&
            this.props.location.hash !== '#create' &&
            this.props.location.hash !== '#view';

        if (!isVisible) {
            return null;
        }

        const { params, routes } = this.props;
        const { tool } = this.props.route;

        return (
            <div style={styles.wrapper}>
                <div style={styles.overlayWrapper}>
                    <div style={styles.overlay}>
                        <Properties
                            selectedProperty={this.props.params.property}
                            close={this.close}
                            tool={tool}
                            type={this.props.params.type}
                        />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { navigation } = this.state;

        return (
            <div className="toolT03">
                <Navbar links={navigation} />
                {this.renderProperties()}
            </div>
        );
    }
}

// eslint-disable-next-line no-class-assign
T07 = withRouter(T07);

export default T07;
