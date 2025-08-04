import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Box,
    Divider,
    Button,
    Select,
    Dialog,
    DialogTitle, DialogContent, DialogActions,
    MenuItem
} from "@mui/material";
import type {AnimalType} from "../types/Animal.type.ts";
import {useLoaderData} from "react-router-dom";
import {useEffect, useState, useTransition} from "react";
import type {BoxDetailsType} from "../types/BoxDetails.type.ts";
import {getAllBoxes} from "../api/BoxRequests.ts";
import {boxSwitching} from "../api/AnimalRequests.ts";

const AnimalDetails = () => {
    const animal: AnimalType = useLoaderData();
    const [boxes, setBoxes] = useState<BoxDetailsType[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBoxId, setSelectedBoxId] = useState<number>(animal.boxId);
    const [isPending, startTransition] = useTransition()

    const handleChangeBox = async () => {
        await boxSwitching(animal.id!, selectedBoxId);
        setOpenDialog(false);
    };

    useEffect(() => {
        startTransition(async () => {
            const fetchedBoxes: BoxDetailsType[] = await getAllBoxes();
            setBoxes(fetchedBoxes);
        })
    }, [selectedBoxId]);

    return (
        <>
        <Card sx={{maxWidth: 600, margin: "2rem auto", borderRadius: 4, boxShadow: 4}}>
            <CardMedia
                component="img"
                height="300"
                image={animal.picture || "/placeholder.jpg"} // Mets un fallback si l’image est vide
                alt={animal.name}
                sx={{objectFit: "cover"}}
            />
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {animal.name}
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{xs: 6}}>
                        <Typography variant="subtitle1"><strong>Type :</strong> {animal.type}</Typography>
                        <Typography variant="subtitle1"><strong>Race :</strong> {animal.race}</Typography>
                        <Typography variant="subtitle1"><strong>Sexe :</strong> {animal.sex}</Typography>
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <Typography variant="subtitle1"><strong>Date de naissance :</strong> {animal.birthDate}
                        </Typography>
                        <Typography variant="subtitle1"><strong>Date d’arrivée :</strong> {animal.arrivalDate || "—"}
                        </Typography>
                        <Typography variant="subtitle1"><strong>Box ID :</strong> {animal.boxId}</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{my: 2}}/>

                <Box>
                    <Typography variant="subtitle1"><strong>Comportement :</strong></Typography>
                    <Typography variant="body1" sx={{mb: 2}}>{animal.behaviour}</Typography>

                    <Typography variant="subtitle1"><strong>Santé :</strong></Typography>
                    <Typography variant="body1">{animal.health}</Typography>
                </Box>
                <Box sx={{mt: 3, display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="outlined" onClick={() => setOpenDialog(true)}>
                        Changer de box
                    </Button>
                </Box>
            </CardContent>
        </Card>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
            <DialogTitle>Changer de box</DialogTitle>
            <DialogContent sx={{mt: 1}}>
                <Select
                    fullWidth
                    value={selectedBoxId}
                    onChange={(e) => setSelectedBoxId(Number(e.target.value))}
                >
                    {boxes.map((box) => (
                        <MenuItem key={box.id} value={box.id}>
                            {box.name} — {box.address}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
                <Button onClick={handleChangeBox} variant="contained">Valider</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};

export default AnimalDetails;
