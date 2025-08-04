import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import {getBoxById} from "./api/BoxRequests.ts";
import BoxDetails from "./pages/BoxDetails.tsx";
import {getAnimalById} from "./api/AnimalRequests.ts";
import AnimalDetails from "./pages/AnimalDetails.tsx";


export const router = createBrowserRouter([

    {
        path: "/",
        element: <Dashboard/>
    },
    {
        path: "/box/:id",
        element: <BoxDetails/>,
        loader: (({params: {id}}) => getBoxById(id!))
    },
    {
        path: "/animal/:id",
        element: <AnimalDetails/>,
        loader: (({params: {id}}) => getAnimalById(id!))
    }
]);




