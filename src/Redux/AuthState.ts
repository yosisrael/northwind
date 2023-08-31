import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

// State object -> class
class AuthState {
    public token: string = "";
    public user: UserModel = null;

    constructor() {
        this.token = localStorage.getItem("token");
        if (this.token) {
            this.user = jwtDecode<{ user: UserModel }>(this.token).user;
        }
    }
}


// Action types
export enum AuthActionTypes {
    Login = "Login",
    Logout = "Logout",
    Register = "Register"
}
// Action

export interface AuthAction {
    type: AuthActionTypes,
    payload?: string
}

// Reducer 

export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionTypes.Register:
        case AuthActionTypes.Login:
            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UserModel }>(newState.token).user;
            localStorage.setItem("token", newState.token);
            break;
        case AuthActionTypes.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }


    return newState;
}