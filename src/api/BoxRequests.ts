import {api} from "./axios.config.ts";

export const getAllBoxes = async () => {
    return api.get('/boxes')
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}