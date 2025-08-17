import {getAnimals} from "../api/AnimalRequests.ts";

export const getAnimalsListData = async () => {
    return await getAnimals();
}