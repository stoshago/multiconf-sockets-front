import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Grid} from "@mui/material";
import {ListsMenu} from "./listsMenu";
import './todoListPage.css';
import {ListDetails} from "./listDetails";
import TodoService from "../../../service/todoService";

export const TodoListPage = () => {
    const navigate = useNavigate();

    let {listId} = useParams();
    const [selectedList, selectList] = useState(listId);
    const [privateLists, setPrivateLists] = useState([]);
    const [publicLists, setPublicLists] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        TodoService.getAllLists().then(
            ({privateLists, publicLists}) => {
                setPublicLists(publicLists);
                setPrivateLists(privateLists);
                setLoading(false);
            }
        );
    }, []);

    useEffect(() => {
        selectList(listId)
    }, [listId])

    const handleSelectList = (selectedId) => {
        selectList(selectedId);
        navigate(`/todos/${selectedId}`);
    }

    const onListCreated = (list) => {
        if (list.public) {
            setPublicLists((prevList) => [...prevList, list])
        } else {
            setPrivateLists((prevList) => [...prevList, list])
        }
        handleSelectList(list.id);
    }

    const onListDeleted = (list) => {
        if (list.public) {
            setPublicLists((prevList) => prevList.filter(item => item.id !== list.id));
        } else {
            setPrivateLists((prevList) => prevList.filter(item => item.id !== list.id));
        }
        navigate('/todos?deleted');
    }

    return (
        <Container className='container'>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ListsMenu handleSelect={handleSelectList}
                               privateLists={privateLists}
                               publicLists={publicLists}
                               onListCreated={onListCreated}
                               isLoading={isLoading}
                               setLoading={setLoading}
                    />
                </Grid>
                <Grid item xs={8}>
                    <ListDetails listId={selectedList}
                                 onListDeleted={onListDeleted}/>
                </Grid>
            </Grid>
        </Container>
    );
};
