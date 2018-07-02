import PropTypes from 'prop-types';
import React from 'react';
import MtPackage from '../../../core/modflow/mt3d/mtPackage';
import {Checkbox, Form} from 'semantic-ui-react';

class MtPackageProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mt: props.mt.toObject
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            mt: nextProps.mt.toObject
        });
    }

    render() {
        const {enabled, readonly, toggleEnabled} = this.props;
        const {mt} = this.state;

        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Enabled</label>
                        <Checkbox checked={enabled} onChange={toggleEnabled} disabled={readonly}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Version</label>
                        <input value={mt.version} readOnly/>
                    </Form.Field>
                    <Form.Field>
                        <label>Ftl filename</label>
                        <input value={mt.ftlfilename} readOnly/>
                    </Form.Field>
                    <Form.Field>
                        <label>Verbose</label>
                        <input value={mt.verbose} readOnly/>
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

MtPackageProperties.propTypes = {
    mt: PropTypes.instanceOf(MtPackage),
    onChange: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
    readonly: PropTypes.bool.isRequired,
    toggleEnabled: PropTypes.func.isRequired,
};


export default MtPackageProperties;
