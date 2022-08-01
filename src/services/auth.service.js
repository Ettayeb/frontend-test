import axios from "axios";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const AuthService = {};
AuthService.login = (email, password) => {
    return axios.post(BACKEND_HOST + "/auth/login", {
        email: email,
        password: password
    });
};
AuthService.signUp = (data) => {
    return axios.post(BACKEND_HOST + "/auth/signup", data);
};

AuthService.logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

AuthService.isLoggedIn = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
        let payload = atob(token.split(".")[1]);
        let exp = new Date(JSON.parse(payload).exp * 1000);
        return exp > new Date();
    } else {
        return false;
    }
};
AuthService.getUser = () => {
    if (AuthService.isLoggedIn()) {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            return user;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
AuthService.authHeader = () => {
    if (AuthService.isLoggedIn()) {
        let token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            return {
                headers: {
                    Authorization: token
                }
            };
        } else {
            window.location.href = "/auth/login";
        }
    } else {
        window.location.href = "/auth/login";
    }
};

AuthService.update = (user) => {
    return axios.put(BACKEND_HOST + "/admins/" + user._id, user, AuthService.authHeader());
};
AuthService.getOne = (id) => {
    console.log(id);
    return axios.get(BACKEND_HOST + "/admins/" + id, AuthService.authHeader());
};

export default AuthService;
