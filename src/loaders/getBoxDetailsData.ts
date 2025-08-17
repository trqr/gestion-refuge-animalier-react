import type {LoaderFunction} from "react-router-dom";
import {getBoxById} from "../api/BoxRequests.ts";

export const getBoxDetailsData: LoaderFunction = async ({params}) => {

    const id = params.id;

    return await getBoxById(id!)
}