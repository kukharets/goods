import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


class TypeCategoryItem extends React.PureComponent {
    static propTypes = {
        handleDelete: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    render() {
        const { items, handleDelete } = this.props;
        return (
            <div>
                <List>
                    {items.map(item => (
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={item.title}
                                secondary={item.note}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={handleDelete(item.id)}
                                    aria-label="Delete"
                                    color="secondary"
                                >
                                    <i className="zmdi zmdi-delete" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}


export default TypeCategoryItem;
