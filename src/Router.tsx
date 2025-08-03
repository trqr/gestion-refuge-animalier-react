import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import {getBoxById} from "./api/BoxRequests.ts";
import BoxDetails from "./pages/BoxDetails.tsx";


export const router = createBrowserRouter([

    {
        path: "/",
        element: <Dashboard/>
    },
    {
        path: "/box/:id",
        element: <BoxDetails/>,
        loader: (({params: {id}}) => getBoxById(id!))
    }
]);




