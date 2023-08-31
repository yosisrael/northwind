import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Service/AuthService";
import notifyService from "../../../Service/NotifyService";
import appConfig from "../../../Utils/AppConfig";
import "./Register.css";
import useTitle from "../../../Utils/UseTitle";

function Register(): JSX.Element {

    useTitle("Register");

    const { register, handleSubmit } = useForm<UserModel>();

    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            console.log(user);
            await authService.register(user);
            notifyService.success("You registered successfully");
            navigate(appConfig.homeRoute);
        } catch (err) {
            notifyService.error(err)
        }

    }

    return (
        <div className="Register">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>First Name:</label>
                <input type="text" {...register("firstName")} />

                <label>Last Name:</label>
                <input type="text" {...register("lastName")} />

                <label>Username: </label>
                <input type="text" {...register("username")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
