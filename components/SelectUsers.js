import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import ListUsers from './ListUsers';


class SelectUsers extends React.Component {
    state = {
        openDialog: false,
    };

    getInputText = () => {
        const hash = {};
        let text = '';
        const { dataList, selectedList } = this.props;
        if (selectedList.length === 0) {
            return '';
        }

        dataList.forEach((item) => {
            hash[item.id] = item.username;
        });

        selectedList.forEach((item, index) => {
            text += `${hash[item.id]}`;
            if (selectedList.length !== index + 1) {
                text += ', ';
            }
        });

        console.log('get input: ', text);

        return text;
    };

    handleOpenDialog = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.inputRef.blur();
        this.setState({ openDialog: true });
    };

    handleCloseDialog = () => {
        this.setState({ openDialog: false });
    };

    render() {
        const { dataList, selectedList, handleChange } = this.props;
        const showEmptyMessage = dataList.length === 0;
        return (
            <div>
                <TextField
                    required
                    label="Users"
                    value={this.getInputText()}
                    onFocus={this.handleOpenDialog}
                    inputRef={(el) => { this.inputRef = el; }}
                    margin="normal"
                    fullWidth
                />
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent
                        style={showEmptyMessage ? {} : { padding: 0 }}
                    >
                        {showEmptyMessage ?
                            <DialogContentText>
                                List empty. You need create new good.
                            </DialogContentText> :
                            <ListUsers
                                selected
                                dataList={dataList}
                                selectedList={selectedList}
                                handleChange={handleChange}
                            />
                        }
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}


export default SelectUsers;
