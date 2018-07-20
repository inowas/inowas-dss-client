import React from 'react';
import ConfiguredRadium from 'ConfiguredRadium';
import Console from '../../../components/primitive/Console';
import Select from '../../../components/primitive/Select';
import PropTypes from 'prop-types';
import styleGlobals from 'styleGlobals';
import {WebData, LayoutComponents} from '../../../core/index';

const styles = {
    columnContainer: {
        display: 'flex'
    },

    columnNotLast: {
        marginRight: styleGlobals.dimensions.gridGutter
    },

    columns: {
        display: 'flex'
    },

    columnFlex2: {
        flex: 2
    },

    saveButtonWrapper: {
        textAlign: 'right',
        marginTop: styleGlobals.dimensions.spacing.medium
    }
};

class ListFileProperties extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: ''
        };
    }

    handleSelectChange = name => {
        return data => {
            this.props.loadFile(data ? data.value : undefined);
            this.handleInputChange(name)(data ? data.value : undefined);
        };
    };

    handleInputChange = name => {
        return value => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    [name]: value,
                };
            });
        };
    };

    render() {
        const {getFileStatus} = this.props;
        const file = this.state.file;
        const files = this.props.files || [];

        return (
            <div style={[styles.columnContainer]}>
                <LayoutComponents.Column
                    heading="Show files"
                    style={[styles.columnNotLast]}
                >
                    <form>
                        <LayoutComponents.InputGroup label="Files">
                            <Select
                                value={file}
                                onChange={this.handleSelectChange('file')}
                                clearable={false}
                                options={files.map(value => ({label: value, value: value}))}
                            />
                        </LayoutComponents.InputGroup>
                        <WebData.Component.Loading status={getFileStatus} style={[{width: '100%'}]}>
                            <Console>{getFileStatus.data}</Console>
                        </WebData.Component.Loading>
                    </form>
                </LayoutComponents.Column>
            </div>
        );
    }
}

ListFileProperties.propTypes = {
    files: PropTypes.array,
    getFileStatus: PropTypes.object.isRequired,
    loadFile: PropTypes.func.isRequired,
};

export default ConfiguredRadium(ListFileProperties);
