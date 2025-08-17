import {getAllAdoptions} from "../api/AdoptionRequests.ts";

export const getAdoptionsListData = async () => {
    return await getAllAdoptions();
}