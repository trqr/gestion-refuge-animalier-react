import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import BoxDetails from "./pages/BoxDetails.tsx";
import AnimalDetails from "./pages/AnimalDetails.tsx";
import Layout from "./pages/layout/Layout.tsx";
import AnimalsList from "./pages/AnimalsList.tsx";
import AdoptionsList from "./pages/AdoptionsList.tsx";
import AuthentificationPage from "./pages/AuthentificationPage.tsx";
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";
import HealthCareDetails from "./pages/HealthCareDetails.tsx";
import {getAnimalDetailsData} from "./loaders/getAnimalDetailsData.ts";
import {getDashboardData} from "./loaders/getDashboardData.ts";
import {getBoxDetailsData} from "./loaders/getBoxDetailsData.ts";
import {getAnimalsListData} from "./loaders/getAnimalsListData.ts";
import {getAdoptionsListData} from "./loaders/getAdoptionsListData.ts";
import {getHealthCareDetailsData} from "./loaders/getHealthCareDetailsData.ts";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <AuthentificationPage/>
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout/>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Dashboard/>,
                loader: getDashboardData,
            },
            {
                path: "/box/:id",
                element: <BoxDetails/>,
                loader: getBoxDetailsData,
            },
            {
                path: "/animals",
                element: <AnimalsList/>,
                loader: getAnimalsListData,
            },
            {
                path: "/animal/:id",
                element: <AnimalDetails/>,
                loader: getAnimalDetailsData,
            },
            {
                path: "/adoptions",
                element: <AdoptionsList/>,
                loader: getAdoptionsListData,
            },
            {
                path: "/healthcare/:id",
                element: <HealthCareDetails/>,
                loader: getHealthCareDetailsData,
            },
        ]
    }
]);




