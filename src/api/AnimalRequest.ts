import {api} from "./axios.config.ts";

export const getAnimals = async () => {
    return api.get('/animals')
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}