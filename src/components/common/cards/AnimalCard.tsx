import {Card, CardContent, CardMedia, Divider, Grid, Stack, Typography} from "@mui/material";
import type {AnimalType} from "../../../types/Animal.type.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type AnimalCardProps = {
    animal: AnimalType;
}

const AnimalCard = ({animal}: AnimalCardProps) => {
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState(animal.picture || "https://placehold.co/1200x1200");

    return (
        <>
            <Grid size={{xs: 12, sm: 6, md: 4}} key={animal.id}>
                <Card sx={{cursor: "pointer"}} onClick={() => navigate(`/animal/${animal.id}`)}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={imgSrc}
                        onError={() => setImgSrc("https://placehold.co/500x400")}
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
        </>
    )
}

export default AnimalCard