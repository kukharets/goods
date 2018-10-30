import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import TypeCreate from './TypeCreate';
import TypeCategoryItem from './TypeCategoryItem';
import { deleteType } from '../actions';

class Types extends React.Component {
    static propTypes = {
        deleteType: PropTypes.func.isRequired,
        storeListTypes: PropTypes.shape({
            list: PropTypes.arrayOf(PropTypes.object).isRequired,
            emptyMessage: PropTypes.string.isRequired,
        }).isRequired,
    };

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDeleteType = id => () => {
        this.props.deleteType(id);
    };

    render() {
        const { storeListTypes } = this.props;
        return (
            <div>
                <Button variant="raised" color="primary" className="jr-btn" onClick={this.handleClickOpen}>
                    Types
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title-type"
                    maxWidth="md"
                >
                    <DialogTitle id="form-dialog-title-type">Types</DialogTitle>
                    <DialogContent style={{ width: '70vw' }}>
                        {storeListTypes.list.length === 0 ?
                            storeListTypes.emptyMessage :
                            <TypeCategoryItem
                                items={storeListTypes.list}
                                handleDelete={this.handleDeleteType}
                            />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            OK
                        </Button>
                        <TypeCreate />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({ goods }) => {
    const { storeListTypes } = goods;
    return { storeListTypes };
};


export default connect(mapStateToProps, {
    deleteType,
})(Types);

