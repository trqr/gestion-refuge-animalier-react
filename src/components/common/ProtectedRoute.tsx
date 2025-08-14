import React, {type JSX} from "react";
import {isAuthenticated} from "../../api/services/Auth.service.ts";
import {Navigate} from "react-router-dom";

type ProtectedRouteProps = {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace/>;
    }
    return children;
};

export default ProtectedRoute;