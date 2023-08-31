import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Service/AuthService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import useTitle from "../../../Utils/UseTitle";
import "./Login.css";
import { useEffect } from "react";

function Login(): JSX.Element {

    useTitle("Login");

    const { register, handleSubmit } = useForm<CredentialsModel>();

    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            navigate(appConfig.homeRoute);
        } catch (err) {
            notifyService.error(err)
        }

    }

    return (
        <div className="Register">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Username: </label>
                <input type="text" {...register("username")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
