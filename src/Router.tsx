import {createBrowserRouter} from "react-router-dom";
import {getAnimals} from "./api/AnimalRequests.ts";
import Dashboard from "./pages/Dashboard.tsx";


export const router = createBrowserRouter([

    {
        path: "/",
        element: <Dashboard/>
    }
]);




