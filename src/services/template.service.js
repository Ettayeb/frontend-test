import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const TemplateService = {};

TemplateService.getAll = () => {
    return axios.get(BACKEND_HOST + "/templates", AuthService.authHeader());
};

export default TemplateService;
