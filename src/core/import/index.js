import PropTypes from 'prop-types';
import React from 'react';
import {Button, Form, Grid, Menu, Modal, Segment, TextArea} from 'semantic-ui-react';
import Ajv from 'ajv';

const style = {
    textArea: {
        valid: {},
        invalid: {
            border: '1px solid red'
        }
    }
};

class ImportGeoJsonModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'Geojson',
            geoJson: '',
            geoJsonValid: null
        };
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    onChange = (e) => {
        if (e.target.name === 'geoJson') {
            this.setState({
                [e.target.name]: e.target.value,
                geoJsonValid: this.validateGeoJson(e.target.value)
            });

            return;
        }

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    isJsonValid = (json) => {
        try {
            JSON.parse(json);
        } catch (e) {
            return false;
        }
        return true;
    };

    validateGeoJson = (geoJson) => {
        if (!this.isJsonValid(geoJson)) {
            return false;
        }

        const ajv = new Ajv({schemaId: 'id'});
        ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
        const validate = ajv.compile(require('schema/geojson.json'));
        return validate(JSON.parse(geoJson));
    };

    render() {
        const {activeItem, geoJson, geoJsonValid} = this.state;
        const {header, onClose} = this.props;
        return (
            <Modal
                open
                onClose={onClose}
                closeOnDimmerClick
                closeOnDocumentClick
                closeIcon
                dimmer={'inverted'}
                size={'small'}
            >
                <Modal.Header>{header}</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Column width={4}>
                            <Menu fluid vertical tabular>
                                <Menu.Item
                                    name={'Geojson'}
                                    active={activeItem === 'Geojson'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item
                                    name={'Shapefile'}
                                    active={activeItem === 'Shapefile'}
                                    onClick={this.handleItemClick}
                                />
                            </Menu>
                        </Grid.Column>
                        <Grid.Column stretched width={12}>
                            {activeItem === 'Geojson' &&
                            <Form>
                                <TextArea
                                    style={geoJsonValid ? style.textArea.valid : style.textArea.invalid}
                                    name={'geoJson'}
                                    onInput={this.onChange}
                                    placeholder="Paste geojson here"
                                    rows={10}
                                    value={geoJson}
                                />
                            </Form>
                            }
                            {activeItem === 'Shapefile' &&
                            <Segment>
                                Shapefile
                            </Segment>
                            }
                        </Grid.Column>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative>Cancel</Button>
                    <Button positive>Save</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}


ImportGeoJsonModal.propTypes = {
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ImportGeoJsonModal;
