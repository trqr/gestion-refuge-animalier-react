import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import {getBoxById} from "./api/BoxRequests.ts";
import BoxDetails from "./pages/BoxDetails.tsx";
import {getAnimalById, getAnimals} from "./api/AnimalRequests.ts";
import AnimalDetails from "./pages/AnimalDetails.tsx";
import Layout from "./pages/layout/Layout.tsx";
import AnimalsList from "./pages/AnimalsList.tsx";
import {getAllAdoptions, getLast5Adoptions} from "./api/AdoptionRequests.ts";
import AdoptionsList from "./pages/AdoptionsList.tsx";
import AuthentificationPage from "./pages/AuthentificationPage.tsx";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <AuthentificationPage/>
    },
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>,
                loader: () => getLast5Adoptions()
            },
            {
                path: "/box/:id",
                element: <BoxDetails/>,
                loader: (({params: {id}}) => getBoxById(id!))
            },
            {
                path: "/animals",
                element: <AnimalsList/>,
                loader: (() => getAnimals())
            },
            {
                path: "/animal/:id",
                element: <AnimalDetails/>,
                loader: (({params: {id}}) => getAnimalById(id!))
            },
            {
                path: "/adoptions",
                element: <AdoptionsList/>,
                loader: (() => getAllAdoptions())
            }
        ]
    }
]);




