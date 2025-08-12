import {Box, Grid, Typography} from "@mui/material";
import ThemeSwitch from "../../theme/ThemeSwitch.tsx";
import BoxStats from "../../components/common/header/BoxStats.tsx";
import AnimalStats from "../../components/common/header/AnimalStats.tsx";
import {useNavigate} from "react-router-dom";
import HealthStats from "../../components/common/header/HealthStats.tsx";
import AdoptionStats from "../../components/common/header/AdoptionStats.tsx";

const Header = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", margin: "10px"}}>
                <Typography variant="h4" sx={{cursor: "pointer"}}  onClick={() => navigate("/")} gutterBottom>
                    Tableau de bord du refuge animalier
                </Typography>
                <ThemeSwitch></ThemeSwitch>
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