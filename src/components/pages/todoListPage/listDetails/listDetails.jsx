import React, {useContext, useEffect, useState} from "react";
import {Button, ButtonGroup, Container, Grid, Paper} from "@mui/material";
import {Spinner} from "../../../spinner";
import TodoService from "../../../../service/todoService";
import {CustomIcon} from "../../../customIcon";
import PersonIcon from '@mui/icons-material/Person';
import Alert from "@mui/material/Alert";
import {ConfirmationDialog} from "../../../confirmationDialog/confirmationDialog";
import {AddNewItemModal} from "./addNewItemModal";
import {ItemList} from "./ItemList";
import {EventServiceContext} from "../../../../service/eventService";

import './listDetails.css';

export const ListDetails = ({listId}) => {

    const [isLoading, setLoading] = useState(!!listId);
    const [error, setError] = useState();
    const [list, setList] = useState();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [createItemModal, setCreateItemModal] = useState(false);

    const {subscribe, unsubscribe} = useContext(EventServiceContext);

    useEffect(() => {
        setError(null);
        if (!listId) {
            setLoading(false);
            setList(null);
            return;
        }
        TodoService.getList(listId)
            .then((resp) => {
                setList(resp);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to pull data");
                setLoading(false);
            })
    }, [listId]);

    useEffect(() => {
        subscribe("item-completed", (topic, message) => {
            setList((oldList) => {
                return {
                    ...oldList,
                    items: oldList.items.map((item) => {
                        if (message.itemId === item.id) {
                            item.completed = message.isCompleted
                        }
                        return item;
                    })
                }
            })
        });

        subscribe("list-update", (topic, data) => {
            setList(data);
        });
        subscribe("item-deleted", (topic, {itemId}) => {
            setList((prevList) => {
                return {
                    ...prevList,
                    items: prevList.items.filter(item => itemId !== item.id)
                }
            });
        });
        subscribe("item-added", (topic, item) => {
            setList((prevList) => {
                return {
                    ...prevList,
                    items: [...prevList.items, item]
                }
            });
        });
        return () => {
            unsubscribe("item-completed");
            unsubscribe("item-deleted");
            unsubscribe("list-update");
            unsubscribe("item-added");
        }
    }, [subscribe, unsubscribe]);

    const onListDelete = () => {
        TodoService.deleteList(listId)
            .then(() => {
                setDeleteModalOpen(false);
            }).catch((err) => {
                console.error(err);
                setDeleteModalOpen(false);
                setError('Failed to delete the list');
            }
        )
    }

    const onMarkItemCompleted = (itemId, isCompleted) => {
        return TodoService.setItemCompleted(itemId, isCompleted)
            .catch((err) => {
                console.error(err);
                setError("Failed to complete Item");
            })
    }

    const onItemDelete = (itemId) => {
        return TodoService.deleteItem(itemId)
            .then(() => {
                setList((oldList) => {
                    return {
                        ...oldList,
                        items: oldList.items.filter((item) => itemId !== item.id)
                    }
                })
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to delete Item");
            })
    }

    if (isLoading) {
        return (
            <Paper elevation={3}>
                <Spinner/>
            </Paper>
        )
    }

    if (error) {
        return (
            <Paper elevation={3}>
                <Alert severity="error">{error}</Alert>
            </Paper>
        )
    }

    if (!list) {
        return (
            <Paper elevation={3}>
                <Alert variant="outlined" severity="info">
                    To view a ToDo list select it on the left menu.
                </Alert>
            </Paper>
        )
    }

    return (
        <Paper elevation={3}>
            <Container>
                <br/>
                <Grid
                    className='space-between'
                    container
                    direction="row"
                    alignItems="center"
                >
                    <Grid item>
                        <div className='list-title'>
                            <CustomIcon iconName={list.icon} fontSize="large"/> {list.title}
                        </div>
                        <div className='minor'>
                            {list.public
                                ? <p>This list is <b>public</b>! Any changes applied to it can affect other users."</p>
                                : <p>This list is <b>private</b> and only you are allowed to view and modify it.</p>
                            }
                        </div>
                    </Grid>
                    <Grid item>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button
                                onClick={() => setEditModalOpen(true)}>
                                Edit
                            </Button>
                            <Button variant="contained"
                                    color="error"
                                    onClick={() => setDeleteModalOpen(true)}>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>

                <p><PersonIcon fontSize="small"/> Created By <b>{list.createdBy.displayName}</b></p>
                <ItemList items={list.items}
                          onAddItemClick={() => setCreateItemModal(true)}
                          onMarkItemCompleted={onMarkItemCompleted}
                          onItemDelete={onItemDelete}
                />
            </Container>

            <ConfirmationDialog open={deleteModalOpen}
                                title="Delete the List"
                                text={`Are you sure you want to delete ${list.title} list?`}
                                handleClose={() => setDeleteModalOpen(false)}
                                onConfirm={onListDelete}/>

            <ConfirmationDialog open={editModalOpen}
                                title="Edit list"
                                text={`Я не встиг реалізувати цей блок, бо трохи волонтерив! Сподіваюсь на ваше розуміння ;)`}
                                handleClose={() => setEditModalOpen(false)}
                                onConfirm={() => setEditModalOpen(false)}/>

            <AddNewItemModal isOpen={createItemModal}
                             onClose={() => setCreateItemModal(false)}
                             listId={list.id}/>
        </Paper>
    );
}
