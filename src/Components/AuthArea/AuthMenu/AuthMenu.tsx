import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { rootStore } from "../../../Redux/rootReducer";
import authService from "../../../Service/AuthService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate(appConfig.loginRoute);

        setUser(rootStore.getState().authReducer.user);

        const unsubscribe = rootStore.subscribe(() => setUser(rootStore.getState().authReducer.user));

        return unsubscribe;
    }, []);

    function logoutMe() {
        authService.logout();
        notifyService.success("Buy, Buy");
    }

    return (
        <div className="AuthMenu">
            {user && <div>
                <span> Hello {user.firstName + " " + user.lastName}</span>
                <span> | </span>
                <NavLink to={appConfig.homeRoute} onClick={logoutMe}>Logout</NavLink>
            </div>}

            {!user && <div>
                <span> Hello Gest</span>
                <span> | </span>
                <NavLink to={appConfig.loginRoute}>Login</NavLink>
                <span> | </span>
                <NavLink to={appConfig.registerRoute}>Register</NavLink>
            </div>}
        </div>
    );
}

export default AuthMenu;
