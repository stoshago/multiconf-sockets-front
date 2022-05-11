import {HTTPService} from "./httpService";
import AuthService from "./authService";

const withBearerHeader = () => {
    return {
        headers: {
            Authorization: `Bearer ${AuthService.getToken()}`
        }
    }
}

class TodoService {

    getAllLists = () => {
        return HTTPService.get('/api/todo/list/all', withBearerHeader());
    }

    getList = (id) => {
        return HTTPService.get(`/api/todo/list/${id}`, withBearerHeader());
    }

    createList = (request) => {
        return HTTPService.post('/api/todo/list', request, withBearerHeader());
    }

    deleteList = (id) => {
        return HTTPService.delete(`/api/todo/list/${id}`, withBearerHeader());
    }

    createItem = (listId, request) => {
        return HTTPService.post(`/api/todo/list/${listId}`, request, withBearerHeader());
    }

    setItemCompleted = (itemId, isCompleted) => {
        return HTTPService.put(`/api/todo/item/${itemId}/complete/${isCompleted}`, null, withBearerHeader());
    }

    deleteItem = (id) => {
        return HTTPService.delete(`/api/todo/item/${id}`, withBearerHeader());
    }

}

export default new TodoService();
