import {useLoaderData, useNavigate} from "react-router-dom";
import {Box, Card, CardContent, CardMedia, Chip, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import type {BoxDetailsType} from "../types/BoxDetails.type.ts";

const BoxDetails = () => {
    const boxData: BoxDetailsType = useLoaderData();
    const navigate = useNavigate();

    return (
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
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={animal.id}>
                        <Card onClick={() => navigate(`/animal/${animal.id}`)}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${animal.picture}`}
                                alt={animal.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{animal.name}</Typography>
                                <Typography color="text.secondary">
                                    {animal.type} - {animal.race}
                                </Typography>
                                <Divider sx={{my: 1}}/>
                                <Stack spacing={1}>
                                    <Typography variant="body2">
                                        Sexe: {animal.sex === "M" ? "Mâle" : "Femelle"}
                                    </Typography>
                                    <Typography variant="body2">
                                        Né(e): {new Date(animal.birthDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        Arrivé(e): {new Date(animal.arrivalDate!).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        Comportement: {animal.behaviour}
                                    </Typography>
                                    <Typography variant="body2">
                                        Santé: {animal.health}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default BoxDetails;