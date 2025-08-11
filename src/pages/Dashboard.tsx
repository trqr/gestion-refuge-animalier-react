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
    Divider,
} from "@mui/material";
import React from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
import {useLoaderData} from "react-router-dom";
import type {AdoptionType} from "../types/Adoption.type.ts";


const animalsByType = [
    {type: "Chien", count: 20},
    {type: "Chat", count: 22},
    {type: "Lapin", count: 3},
    {type: "Autre", count: 2},
];

const healthAlerts = [
    {animal: "Milo", issue: "Fièvre", level: "Urgent"},
    {animal: "Nina", issue: "Problème digestif", level: "Modéré"},
    {animal: "Toby", issue: "Blessure patte", level: "Léger"},
];

const Dashboard = () => {
    const recentAdoptions = useLoaderData();

    return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Répartition des animaux
                            </Typography>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={animalsByType}>
                                    <XAxis dataKey="type"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Bar dataKey="count" fill="#1976d2"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

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
            </Grid>
    );
};

export default Dashboard;