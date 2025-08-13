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
import {boxSwitching, getAnimalBox} from "../api/AnimalRequests.ts";
import {getAnimalFood} from "../api/FoodRequests.ts";
import type {FoodType} from "../types/Food.type.ts";
import {getAnimalHealthCares, getAnimalNextHealthCare, getNextHealthCares} from "../api/HealthCareRequests.ts";
import type {HealthCareType} from "../types/HealthCare.type.ts";
import AddHealthCareDialog from "../components/common/dialogs/AddHealthCareDialog.tsx";
import Page from "./layout/Page.tsx";

const AnimalDetails = () => {
    const animal: AnimalType = useLoaderData();
    const [boxes, setBoxes] = useState<BoxDetailsType[]>([]);
    const [animalBox, setAnimalBox] = useState<BoxDetailsType>()
    const [animalFood, setAnimalFood] = useState<FoodType[]>([]);
    const [animalHealthCares, setAnimalHealthCares] = useState<HealthCareType[]>([])
    const [nextHealthCare, setNextHealthCare] = useState<HealthCareType | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openHealthCareDialog, setOpenHealthCareDialog] = useState(false);
    const [selectedBoxId, setSelectedBoxId] = useState<number>(animal.boxId);
    const [imgSrc, setImgSrc] = useState(animal.picture || "https://placehold.co/1200x1200");
    const [isPending, startTransition] = useTransition()

    const handleChangeBox = async () => {
        await boxSwitching(animal!, selectedBoxId);
        setOpenDialog(false);
    };

    useEffect(() => {
        startTransition(async () => {
            const fetchedBoxes: BoxDetailsType[] = await getAllBoxes();
            const fetchedAnimalBox: BoxDetailsType = await getAnimalBox(animal.id!);
            const fetchedFood: FoodType[] = await getAnimalFood(animal.id!);
            const fetchedHealthCares = await getAnimalHealthCares(animal.id!)
            const fetchedNextHealthCare = await getAnimalNextHealthCare(animal.id!)
            setBoxes(fetchedBoxes);
            setAnimalBox(fetchedAnimalBox);
            setAnimalFood(fetchedFood);
            setAnimalHealthCares(fetchedHealthCares);
            setNextHealthCare(fetchedNextHealthCare);
        })
    }, [selectedBoxId]);

    return (
        <Page title={`${animal.name}`} description={`La page du ${animal.type} : ${animal.name}`} >
        <Card sx={{margin: "2rem auto", borderRadius: 4, boxShadow: 4, display: "flex"}}>
            <Box sx={{width: "45%"}}>
                <CardMedia
                    component="img"
                    image={imgSrc}
                    alt={animal.name}
                    onError={() => setImgSrc("https://placehold.co/1200x1800")}
                    sx={{objectFit: "cover"}}
                />
            </Box>
            <CardContent sx={{width: "60%"}}>
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
                        <Typography variant="subtitle1"><strong>Box :</strong> {animalBox?.name}
                            <Button
                                sx={{margin: "0 10px"}}
                                size={"small"}
                            variant="contained" onClick={() => setOpenDialog(true)}>
                            Changer de box
                        </Button></Typography>
                    </Grid>
                </Grid>

                <Divider sx={{my: 2}}/>

                <Grid container spacing={2}>
                    <Grid size={{xs: 6}} sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                        <Typography variant="subtitle1"><strong>Santé :</strong> {animal.health}</Typography>
                        <Typography variant="subtitle1"><strong>Comportement :</strong> {animal.behaviour}</Typography>
                        <Typography variant="subtitle1">
                            <strong>Prochain soin :</strong>{" "}
                            {nextHealthCare
                                ? `${nextHealthCare.type} le ${nextHealthCare.date} (Vétérinaire : ${nextHealthCare.veterinarian.name})`
                                : "Aucun rendez-vous prévu."}
                        </Typography>
                        <Button variant={"contained"} size={"small"} sx={{width: "50%"}} onClick={() => setOpenHealthCareDialog(true)}>Prendre un rdv</Button>
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <Typography variant="h6" gutterBottom>Soins</Typography>
                        {animalHealthCares.length === 0 ? <Typography> Aucun soin sur cet animal.</Typography>
                        : animalHealthCares.map((healthCare: HealthCareType) =>
                                <Card key={healthCare.id} variant="outlined" sx={{p: 2}}>
                                    <Typography variant="subtitle1">{healthCare.type} le {healthCare.date}</Typography>
                                    <Typography variant="body2"><strong>Vétérinaire
                                        :</strong> {healthCare.veterinarian.name}</Typography>
                                    {healthCare.description && (
                                        <Typography variant="body2"><strong>Description
                                            :</strong> {healthCare.description}</Typography>
                                    )}
                                </Card>
                            )}
                    </Grid>
                </Grid>
                <Divider sx={{my: 2}}/>

                <Box>
                    <Typography variant="h6" gutterBottom>Nourriture</Typography>

                    {animalFood.length === 0 ? (
                        <Typography variant="body1" color="text.secondary">Aucune information sur la
                            nourriture.</Typography>
                    ) : (
                        <Grid container spacing={2} >
                            {animalFood.map((food, index) => (
                                <Grid sx={{xs: 12, width: "100%"}} key={index}>
                                    <Card variant="outlined" sx={{p: 2}} >
                                        <Typography variant="subtitle1"><strong>Type :</strong> {food.type}</Typography>
                                        <Typography variant="body2"><strong>Quantité
                                            :</strong> {food.quantity} g</Typography>
                                        <Typography variant="body2"><strong>Fréquence :</strong> {food.frequency}
                                        </Typography>
                                        {food.description && (
                                            <Typography variant="body2"><strong>Description
                                                :</strong> {food.description}</Typography>
                                        )}
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
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
                        <MenuItem key={box.id} value={box.id} disabled={(box.animals!.length >= box.capacity)}>
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
            <AddHealthCareDialog open={openHealthCareDialog} onClose={() => setOpenHealthCareDialog(false)} setOpen={setOpenHealthCareDialog} animalId={animal.id!}></AddHealthCareDialog>
        </Page>
    );
};

export default AnimalDetails;
