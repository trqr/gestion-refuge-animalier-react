import {api} from "./axios.config.ts";
import type {LoginDTO} from "../components/common/AuthBox.tsx";

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