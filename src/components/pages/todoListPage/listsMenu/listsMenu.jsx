import React, {useState} from "react";

import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import {Divider, IconButton, ListItem} from "@mui/material";
import {Spinner} from "../../../spinner";
import {CustomIcon} from "../../../customIcon";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {AddNewListModal} from "./addNewListModal";

const addNewListComponent = ({onSelect}) => {
    return (
        <ListItemButton onClick={onSelect}>
            <ListItemIcon>
                <AddCircleIcon fontSize="large" color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Create a new List"/>
        </ListItemButton>
    )
};

export const ListsMenu = (props) => {

    const {
        handleSelect,
        privateLists,
        publicLists,
        onListCreated,
        isLoading
    } = props;

    const [createListModalOpen, setCreateListModalOpen] = useState(false);

    if (isLoading) {
        return
    }

    return isLoading ? (
        <Spinner/>
    ) : (
        <Paper elevation={3}>
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            >
                <ListFolder title="Public TODO lists" data={publicLists}
                            icon={<PublicIcon fontSize="large" color="primary"/>}
                            handleSelect={handleSelect}/>
                <Divider/>
                <ListFolder title="Private TODO lists" data={privateLists}
                            icon={<PersonIcon fontSize="large" color="primary"/>}
                            handleSelect={handleSelect}/>
                <Divider/>
                {addNewListComponent({
                    onSelect: () => setCreateListModalOpen(true)
                })}
            </List>

            <AddNewListModal isOpen={createListModalOpen}
                             onClose={() => setCreateListModalOpen(false)}
                             onListCreated={onListCreated}
            />
        </Paper>
    );
}

const ListFolder = ({title, data, icon, handleSelect, defaultOpen = false}) => {
    const [open, setOpen] = useState(defaultOpen || data.length === 0);

    const onToggleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const listItemComponent = (todoItem) => (
        <ListItemButton sx={{pl: 4}}
                        key={`key-${todoItem.id}`}
                        onClick={() => handleSelect(todoItem.id)}>
            <ListItemIcon>
                <CustomIcon iconName={todoItem.icon}/>
            </ListItemIcon>
            <ListItemText primary={todoItem.title}/>
        </ListItemButton>
    );

    return (
        <React.Fragment>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="comments"
                                onClick={onToggleClick}>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                }>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={title}/>
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {data.map(listItemComponent)}
                </List>
            </Collapse>
        </React.Fragment>
    );
}
