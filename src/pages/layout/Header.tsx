import {Box, Grid, Typography} from "@mui/material";
import ThemeSwitch from "../../theme/ThemeSwitch.tsx";
import BoxStats from "../../components/common/BoxStats.tsx";
import AnimalStats from "../../components/common/AnimalStats.tsx";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant="h4" sx={{cursor: "pointer"}}  onClick={() => navigate("/")} gutterBottom>
                    Tableau de bord
                </Typography>
                <ThemeSwitch></ThemeSwitch>
            </Box>


            <Grid container spacing={3} mb={4}>
                <BoxStats></BoxStats>
                <AnimalStats></AnimalStats>
                <BoxStats></BoxStats>
                <BoxStats></BoxStats>
            </Grid>
        </>
    )
}

export default Header;