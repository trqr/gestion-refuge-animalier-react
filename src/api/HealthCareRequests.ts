import {api} from "./axios.config.ts";
import type {HealthCareDTO} from "../types/DTOs/HealthCareDTO.ts";
import {toast} from "react-toastify";

export const getAllHealthCares = async () => {
    return api.get(`healthcare`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const getNextHealthCares = async () => {
    return api.get(`healthcare/next`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const getHealthCareById = async (healthCareId: string) => {
    return api.get(`healthcare/${healthCareId}`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const getAnimalHealthCares = async (animalId: number) => {
    return api.get(`healthcare/animal/${animalId}`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const getAnimalNextHealthCare = async (animalId: number) => {
    return api.get(`healthcare/next/animal/${animalId}`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const addHealthCare = async (dto: HealthCareDTO) => {
    return api.post(`healthcare`, dto)
        .then(res => {
            console.log(res.data);
            toast.success("Votre soin a bien été enregitré");
            return res.data
        })
        .catch(err => {
            console.log(err);
            toast.error("Erreur lors de l'enregistrement du soin: " + err.message);
            return err;
        })
}