import {
    Grid,
    Paper,
    Typography,
    Stack,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemText,
    Divider, Box, LinearProgress,
} from "@mui/material";
import React from "react";
import {useLoaderData} from "react-router-dom";
import type {AdoptionType} from "../types/Adoption.type.ts";
import Page from "./layout/Page.tsx";
import ArrivalsVsAdoptionsChart from "../components/common/charts/ArrivalsVsAdoptionsChart.tsx";

const healthAlerts = [
    {animal: "Milo", issue: "Fièvre", level: "Urgent"},
    {animal: "Nina", issue: "Problème digestif", level: "Modéré"},
    {animal: "Toby", issue: "Blessure patte", level: "Léger"},
];

const foodStock = [
    {item: "Croquettes chiens", quantity: 35, capacity: 100},
    {item: "Croquettes chats", quantity: 20, capacity: 80},
    {item: "Foin lapins", quantity: 75, capacity: 120},
    {item: "Graines oiseaux", quantity: 10, capacity: 50},
];

const Dashboard = () => {
    const recentAdoptions = useLoaderData();

    return (
        <Page title="Tableau de bord" description={"Dashboard du refuge animalier."}>
            <Grid container spacing={3}>

                            <ArrivalsVsAdoptionsChart></ArrivalsVsAdoptionsChart>

                <Grid size={{xs: 12, md: 6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Adoptions récentes
                            </Typography>
                            <List dense>
                                {recentAdoptions.map((adopt: AdoptionType, i: number) => (
                                    <React.Fragment key={i}>
                                        <ListItem secondaryAction={`Statut: ${adopt.status}`}>
                                            <ListItemText
                                                primary={`${adopt.animal.name} (${adopt.animal.type}) par ${adopt.adopter.name}`}
                                                secondary={`Dossier ouvert le ${new Date(adopt.date).toLocaleDateString()}`}
                                            />
                                        </ListItem>
                                        {i < recentAdoptions.length - 1 && <Divider/>}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Alertes santé
                            </Typography>
                            <Stack spacing={2}>
                                {healthAlerts.map((alert, i) => (
                                    <Paper key={i} sx={{p: 2, display: "flex", justifyContent: "space-between"}}>
                                        <Typography>
                                            {alert.animal} – {alert.issue}
                                        </Typography>
                                        <Chip
                                            label={alert.level}
                                            color={
                                                alert.level === "Urgent"
                                                    ? "error"
                                                    : alert.level === "Modéré"
                                                        ? "warning"
                                                        : "default"
                                            }
                                        />
                                    </Paper>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs: 6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Stock de nourriture
                            </Typography>
                            <Stack spacing={2}>
                                {foodStock.map((food, i) => {
                                    const percent = Math.round((food.quantity / food.capacity) * 100);
                                    let color: "success" | "warning" | "error" = "success";
                                    if (percent < 30) color = "error";
                                    else if (percent < 60) color = "warning";

                                    return (
                                        <Box key={i}>
                                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                                <Typography>{food.item}</Typography>
                                                <Chip
                                                    label={`${food.quantity} / ${food.capacity}`}
                                                    color={color}
                                                    size="small"
                                                />
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={percent}
                                                color={color}
                                                sx={{height: 8, borderRadius: 5, mt: 1}}
                                            />
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Page>
    );
};

export default Dashboard;