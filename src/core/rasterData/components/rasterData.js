import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Tab } from 'semantic-ui-react';
import RasterDataImage from './rasterDataImage';
import {mean} from '../helpers';
import { Query, Command } from '../actions';


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
            edit: false
        });

        return false;
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
        console.log('Props', this.props);
        const { edit, data } = this.state;
        const { gridSize, readOnly } = this.props;

        if (!edit) {
            return (
                <div>
                    {this.renderHeading(!readOnly)}
                    <RasterDataImage data={data} gridSize={gridSize} />
                </div>
            );
        }

        const tabValue = (
            <Tab.Pane>
                <Form.Field>
                    <input value={mean(data)}/>
                </Form.Field>
                <Button type="cancel" onClick={this.cancelHandler}>Cancel</Button>
                <Button type="submit" onClick={this.submitHandler}>Submit</Button>
            </Tab.Pane>
        );

        const tabRaster = (
            <Tab.Pane>
                <Form.Field>
                    <input type="file" onChange={this.handleFileUpload} />
                </Form.Field>
            </Tab.Pane>
        );

        const panes = [
            { menuItem: 'Value', render: () => tabValue },
            { menuItem: 'Raster', render: () => tabRaster },
        ];

        return (
            <div>
                {this.renderHeading(false)}
                <Tab panes={panes} />
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    onUploadRasterFile(file, width, height) {
        dispatch(Command.uploadRasterFile(file, width, height));
    },
});

const mapStateToProps = (state, {params}) => ({
});

RasterData.propTypes = {
    gridSize: PropTypes.object.isRequired,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
    name: PropTypes.string,
    onUploadRasterFile: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired
};

// eslint-disable-next-line no-class-assign
RasterData = connect(mapStateToProps, mapDispatchToProps)(RasterData);

export default RasterData;
