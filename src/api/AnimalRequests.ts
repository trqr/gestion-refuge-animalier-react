import {api} from "./axios.config.ts";
import type {AnimalType} from "../types/Animal.type.ts";
import {toast} from "react-toastify";

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

export const boxSwitching = async (animal: AnimalType, boxId: number) => {
    return api.patch(`/animals/${animal.id}?boxId=${boxId}`)
        .then(res => {
            console.log(res.data);
            toast.success(`Transfère réussi! ${animal.name} est bien arrivé dans son nouveau Box ID: ${boxId}`);
            return res.data
        })
        .catch(err => {
            console.log(err);
            toast.error(err.response.data);
            return err;
        })
}

export const getAnimalBox = async (animalId: number) => {
    return api.get(`/animals/getbox/${animalId}`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}