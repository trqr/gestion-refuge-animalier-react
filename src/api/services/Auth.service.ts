import {api} from "../axios.config.ts";
import type {LoginDTO} from "../../components/common/AuthBox.tsx";
import {jwtDecode} from "jwt-decode";

export const login = async (loginValues: LoginDTO) => {
    return api.post("/auth/login", loginValues)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("RAtoken", res.data.token);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

interface JwtPayload {
    exp: number;
}

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("RAtoken");
    if (!token) return false;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;
        return decoded.exp > now;
    } catch (err) {
        return false;
    }
};