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
import {useEffect, useState, useTransition} from "react";
import {getAnimals} from "../../../api/AnimalRequests.ts";
import {getVets} from "../../../api/VetsRequests.ts";
import {DatePicker} from "@mui/x-date-pickers";
import type {AnimalType} from "../../../types/Animal.type.ts";
import type {VeterinarianType} from "../../../types/Veterinarian.type.ts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {addHealthCare} from "../../../api/HealthCareRequests.ts";
import {Dayjs} from "dayjs";

type AddHealthCareDialogProps = {
    open: boolean;
    onClose: () => void;
    setOpen: (open: boolean) => void;
}

const AddHealthCareDialog = ({open, onClose, setOpen}: AddHealthCareDialogProps) => {
    const [selectedVetId, setSelectedVetId] = useState<number>(0);
    const [selectedAnimalId, setSelectedAnimalId] = useState<number>(0);
    const [type, setType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);

    const [animals, setAnimals] = useState<AnimalType[]>([]);
    const [vets, setVets] = useState<VeterinarianType[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const fetchedAnimals = await getAnimals();
            const fetchedVets = await getVets();
            setAnimals(fetchedAnimals);
            setVets(fetchedVets);
        });
    }, []);

    const handleSubmit = async () => {
        await addHealthCare({
            animalId: selectedAnimalId,
            vetId: selectedVetId,
            type: type,
            description: description,
            date: date ? date.toDate() : null // conversion Dayjs -> Date
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Ajouter un soin</DialogTitle>
            <DialogContent sx={{mt: 1, display: "flex", flexDirection: "column", gap: 2}}>

                <Select
                    fullWidth
                    value={selectedAnimalId}
                    onChange={(e) => setSelectedAnimalId(Number(e.target.value))}
                    displayEmpty
                >
                    <MenuItem value={0} disabled>Choisir un animal</MenuItem>
                    {animals.map((animal) => (
                        <MenuItem key={animal.id} value={animal.id}>
                            {animal.name} - {animal.race}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    fullWidth
                    value={selectedVetId}
                    onChange={(e) => setSelectedVetId(Number(e.target.value))}
                    displayEmpty
                >
                    <MenuItem value={0} disabled>Choisir un vétérinaire</MenuItem>
                    {vets.map((vet) => (
                        <MenuItem key={vet.id} value={vet.id}>
                            {vet.name}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    fullWidth
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Type de soin</MenuItem>
                    <MenuItem value="Vaccination">Vaccination</MenuItem>
                    <MenuItem value="Vermifuge">Vermifuge</MenuItem>
                    <MenuItem value="Chirurgie">Chirurgie</MenuItem>
                    <MenuItem value="Autre">Autre</MenuItem>
                </Select>
                <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                    />
                </LocalizationProvider>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setOpen(false)}>Annuler</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={isPending}>
                    Ajouter
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddHealthCareDialog;
