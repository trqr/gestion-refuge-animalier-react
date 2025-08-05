// src/components/Layout.tsx
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import Header from "./Header.tsx";

const Layout = () => {
    return (
        <>
            <Container>
                <Header/>
                <Outlet/>
            </Container>
        </>
    );
};

export default Layout;
