import {useEffect, useState, useTransition} from "react";
import type {AnimalType} from "../../../types/Animal.type.ts";
import {type AdoptionDTO, emptyAdoptionDTO} from "../../../types/DTOs/AdoptionDTO.ts";
import {getAnimals} from "../../../api/AnimalRequests.ts";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

type CreateAdoptionDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const CreateAdoptionDialog = ({open, setOpen}: CreateAdoptionDialogProps) => {
    const [animals, setAnimals] = useState<AnimalType[]>([]);
    const [newAdoption, setNewAdoption] = useState<AdoptionDTO>(emptyAdoptionDTO)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition( async () => {
            const fetchedAnimals = await getAnimals();
            setAnimals(fetchedAnimals);
        })
    }, []);

    const handleSubmit = async () => {
        if (!isFormValid()) return;

        // mon post a rajouter
        setOpen(false);
        setNewAdoption(emptyAdoptionDTO);
    }

    const isFormValid = () => {
        return (
            newAdoption.animalId !== 0 &&
            newAdoption.name.trim() !== "" &&
            newAdoption.address.trim() !== "" &&
            newAdoption.phone.trim() !== "" &&
            newAdoption.email.trim() !== ""
        );
    }

    const handleChange = (field: keyof AdoptionDTO, value: string | number) => {
        setNewAdoption(prev => ({...prev, [field]: value}));
    };

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <Select
                        fullWidth
                        value={newAdoption.animalId}
                        onChange={(e) => handleChange("animalId", Number(e.target.value))}
                        displayEmpty
                    >
                        <MenuItem value={0} disabled>Choisir un animal</MenuItem>
                        {animals.map((animal: AnimalType) => (
                            <MenuItem key={animal.id} value={animal.id}>{animal.name} - {animal.type}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        label="Nom de l'adoptant"
                        value={newAdoption.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />

                    <TextField
                        label="Adresse"
                        value={newAdoption.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                    />

                    <TextField
                        label="Téléphone"
                        value={newAdoption.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />

                    <TextField
                        label="Email"
                        type="email"
                        value={newAdoption.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Annuler</Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={!isFormValid()}>
                        Créer le dossier
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default CreateAdoptionDialog