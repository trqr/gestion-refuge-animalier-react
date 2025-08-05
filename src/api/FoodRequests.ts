import {api} from "./axios.config.ts";

export const getAnimalFood = async (animalId: number) => {
    return api.get(`food/by-animal/${animalId}`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}