import axios from "axios";

import AuthService from "./auth.service";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const SkillService = {};

SkillService.search = (data) => {
    return axios.post(BACKEND_HOST + "/skills/search", data, AuthService.authHeader());
};

export default SkillService;
