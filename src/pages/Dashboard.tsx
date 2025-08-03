import {
    Box,
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
import BoxStats from "../components/common/BoxStats.tsx";

// FAKE DATA
const stats = [
    {label: "Boxes", value: 12},
    {label: "Animaux", value: 47},
    {label: "Adoptions ce mois", value: 8},
    {label: "Soins en cours", value: 5},
];

const animalsByType = [
    {type: "Chien", count: 20},
    {type: "Chat", count: 22},
    {type: "Lapin", count: 3},
    {type: "Autre", count: 2},
];

const recentAdoptions = [
    {name: "Luna", type: "Chat", date: "2025-08-01"},
    {name: "Rocky", type: "Chien", date: "2025-07-29"},
    {name: "Bibi", type: "Lapin", date: "2025-07-25"},
];

const healthAlerts = [
    {animal: "Milo", issue: "Fièvre", level: "Urgent"},
    {animal: "Nina", issue: "Problème digestif", level: "Modéré"},
    {animal: "Toby", issue: "Blessure patte", level: "Léger"},
];

const Dashboard = () => {
    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Tableau de bord du refuge
            </Typography>

            <Grid container spacing={3} mb={4}>
                    <Grid size={{xs: 12, md: 6, lg: 3}}>
                        <BoxStats></BoxStats>
                        <BoxStats></BoxStats>
                        <BoxStats></BoxStats>
                        <BoxStats></BoxStats>
                    </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Graphique Animaux par type */}
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

                {/* Adoptions récentes */}
                <Grid size={{xs: 12, md: 6}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Adoptions récentes
                            </Typography>
                            <List dense>
                                {recentAdoptions.map((adopt, i) => (
                                    <React.Fragment key={i}>
                                        <ListItem>
                                            <ListItemText
                                                primary={`${adopt.name} (${adopt.type})`}
                                                secondary={`Adopté le ${new Date(adopt.date).toLocaleDateString()}`}
                                            />
                                        </ListItem>
                                        {i < recentAdoptions.length - 1 && <Divider/>}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Alertes santé */}
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
        </Box>
    );
};

export default Dashboard;