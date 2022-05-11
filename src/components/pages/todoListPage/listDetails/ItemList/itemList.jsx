import React, {useState} from "react";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import {Divider, IconButton, ListItem} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {ConfirmationDialog} from "../../../../confirmationDialog/confirmationDialog";

export const ItemList = ({items, onAddItemClick, onMarkItemCompleted, onItemDelete}) => {

    const itemComponents = () => {
        return items.map((item) => (
            <Item item={item}
                  key={item.id}
                  onMarkItemCompleted={onMarkItemCompleted}
                  onItemDelete={onItemDelete}/>
        ));
    }

    const noItemsComponent = () => (
        <Alert variant="outlined" severity="info">
            There are not ToDo items in the list.
            But you still can add some :)
        </Alert>
    )

    return (
        <List>
            {
                items && items.length > 0 ?
                    itemComponents() :
                    noItemsComponent()
            }
            <Divider/>
            <AddNewListItemComponent onSelect={onAddItemClick}/>
        </List>
    );

}

const Item = ({item, onMarkItemCompleted, onItemDelete}) => {

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const onItemComplete = (id, checked) => {
        setLoading(true);
        onMarkItemCompleted(id, checked)
            .then(() => setLoading(false));
    }

    const onItemDeleteHandler = () => {
        onItemDelete(item.id);
    }

    return (
        <React.Fragment>
            <ListItem
                secondaryAction={
                    <IconButton edge="end"
                                aria-label="delete"
                                onClick={() => setDeleteModalOpen(true)}
                    >
                        <DeleteForeverIcon/>
                    </IconButton>
                }
            >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={item.completed}
                        disabled={isLoading}
                        tabIndex={-1}
                        onChange={(ev) => onItemComplete(item.id, ev.target.checked)}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText className={item.completed ? "item-completed" : ""}
                              primary={item.title}
                              secondary={item.details}
                />
            </ListItem>
            <ConfirmationDialog open={deleteModalOpen}
                                title="Delete the Item"
                                text={`Are you sure you want to delete the item?`}
                                handleClose={() => setDeleteModalOpen(false)}
                                onConfirm={onItemDeleteHandler}/>
        </React.Fragment>
    );
}

const AddNewListItemComponent = ({onSelect}) => {
    return (
        <ListItemButton onClick={onSelect}>
            <ListItemIcon>
                <AddCircleIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Add a new item to the List"/>
        </ListItemButton>
    )
};

