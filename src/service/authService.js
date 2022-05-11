import {HTTPService} from './httpService';

const AUTH_KEY = "userAuth";

const saveToken = (response) => {
    if (response.token) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(response));
    }
    return response.data;
}

class AuthService {

    signUp({username, password, displayName}) {
        return HTTPService.post('/api/auth/sign-up', {username, password, displayName})
            .then(saveToken);
    };

    authUser({username, password}) {
        return HTTPService.post('/api/auth/sign-in', {username, password})
            .then(saveToken)
            .catch(() => Promise.reject("Auth failed"));
    }

    logout() {
        localStorage.removeItem(AUTH_KEY);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(AUTH_KEY))
    }

    getToken() {
        const userData = this.getCurrentUser();
        return userData ? userData.token : null;
    }

}

export default new AuthService();
