import {api} from "./axios.config.ts";

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