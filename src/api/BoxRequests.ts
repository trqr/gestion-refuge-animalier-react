import {api} from "./axios.config.ts";
import type {BoxDetailsType} from "../types/BoxDetails.type.ts";
import {toast} from "react-toastify";

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

export const getAllBoxesAvaibility = async () => {
    return api.get('/boxes/avaibility')
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const getBoxById = async (boxId: string) => {
    return api.get('/boxes/' + boxId)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const getNumberOfBoxes = async () => {
    return api.get('/boxes/total')
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const getNumberOfUsedBoxes = async () => {
    return api.get('/boxes/usedNb')
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const createBox = async (box: BoxDetailsType) => {
    return api.post('boxes/create', box)
        .then(res => {
            toast.success('Le box a été crée avec succés.');
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            toast.error('Erreur lors de la création du box.');
            console.log(err);
            return err;
        })
}