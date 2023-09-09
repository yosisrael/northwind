import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { AuthAction, AuthActionTypes, authReducer } from "../Redux/AuthState";
import { rootStore } from "../Redux/rootReducer";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {

    public async register(user: UserModel): Promise<void> {

        // Send use model in order to sign up
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Extract the token from the response
        const token = response.data;

        // Save the token and use in the state.
        const action: AuthAction = { type: AuthActionTypes.Register, payload: token };
        rootStore.dispatch(action);
    }

    // Login
    public async login(credentials: CredentialsModel): Promise<void> {
        // Send username and password
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Extract token from response
        const token = response.data;

        // Save token and user.
        const action: AuthAction = { type: AuthActionTypes.Login, payload: token};
        rootStore.dispatch(action);
    }

    // Logout 
    public logout(): void {
        const action: AuthAction = { type: AuthActionTypes.Logout };
        rootStore.dispatch(action);
    }

}

const authService = new AuthService();

export default authService;