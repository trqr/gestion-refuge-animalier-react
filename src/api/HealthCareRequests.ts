import {api} from "./axios.config.ts";
import type {HealthCareDTO} from "../types/DTOs/HealthCareDTO.ts";

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

export const addHealthCare = async (dto: HealthCareDTO) => {
    return api.post(`healthcare`, dto)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}