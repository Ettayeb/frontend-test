import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Index from "./components/Dashboard/Index";
import Profile from "./components/Profile/Profile";

const routes = [
    {
        path: "",
        name: "Home",
        component: Index,
        layout: "/",
        show: true
    },
    {
        path: "profile",
        name: "Profile",
        component: Profile,
        layout: "/",
        show: true
    },

    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
        layout: "/auth",
        show: false
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        layout: "/auth",
        show: false
    }
];
export default routes;
