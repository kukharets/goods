import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import CategoryCreate from './CategoryCreate';
import TypeCategoryItem from './TypeCategoryItem';
import { deleteCategory } from '../actions';

class Categories extends React.Component {
    static propTypes = {
        deleteCategory: PropTypes.func.isRequired,
        storeListCategories: PropTypes.shape({
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

    handleDeleteCategory = id => () => {
        this.props.deleteCategory(id);
    };

    render() {
        const { storeListCategories } = this.props;
        return (
            <div>
                <Button variant="raised" color="primary" className="jr-btn" onClick={this.handleClickOpen}>
                   Categories
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title-category"
                    maxWidth="md"
                >
                    <DialogTitle id="form-dialog-title-category">Categories</DialogTitle>
                    <DialogContent style={{ width: '70vw' }}>
                        {storeListCategories.list.length === 0 ?
                            storeListCategories.emptyMessage :
                            <TypeCategoryItem
                                items={storeListCategories.list}
                                handleDelete={this.handleDeleteCategory}
                            />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            OK
                        </Button>
                        <CategoryCreate />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({ goods }) => {
    const { storeListCategories } = goods;
    return { storeListCategories };
};


export default connect(mapStateToProps, {
    deleteCategory,
})(Categories);

