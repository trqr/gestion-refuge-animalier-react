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