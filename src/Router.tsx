import {createBrowserRouter} from "react-router-dom";
import {getAnimals} from "./api/AnimalRequest.ts";
import Home from "./pages/Home.tsx";


export const router = createBrowserRouter([

    {
        path: "/",
        element: <Home/>,
        loader: () => getAnimals()
    }
]);




