import {api} from "./axios.config.ts";
import type {AnimalType} from "../types/Animal.type.ts";

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

export const getAnimalById = async (animalId: string) => {
    return api.get('/animals/' + animalId)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const getNumberOfAnimals = async () => {
    return api.get('/animals/total')
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const addAnimal = async (animal: AnimalType) => {
    return api.post('/animals/add', animal)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const boxSwitching = async (animalId: number, boxId: number) => {
    return api.patch(`/animals/${animalId}?boxId=${boxId}`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}