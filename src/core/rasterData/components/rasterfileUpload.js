import PropTypes from 'prop-types';
import React from 'react';
import {Form, Radio, Header, List, Segment} from 'semantic-ui-react';
import RasterDataImage from './rasterDataImage';
import {getGridSize} from '../helpers';

class RasterfileUpload extends React.Component {
    state = {
        'selectedBand': 0,
    };

    handleChange = (e, {value}) => this.setState({selectedBand: value});

    renderFileDetails = uploadedFile => {
        if (!uploadedFile) {
            return null;
        }

        const {metadata, data, hash} = uploadedFile;

        const bands = data.map((e, key) => (
            <Form.Field key={key}>
                <Radio
                    label={'Band ' + key}
                    name="radioGroup"
                    value={key}
                    checked={this.state.selectedBand === key}
                    onChange={this.handleChange}
                />
            </Form.Field>
        ));

        return (
            <div>
                <Segment color="blue">
                    <Header as="h3" style={{'textAlign': 'left'}}>Metadata</Header>
                    <List>
                        <List.Item>
                            <List.Icon name="hashtag"/>
                            <List.Content>{hash}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name="attach"/>
                            <List.Content>{metadata.driver}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name="marker"/>
                            <List.Content>X: {metadata.origin[0]}, Y: {metadata.origin[1]}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name="resize horizontal"/>
                            <List.Content>{metadata.pixelSize[0]}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name="resize vertical"/>
                            <List.Content>{metadata.pixelSize[1]}</List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name="map outline"/>
                            <List.Content>{metadata.projection}</List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name="grid layout"/>
                            <List.Content>
                                X: {metadata.rasterXSize}, Y: {metadata.rasterYSize}, Z: {metadata.rasterCount}
                            </List.Content>
                        </List.Item>
                    </List>
                </Segment>
                <Segment color="blue">
                    <Header as="h3" style={{'textAlign': 'left'}}>Data</Header>
                    <Form>{bands}</Form>
                    <RasterDataImage data={data[this.state.selectedBand]} gridSize={getGridSize(data[this.state.selectedBand])}/>
                </Segment>
            </div>
        );
    };

    render() {
        const {uploadedFile} = this.props;

        return (
            <div>
                {this.renderFileDetails(uploadedFile)}
                <input type="file" onChange={this.props.handleFileUpload}/>
            </div>
        );
    }
}

RasterfileUpload.propTypes = {
    handleFileUpload: PropTypes.func.isRequired,
    uploadedFile: PropTypes.object,
};

export default RasterfileUpload;
