import {api} from "./axios.config.ts";
import type {AdoptionDTO} from "../types/DTOs/AdoptionDTO.ts";
import {toast} from "react-toastify";

export const getAllAdoptions = async () => {
    return await api.get("/adoption")
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const getLastMonthAdoptions = async () => {
    return await api.get("/adoption/last-month")
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const createAdoption = async (adoptionDto: AdoptionDTO) => {
    return await api.post("/adoption", adoptionDto)
        .then(res => {
            console.log(res.data);
            toast.success(`Adoption en cours du ${res.data.animal.type} nommé ${res.data.animal.name} par ${res.data.adopter.name}`);
            return res.data
        })
        .catch(err => {
            console.log(err);
            toast.error("Une erreur est survenue lors de la création du dossier.")
            return err;
        })
}

export const getLast5Adoptions = async () => {
    return await api.get("/adoption/last-5")
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

