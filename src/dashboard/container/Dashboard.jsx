import ConfiguredRadium from 'ConfiguredRadium';
import React from 'react';
import PropTypes from 'prop-types';

import {setActiveTool, setPublic, cloneToolInstance, deleteToolInstance} from '../actions/actions';
import {loadInstances} from '../actions/queries';
import {getTool, getTools} from '../selectors/tool';
import {getActiveToolSlug, getPublic} from '../selectors/ui';

import {Formatter} from '../../core';
import Navbar from '../../containers/Navbar';
import {connect} from 'react-redux';

import {includes} from 'lodash';
import {withRouter} from 'react-router';
import {Button, Container, Grid, Header, Icon, Input, Menu, Table} from "semantic-ui-react";

const styles = {
    wrapper: {
        padding: '0 40px 0 40px',
        width: '1280px'
    },
    columnPadding: {
        padding: '12px'
    },
    columnContainer: {
        background: '#fff',
        boxShadow: '0 1px 2px 0 rgba(34, 36, 38, 0.15)',
        border: '1px solid rgba(34, 36, 38, 0.15)',
        borderRadius: '.28571429rem',
        height: '100%',
    },
    menu: {
        width: '100%'
    },
    grid: {
        marginTop: '25px'
    }
};

@ConfiguredRadium
class Dashboard extends React.Component {
    state = {
        navigation: [
            {
                name: 'Documentation',
                path: 'https://inowas.hydro.tu-dresden.de/',
                icon: <Icon name="file"/>
            },
            {
                name: 'Datasets',
                path: 'https://kb.inowas.hydro.tu-dresden.de',
                icon: <Icon name="database"/>
            }
        ],
        hoveredInstance: null
    };

    componentDidMount() {
        // eslint-disable-next-line no-shadow
        const {activeTool, fetchInstances, publicInstances} = this.props;
        fetchInstances(activeTool.slug, publicInstances);
    }

    componentDidUpdate(prevProps) {
        // eslint-disable-next-line no-shadow
        const {activeTool, publicInstances, fetchInstances} = this.props;

        if (
            activeTool.slug !== prevProps.activeTool.slug ||
            publicInstances !== prevProps.publicInstances
        ) {
            fetchInstances(activeTool.slug, publicInstances);
        }
    }

    onToolClick = slug => {
        if (slug === 'T01' || slug === 'T04' || slug === 'T06' || slug === 'T11') {
            return () => this.props.router.push('/tools/' + slug);
        }

        if (slug === 'T17') {
            return () => window.open('http://marportal.un-igrac.org', '_blank');
        }

        return () => {
            this.props.setActiveTool(slug);
        };
    };

    renderTableRows(basePath, subPath, instances) {
        const {publicInstances, cloneToolInstance, deleteToolInstance} = this.props;

        return instances.map((i, index) => {
            return (
                <Table.Row
                    key={index}
                    onMouseEnter={() => this.setState({hoveredInstance: index})}
                    onMouseLeave={() => this.setState({hoveredInstance: null})}
                >
                    <Table.Cell>
                        {index + 1}
                    </Table.Cell>
                    <Table.Cell>
                        <Button>
                            {i.name}
                        </Button>
                    </Table.Cell>
                    <Table.Cell>
                        {i.tool}
                    </Table.Cell>
                    <Table.Cell>
                        {Formatter.dateToDatetime(new Date(i.created_at))}
                    </Table.Cell>
                    <Table.Cell>
                        {i.user_name}
                    </Table.Cell>
                    <Table.Cell>
                        {(() => {
                            if (this.state.hoveredInstance === index) {
                                return (
                                    <div>
                                        {!i.fake &&
                                        <Button
                                            onClick={() => cloneToolInstance(i.id)}
                                            icon
                                        >
                                            <Icon name='clone' />
                                            clone
                                        </Button>}
                                        {!i.fake &&
                                        !publicInstances &&
                                        <Button
                                            onClick={() => deleteToolInstance(i.id)}
                                            icon
                                        >
                                            <Icon name='trash' />
                                            delete
                                        </Button>}
                                    </div>
                                );
                            }
                            return null;
                        })()}
                    </Table.Cell>
                </Table.Row>
            );
        });
    }

    renderDataTable() {
        // eslint-disable-next-line no-shadow
        const {activeTool, setPublic, publicInstances} = this.props;
        return (
            <Grid padded>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as='h2'>Instances of {activeTool.slug}</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column width={5}>
                        <Input size='small' type='text' placeholder="Search..."/>
                    </Grid.Column>
                    <Grid.Column width={5} textAlign='center'>
                        <Button icon style={styles.iconFix}>
                            <Icon name='add' style={styles.iconFix}/>
                            Add new
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='right'>
                        <Button.Group>
                            <Button
                                onClick={() => setPublic(false)}
                                positive={!publicInstances}
                            >
                                Private
                            </Button>
                            <Button.Or/>
                            <Button
                                onClick={() => setPublic(true)}
                                positive={publicInstances}
                            >
                                Public
                            </Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>No.</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Tool</Table.HeaderCell>
                                    <Table.HeaderCell>Date created</Table.HeaderCell>
                                    <Table.HeaderCell>Created by</Table.HeaderCell>
                                    <Table.HeaderCell/>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.renderTableRows(
                                    activeTool.path,
                                    activeTool.subPath,
                                    activeTool.instances
                                )}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    render() {
        const {navigation} = this.state;
        const {tools, roles, activeTool} = this.props;

        const menuItems = [
            {
                name: 'Tools',
                icon: <Icon name="book"/>,
                items: tools.filter(t => includes(roles, t.role))
                    .map(t => {
                        return {
                            name: t.slug + ': ' + t.name,
                            onClick: this.onToolClick(t.slug),
                            active: (activeTool.slug === t.slug)
                        };
                    })
            }
        ];

        return (
            <Container style={styles.wrapper}>
                <Navbar links={navigation}/>
                <Grid padded style={styles.grid}>
                    <Grid.Column width={6}>
                        <Menu vertical style={styles.menu}>
                            <Menu.Item header>Tools</Menu.Item>
                            {menuItems[0].items.map((item, key) =>
                                <Menu.Item
                                    key={key}
                                    onClick={item.onClick}
                                    active={item.active}
                                >
                                    {item.name}
                                </Menu.Item>
                            )}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Container style={styles.columnContainer}>
                            {this.renderDataTable()}
                        </Container>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        roles: state.user.roles,
        tools: getTools(state.dashboard.tools),
        activeTool: getTool(
            state.dashboard.tools,
            getActiveToolSlug(state.dashboard.ui)
        ),
        publicInstances: getPublic(state.dashboard.ui)
    };
};

const mapDispatchToProps = {
    setActiveTool: setActiveTool,
    fetchInstances: loadInstances,
    setPublic: setPublic,
    cloneToolInstance: cloneToolInstance,
    deleteToolInstance: deleteToolInstance
};

Dashboard.propTypes = {
    roles: PropTypes.array,
    tools: PropTypes.array,
    activeTool: PropTypes.object,
    publicInstances: PropTypes.bool,
    setActiveTool: PropTypes.func.isRequired,
    fetchInstances: PropTypes.func.isRequired,
    setPublic: PropTypes.func.isRequired,
    cloneToolInstance: PropTypes.func.isRequired,
    deleteToolInstance: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
