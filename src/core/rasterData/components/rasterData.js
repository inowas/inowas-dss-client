import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Form, Tab} from 'semantic-ui-react';
import RasterDataImage from './rasterDataImage';
import {mean} from '../helpers';
import {Command} from '../actions';
import RasterfileUpload from './rasterfileUpload';


const styles = {
    link: {
        cursor: 'pointer'
    }
};

class RasterData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            edit: false
        };
    }

    cancelHandler = () => {
        this.setState({
            edit: false
        });

        return false;
    };

    submitHandler = () => {
        this.setState({
            edit: false,
            data: parseFloat(this.state.data) || 1.0
        });

        return false;
    };

    handleValueUpdate = e => {
        this.setState({
            data: e.target.value
        });
    };

    handleFileUpload = e => {
        const files = e.target.files;
        const file = files[0];
        this.props.onUploadRasterFile(file, this.props.gridSize.n_x, this.props.gridSize.n_y);
    };

    toggleEditMode = () => {
        this.setState({
            edit: !this.state.edit
        });

        return false;
    };

    renderHeading = edit => {
        return (
            <h4>
                {this.props.name}
                {edit && <a style={styles.link} onClick={this.toggleEditMode}> (edit)</a>}
                {!edit && <a style={styles.link} onClick={this.toggleEditMode}> (view)</a>}
            </h4>
        );
    };

    render() {
        const {data, edit} = this.state;
        const {gridSize, readOnly} = this.props;

        if (!edit) {
            return (
                <div>
                    {this.renderHeading(!readOnly)}
                    <RasterDataImage data={data} gridSize={gridSize}/>
                </div>
            );
        }

        const tabValue = (
            <Tab.Pane>
                <Form.Field>
                    <input value={mean(data) || data} onChange={this.handleValueUpdate}/>
                </Form.Field>
                <Button type="cancel" onClick={this.cancelHandler}>Cancel</Button>
                <Button type="submit" onClick={this.submitHandler}>Submit</Button>
            </Tab.Pane>
        );

        const tabRaster = (
            <Tab.Pane>
                <RasterfileUpload handleFileUpload={this.handleFileUpload} uploadedFile={this.props.uploadedFile} />
            </Tab.Pane>
        );

        const panes = [
            {menuItem: 'Value', render: () => tabValue},
            {menuItem: 'Raster', render: () => tabRaster},
        ];

        return (
            <div>
                {this.renderHeading(false)}
                <Tab panes={panes}/>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    onUploadRasterFile(file, width, height) {
        dispatch(Command.uploadRasterFile(file, width, height));
    },
});

const mapStateToProps = (state, {params}) => {
    const {rasterfiles} = state;
    return {
        uploadedFile: rasterfiles.files.filter(f => (f.hash === rasterfiles.current))[0] || null
    };
};

RasterData.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
    gridSize: PropTypes.object.isRequired,
    name: PropTypes.string,
    onUploadRasterFile: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    uploadedFile: PropTypes.object,
};

// eslint-disable-next-line no-class-assign
RasterData = connect(mapStateToProps, mapDispatchToProps)(RasterData);

export default RasterData;
