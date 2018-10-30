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
    createCategory,
    closeDialogCreateCategory,
    openDialogCreateCategory,
} from '../actions';


class CategoryCreate extends React.Component {
    static propTypes = {
        openedDialogCreateCategory: PropTypes.bool.isRequired,
        closeDialogCreateCategory: PropTypes.func.isRequired,
        openDialogCreateCategory: PropTypes.func.isRequired,
        createCategory: PropTypes.func.isRequired,
    };

    static getDerivedStateFromProps(nextProps) {
        if (!nextProps.openedDialogCreateCategory) {
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
        this.props.openDialogCreateCategory();
    };

    handleClose = () => {
        this.props.closeDialogCreateCategory();
    };

    handleSubmit = () => {
        this.props.createCategory(this.state);
    };

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.handleClickOpen}>
                    Create category
                </Button>
                <Dialog
                    open={this.props.openedDialogCreateCategory}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title-category-create"
                >
                    <DialogTitle id="form-dialog-title-category-create">Create category</DialogTitle>
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
    const { openedDialogCreateCategory } = goods;
    return { openedDialogCreateCategory };
};


export default connect(mapStateToProps, {
    createCategory,
    closeDialogCreateCategory,
    openDialogCreateCategory,
})(CategoryCreate);
