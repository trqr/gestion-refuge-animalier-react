import {useLoaderData} from "react-router-dom";
import Page from "./layout/Page.tsx";
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Box,
    Avatar,
    Grid,
} from "@mui/material";
import type {HealthCareType} from "../types/HealthCare.type.ts";

const HealthCareDetails = () => {
    const healthCare: HealthCareType = useLoaderData();

    return (
        <Page title={`Soin ${healthCare.id}`} description="Détails du soin">
            <Card
                sx={{
                    maxWidth: 800,
                    margin: "0 auto",
                    mt: 4,
                    borderRadius: 3,
                    boxShadow: 4,
                    p: 2,
                }}
            >
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {healthCare.type}
                    </Typography>

                    <Divider sx={{mb: 3}}/>

                    <Box sx={{mb: 3}}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Date du soin
                        </Typography>
                        <Typography>
                            {new Date(healthCare.date).toLocaleDateString("fr-FR")}
                        </Typography>
                    </Box>

                    <Box sx={{mb: 3}}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Description
                        </Typography>
                        <Typography>{healthCare.description}</Typography>
                    </Box>

                    <Divider sx={{my: 3}}/>

                    <Grid container spacing={2} alignItems="center" sx={{mb: 3}}>
                        <Grid >
                            <Avatar
                                src={healthCare.animal.picture}
                                alt={healthCare.animal.name}
                                sx={{width: 56, height: 56}}
                            />
                        </Grid>
                        <Grid>
                            <Typography variant="h6">Animal</Typography>
                            <Typography>
                                <strong>{healthCare.animal.name}</strong> ({healthCare.animal.type} –{" "}
                                {healthCare.animal.race})
                            </Typography>
                            <Typography>
                                Sexe : {healthCare.animal.sex} | Santé : {healthCare.animal.health}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Né le {new Date(healthCare.animal.birthDate).toLocaleDateString("fr-FR")}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{my: 3}}/>

                    <Grid container spacing={2} alignItems="center">
                        <Grid>
                            <Avatar>{healthCare.veterinarian.name.charAt(0)}</Avatar>
                        </Grid>
                        <Grid sx={{xs: 6}}>
                            <Typography variant="h6">Vétérinaire</Typography>
                            <Typography>
                                <strong>{healthCare.veterinarian.name}</strong> –{" "}
                                {healthCare.veterinarian.speciality}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Adresse : {healthCare.veterinarian.address}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Page>
    );
};

export default HealthCareDetails;
