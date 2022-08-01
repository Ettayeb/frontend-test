import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const ProfileService = {};

ProfileService.add = (data) => {
    return axios.post(BACKEND_HOST + "/profile", data, AuthService.authHeader());
};

ProfileService.update = (_id, data) => {
    return axios.put(BACKEND_HOST + "/profile/" + _id, data, AuthService.authHeader());
};

ProfileService.getOne = (_id) => {
    return axios.get(BACKEND_HOST + "/profile/" + _id, AuthService.authHeader());
};
ProfileService.generatePDF = (data) => {
    return axios.post(BACKEND_HOST + "/profile/pdf/", data, AuthService.authHeader());
};

export default ProfileService;
