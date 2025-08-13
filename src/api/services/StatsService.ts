import {api} from "../axios.config.ts";

export const getArrivalsVsAdoptions = async () => {
    return api.get('stats/arrivals-vs-adoptions')
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}