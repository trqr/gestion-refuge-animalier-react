import type {LoaderFunction} from "react-router-dom";
import {getLast5Adoptions} from "../api/AdoptionRequests.ts";

export const getDashboardData: LoaderFunction = async () => {
    return await getLast5Adoptions();
}