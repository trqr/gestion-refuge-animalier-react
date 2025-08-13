import {useLoaderData} from "react-router-dom";
import {Box, Chip, Grid, Paper, Stack, Typography} from "@mui/material";
import type {BoxDetailsType} from "../types/BoxDetails.type.ts";
import AnimalCard from "../components/common/cards/AnimalCard.tsx";
import Page from "./layout/Page.tsx";

const BoxDetails = () => {
    const boxData: BoxDetailsType = useLoaderData();
    return (
        <Page title="Les box" description={"Details des box."}>
            <Box p={4}>
                <Paper elevation={3} sx={{p: 3, mb: 4}}>
                    <Typography variant="h4" gutterBottom>
                        {boxData.name}
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                        <Chip label={`Type: ${boxData.type}`} color="primary"/>
                        <Chip label={`Capacité: ${boxData.capacity}`} color="secondary"/>
                        <Chip label={`Adresse: ${boxData.address}`}/>
                        <Chip
                            label={`Animaux présents: ${boxData.animals!.length}`}
                            color="success"
                        />
                    </Stack>
                </Paper>

                <Typography variant="h5" gutterBottom>
                    Animaux dans ce box
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