import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import {
    createType,
    openDialogCreateType,
    closeDialogCreateType,
} from '../actions';

class TypeCreate extends React.Component {
    static propTypes = {
        openedDialogCreateType: PropTypes.bool.isRequired,
        closeDialogCreateType: PropTypes.func.isRequired,
        openDialogCreateType: PropTypes.func.isRequired,
        createType: PropTypes.func.isRequired,
    };

    static getDerivedStateFromProps(nextProps) {
        if (!nextProps.openedDialogCreateType) {
            return {
                title: '',
                note: '',
            };
        }
        return null;
    }

    state = {
        title: '',
        note: '',
    };

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.props.openDialogCreateType();
    };

    handleClose = () => {
        this.props.closeDialogCreateType();
    };

    handleSubmit = () => {
        this.props.createType(this.state);
    };

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.handleClickOpen}>
                    Create type
                </Button>
                <Dialog
                    open={this.props.openedDialogCreateType}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title-type-create"
                >
                    <DialogTitle id="form-dialog-title-type-create">Create type</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            label="Title"
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            multiline
                            rows={1}
                            rowsMax={4}
                            label="Note"
                            value={this.state.note}
                            onChange={this.handleChange('note')}
                            margin="normal"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({ goods }) => {
    const { openedDialogCreateType } = goods;
    return { openedDialogCreateType };
};


export default connect(mapStateToProps, {
    createType,
    openDialogCreateType,
    closeDialogCreateType,
})(TypeCreate);

