import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Grid} from "@mui/material";
import {ListsMenu} from "./listsMenu";
import './todoListPage.css';
import {ListDetails} from "./listDetails";
import TodoService from "../../../service/todoService";
import {EventServiceContext} from "../../../service/eventService";

export const TodoListPage = () => {
    const navigate = useNavigate();
    const {subscribe, unsubscribe} = useContext(EventServiceContext);

    let {listId} = useParams();
    const [selectedList, selectList] = useState(listId);
    const [privateLists, setPrivateLists] = useState([]);
    const [publicLists, setPublicLists] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const pullData = () => {
        TodoService.getAllLists().then(
            ({privateLists, publicLists}) => {
                setPublicLists(publicLists);
                setPrivateLists(privateLists);
                setLoading(false);
            }
        );
    }

    useEffect(() => {
        pullData();
    }, []);

    useEffect(() => {
        subscribe("list-added", (topic, list) => {
            const setCorrectList = list.public ? setPublicLists : setPrivateLists;
            setCorrectList((prevList) => [...prevList, list]);
        });
        subscribe("list-deleted", (topic, list) => {
            const setCorrectList = list.public ? setPublicLists : setPrivateLists;
            setCorrectList((prevList) => prevList.filter(item => item.id !== list.listId));
            if (selectedList === list.listId) {
                selectList(null);
                navigate('/todos?deleted');
            }
        });
        subscribe("private-lists-update", () => {
            setLoading(true);
            selectList(null);
            pullData();
            navigate('/todos?updatedAll');
        });

        return () => {
            unsubscribe("list-added");
            unsubscribe("list-deleted");
            unsubscribe("private-lists-update");
        }
    }, [subscribe, unsubscribe, navigate, selectedList]);

    useEffect(() => {
        selectList(listId)
    }, [listId])

    const handleSelectList = (selectedId) => {
        selectList(selectedId);
        navigate(`/todos/${selectedId}`);
    }

    return (
        <Container className='container'>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ListsMenu handleSelect={handleSelectList}
                               privateLists={privateLists}
                               publicLists={publicLists}
                               isLoading={isLoading}
                               setLoading={setLoading}
                    />
                </Grid>
                <Grid item xs={8}>
                    <ListDetails listId={selectedList}/>
                </Grid>
            </Grid>
        </Container>
    );
};
