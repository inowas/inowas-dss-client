import React from 'react';
import PropTypes from 'prop-types';
import {Button, Grid, Form, Header, Modal, Segment} from 'semantic-ui-react';
import BoundaryGeometryEditorMap from './boundaryGeometryEditorMap';

class BoundaryGeometryEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boundary: null,
            boundaries: null
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

    render() {
        const {area, onCancel, onSave, mapStyles} = this.props;
        const {boundaries, boundary} = this.state;

        return (
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
                                <Segment color="blue">
                                    <BoundaryGeometryEditorMap
                                        area={area}
                                        boundary={boundary}
                                        boundaries={boundaries}
                                        mapStyles={mapStyles}
                                        onChange={this.handleChangeBoundary}
                                    />
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
        );
    }
}

BoundaryGeometryEditor.propTypes = {
    area: PropTypes.object.isRequired,
    boundary: PropTypes.object.isRequired,
    boundaries: PropTypes.array.isRequired,
    mapStyles: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default BoundaryGeometryEditor;
