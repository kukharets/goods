import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

class ListUsers extends React.Component {
    static propTypes = {
        selectedList: PropTypes.arrayOf(PropTypes.object),
        handleChange: PropTypes.func,
        selected: PropTypes.bool,
        dataList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            type: PropTypes.object,
            category: PropTypes.object,
            price: PropTypes.string,
        })).isRequired,
    };

    static defaultProps = {
        selected: false,
        handleChange: () => {},
        selectedList: [],
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.props.handleChange(this.props.dataList.map(n => ({ id: n.id })));
            return;
        }
        this.props.handleChange([]);
    };

    handleSelectClick = id => () => {
        const { selectedList } = this.props;

        const selectedIndex = selectedList.findIndex(item => item.id === id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = selectedList.concat({ id });
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedList.slice(1));
        } else if (selectedIndex === selectedList.length - 1) {
            newSelected = newSelected.concat(selectedList.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedList.slice(0, selectedIndex),
                selectedList.slice(selectedIndex + 1),
            );
        }

        this.props.handleChange(newSelected);
    };

    checkSelectedAll = () => {
        const { dataList, selectedList } = this.props;
        return dataList.length === selectedList.length;
    };

    checkSelectedItem = id => this.props.selectedList.findIndex(item => item.id === id) !== -1;

    render() {
        const { dataList, selected } = this.props;
        return (
            <div className="table-responsive-material">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                colSpan={selected ? 5 : 4}
                                style={{
                                    textAlign: 'center',
                                    fontSize: 'large',
                                }}
                            >
                                Select customer
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="dense">Selected</TableCell>
                            <TableCell padding="dense">Username</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataList.map(user => (
                            <TableRow
                                key={user.id}
                                hover={selected}
                                onClick={this.handleSelectClick(user.id)}
                            >
                                {selected &&
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={this.checkSelectedItem(user.id)}
                                        onChange={this.handleSelectClick(user.id)}
                                    />
                                </TableCell>
                                }
                                <TableCell padding="dense">{user.username}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default ListUsers;
