import {getHealthCareById} from "../api/HealthCareRequests.ts";

export const getHealthCareDetailsData = async ({params}) => {
    const id = params.id;
    return await getHealthCareById(id!);
}