import {Box, Button, Grid, Typography} from "@mui/material";
import ThemeSwitch from "../../theme/ThemeSwitch.tsx";
import BoxStats from "../../components/common/header/BoxStats.tsx";
import AnimalStats from "../../components/common/header/AnimalStats.tsx";
import {useNavigate} from "react-router-dom";
import HealthStats from "../../components/common/header/HealthStats.tsx";
import AdoptionStats from "../../components/common/header/AdoptionStats.tsx";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("RAtoken");
        navigate("/login");
    }

    return (
        <>
            <Box sx={{height: "100px",display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", margin: "10px"}}>
                <Box sx={{display: "flex", alignItems: "center", gap:  2}}>
                <img style={{height: "100px"}} src={"/refuge-animalier-icon.png"} alt={"logo refuge"}></img>
                <Typography variant="h4" sx={{cursor: "pointer", textAlign: "center"}}  onClick={() => navigate("/")}>
                    Refuge animalier
                </Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <ThemeSwitch></ThemeSwitch>
                    <Button variant={"text"} onClick={handleLogout}>Se déconnecter</Button>
                </Box>
            </Box>

            <Grid container spacing={2} mb={4}>
                <BoxStats></BoxStats>
                <AnimalStats></AnimalStats>
                <HealthStats></HealthStats>
                <AdoptionStats></AdoptionStats>
            </Grid>
        </>
    )
}

export default Header;