import {api} from "./axios.config.ts";

export const getVets = async () => {
    return api.get('/veterinarian')
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}