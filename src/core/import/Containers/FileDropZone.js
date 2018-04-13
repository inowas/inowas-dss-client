import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {isJsonValid, prettifyJson, validateCsv, validateGeoJson} from '../Helpers';

class FileDropZone extends React.Component {

    onDrop = (files) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = this.fileReaderHandleFile;
        reader.readAsText(file);
        this.setState({file});
    };

    fileReaderHandleFile = (e) => {
        const fileContent = e.srcElement.result;
        if (fileContent.startsWith('{')) {
            // Supposing json-content
            this.handleJsonContent(fileContent);
        }

        // Supposing csv-content
        this.handleCsvContent(fileContent);
    };

    handleCsvContent = fileContent => {
        const [contentValid, contentValidationErrors] = validateCsv(fileContent);
        const contentType = contentValid ? 'text/csv' : '';
        this.props.onChange({
            contentType,
            content: fileContent,
            contentValid,
            contentValidationErrors
        });
    };

    handleJsonContent = fileContent => {
        const content = isJsonValid(fileContent) ? prettifyJson(fileContent) : fileContent;
        const [contentValid, contentValidationErrors] = validateGeoJson(fileContent);
        const contentType = contentValid ? 'application/json' : '';
        this.props.onChange({
            contentType,
            content,
            contentValid,
            contentValidationErrors
        });
    };

    render() {
        const dropzoneContent = (
            <p style={{textAlign: 'center'}}>
                Click or drag your file here.<br/>
                Possible formats are GeoJson.
            </p>
        );

        return (
            <Dropzone onDrop={this.onDrop} style={{width: '100%'}} multiple={false}>
                {dropzoneContent}
            </Dropzone>
        );
    }
}

FileDropZone.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default FileDropZone;
