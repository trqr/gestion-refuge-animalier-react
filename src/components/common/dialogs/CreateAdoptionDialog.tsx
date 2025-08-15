import {useEffect, useState, useTransition} from "react";
import type {AnimalType} from "../../../types/Animal.type.ts";
import {type AdoptionDTO, emptyAdoptionDTO} from "../../../types/DTOs/AdoptionDTO.ts";
import { getNotAdoptedAnimals} from "../../../api/AnimalRequests.ts";
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
import {createAdoption} from "../../../api/AdoptionRequests.ts";

type CreateAdoptionDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

type Errors = {
    animalId?: string;
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
};

const CreateAdoptionDialog = ({open, setOpen}: CreateAdoptionDialogProps) => {
    const [animals, setAnimals] = useState<AnimalType[]>([]);
    const [newAdoption, setNewAdoption] = useState<AdoptionDTO>(emptyAdoptionDTO)
    const [errors, setErrors] = useState<Errors>({});
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition( async () => {
            const fetchedAnimals = await getNotAdoptedAnimals();
            setAnimals(fetchedAnimals);
        })
    }, []);

    const handleSubmit = async () => {
        if (!isFormValid()) return;

        await createAdoption(newAdoption);
        setOpen(false);
        setNewAdoption(emptyAdoptionDTO);
    }

    const isFormValid = () => {
        const newErrors: Errors = {};

        if (newAdoption.animalId === 0) {
            newErrors.animalId = "Veuillez choisir un animal";
        }
        if (!newAdoption.name.trim()) {
            newErrors.name = "Nom obligatoire";
        }
        if (!newAdoption.address.trim()) {
            newErrors.address = "Adresse obligatoire";
        }
        if (!/^\+?\d{6,15}$/.test(newAdoption.phone.trim())) {
            newErrors.phone = "Téléphone invalide";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAdoption.email.trim())) {
            newErrors.email = "Email invalide";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
                        fullWidth
                        label="Nom de l'adoptant"
                        value={newAdoption.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Adresse"
                        value={newAdoption.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        error={!!errors.address}
                        helperText={errors.address}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Téléphone"
                        value={newAdoption.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={newAdoption.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        margin="dense"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Annuler</Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={isPending}>
                        Créer le dossier
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default CreateAdoptionDialog