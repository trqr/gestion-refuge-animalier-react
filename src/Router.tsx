import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import {getBoxById} from "./api/BoxRequests.ts";
import BoxDetails from "./pages/BoxDetails.tsx";
import {getAnimalById} from "./api/AnimalRequests.ts";
import AnimalDetails from "./pages/AnimalDetails.tsx";
import Layout from "./pages/layout/Layout.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
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
        ]
    }
]);




