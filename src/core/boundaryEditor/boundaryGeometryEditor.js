import React from 'react';
import PropTypes from 'prop-types';
import {Button, Grid, Form, Header, Modal, Segment, Menu, Icon} from 'semantic-ui-react';
import BoundaryGeometryEditorMap from './boundaryGeometryEditorMap';
import BoundaryActiveCellsMap from './boundaryGeometryActiveCellsMap';

class BoundaryGeometryEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boundary: null,
            boundaries: null,
            activeItem: 'geometry'
        };
    }

    componentWillMount() {
        this.setState({
            boundary: this.props.boundary,
            boundaries: this.props.boundaries.filter(b => b.id !== this.props.boundary.id)
        });
    }

    handleChangeName = name => {
        this.setState({
            boundary: {...this.state.boundary, name: name}
        });
    };

    handleChangeBoundary = boundary => {
        this.setState({
            boundary: boundary
        });
    };

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {area, boundingBox, gridSize, onCancel, onSave, mapStyles, readOnly} = this.props;
        const {activeItem, boundaries, boundary} = this.state;

        return (
            <div>
                <Modal size={'large'} open onClose={onCancel}>
                    <Modal.Header>Edit boundary properties</Modal.Header>
                    <Modal.Content>
                        <Grid divided={'vertically'}>
                            <Grid.Row columns={2}>
                                <Grid.Column width={6}>
                                    <Segment color="blue">
                                        <Header as="h3" dividing>Boundary properties</Header>
                                        <Form>
                                            <Form.Field>
                                                <label>Name</label>
                                                <input placeholder="Boundary name"
                                                       value={boundary.name}
                                                       onChange={this.handleChangeName}/>
                                            </Form.Field>
                                        </Form>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={10}>

                                    <Menu attached="top" tabular>
                                        <Menu.Item name="geometry" active={activeItem === 'geometry'}
                                                   onClick={this.handleItemClick}>
                                            <Icon name="location arrow"/>
                                            Geometry
                                        </Menu.Item>

                                        <Menu.Item name="affected cells" active={activeItem === 'affected cells'}
                                                   onClick={this.handleItemClick}>
                                            <Icon name="table"/>
                                            Affected cells
                                        </Menu.Item>
                                    </Menu>

                                    <Segment attached="bottom">
                                        {activeItem === 'geometry' && <BoundaryGeometryEditorMap
                                            area={area}
                                            boundary={boundary}
                                            boundaries={boundaries}
                                            boundingBox={boundingBox}
                                            gridSize={gridSize}
                                            mapStyles={mapStyles}
                                            readOnly={readOnly}
                                            onChange={this.handleChangeBoundary}
                                        />}

                                        {activeItem === 'affected cells' && <BoundaryActiveCellsMap
                                            area={area}
                                            boundary={boundary}
                                            boundingBox={boundingBox}
                                            gridSize={gridSize}
                                            mapStyles={mapStyles}
                                            readOnly={readOnly}
                                            onChange={this.handleChangeBoundary}
                                        />}
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={onCancel}>Cancel</Button>
                        <Button positive onClick={() => onSave(boundary)}>Save</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

BoundaryGeometryEditor.propTypes = {
    area: PropTypes.object.isRequired,
    boundary: PropTypes.object.isRequired,
    boundaries: PropTypes.array.isRequired,
    boundingBox: PropTypes.array.isRequired,
    gridSize: PropTypes.object.isRequired,
    mapStyles: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
};

export default BoundaryGeometryEditor;
