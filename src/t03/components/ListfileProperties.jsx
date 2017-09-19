import ConfiguredRadium from 'ConfiguredRadium';
import Console from '../../components/primitive/Console';
import Select from '../../components/primitive/Select';
import PropTypes from 'prop-types';
import React from 'react';
import styleGlobals from 'styleGlobals';
import * as lodash from 'lodash';
import { WebData, LayoutComponents } from '../../core';

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

@ConfiguredRadium
class ListfileProperties extends React.Component {

    constructor(props) {
        super( props );

        this.state = {
            file: ''
        };
    }

    handleSelectChange = name => {
        return data => {
            this.props.loadFile( data ? data.value : undefined );
            this.handleInputChange( name )( data ? data.value : undefined );
        };
    };

    handleInputChange = name => {
        return value => {
            this.setState( prevState => {
                return {
                    ...prevState,
                    [ name ]: value,
                };
            } );
        };
    };

    render() {
        const { getFileStatus } = this.props;
        let file = this.state.file;

        let files = this.props.files;

        if (!files) {
            files = [];
        }

        return (
            <div style={[ styles.columnContainer ]}>
                <LayoutComponents.Column
                    heading="Show files"
                    style={[ styles.columnNotLast ]}
                >
                    <form>
                        <LayoutComponents.InputGroup label="Files">
                            <Select
                                value={file}
                                onChange={this.handleSelectChange( 'file' )}
                                clearable={false}
                                options={lodash.map(
                                    files,
                                    (value) => ({
                                        label: value,
                                        value: value
                                    })
                                )}
                            />
                        </LayoutComponents.InputGroup>
                        <WebData.Component.Loading status={getFileStatus} style={[ { width: '100%' } ]}>
                            <Console>{getFileStatus.data}</Console>
                        </WebData.Component.Loading>
                    </form>
                </LayoutComponents.Column>
            </div>
        );
    }
}

ListfileProperties.propTypes = {
    loadFile: PropTypes.func.isRequired,
    files: PropTypes.array,
};

export default ListfileProperties;
