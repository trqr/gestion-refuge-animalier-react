import {useLoaderData, useNavigate} from "react-router-dom";
import {Box, Button, Chip, Grid, Paper, Stack, Typography} from "@mui/material";
import type {BoxDetailsType} from "../types/BoxDetails.type.ts";
import AnimalCard from "../components/common/cards/AnimalCard.tsx";
import Page from "./layout/Page.tsx";
import {deleteBox} from "../api/BoxRequests.ts";

const BoxDetails = () => {
    const boxData: BoxDetailsType = useLoaderData();
    const navigate = useNavigate();

    const handleBoxDelete = async () => {
        try {
            await deleteBox(boxData.id!);
            navigate("/");
        } catch (e){
            console.error("Erreur suppression :", e);
        }

    }

    return (
        <Page title="Les box" description={"Details des box."}>
            <Box p={4}>
                <Paper elevation={3} sx={{p: 3, mb: 4}}>
                    <Typography variant="h4" gutterBottom>
                        {boxData.name}
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                        <Chip label={`Type: ${boxData.type}`} color="primary"/>
                        <Chip label={`Capacité: ${boxData.capacity}`} color="secondary"/>
                        <Chip label={`Adresse: ${boxData.address}`}/>
                        <Chip
                            label={`Animaux présents: ${boxData.animals!.length}`}
                            color="success"
                        />

                    </Stack>
                    <Button variant={"text"} color={"error"} onClick={handleBoxDelete}>Supprimer</Button>
                    </Box>
                </Paper>

                <Typography variant="h5" gutterBottom>
                    {boxData.animals?.length === 0 ? "Aucun animal dans ce box." : "Animaux dans ce box"}
                </Typography>
                <Grid container spacing={3}>
                    {boxData.animals!.map((animal) => (
                        <AnimalCard key={animal.id} animal={animal}></AnimalCard>
                    ))}
                </Grid>
            </Box>
        </Page>
    )
}

export default BoxDetails;