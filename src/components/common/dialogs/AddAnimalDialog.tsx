import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem, Select, type SelectChangeEvent
} from "@mui/material";
import type {AnimalType} from "../../../types/Animal.type.ts";
import {useEffect, useState, useTransition} from "react";
import type {BoxDetailsType} from "../../../types/BoxDetails.type.ts";
import {getAllBoxes} from "../../../api/BoxRequests.ts";

type AddAnimalDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    newAnimal: AnimalType;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;};

const AddAnimalDialog = ({
                             open,
                             onClose,
                             onSubmit,
                             newAnimal,
                             handleInputChange
                         }: AddAnimalDialogProps) => {

    const [boxes, setBoxes] = useState<BoxDetailsType[]>([])
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition( async () => {
            const fetchedBoxes = await getAllBoxes();
            setBoxes(fetchedBoxes);
        })
    }, []);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Ajouter un nouvel animal</DialogTitle>
            <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2, mt: 1}}>
                <TextField
                    label="Nom"
                    name="name"
                    value={newAnimal.name}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Type"
                    name="type"
                    value={newAnimal.type}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Race"
                    name="race"
                    value={newAnimal.race}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Sexe"
                    name="sex"
                    select
                    value={newAnimal.sex}
                    onChange={handleInputChange}
                    fullWidth
                >
                    <MenuItem value="Mâle">Mâle</MenuItem>
                    <MenuItem value="Femelle">Femelle</MenuItem>
                </TextField>
                <TextField
                    label="Date de naissance"
                    name="birthDate"
                    type="date"
                    value={newAnimal.birthDate}
                    onChange={handleInputChange}
                    fullWidth
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    label="Comportement"
                    name="behaviour"
                    value={newAnimal.behaviour}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                />
                <TextField
                    label="Santé"
                    name="health"
                    value={newAnimal.health}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                />
                <TextField
                    label="URL de l’image"
                    name="picture"
                    value={newAnimal.picture}
                    onChange={handleInputChange}
                    fullWidth
                />
                <Select
                    fullWidth
                    name="boxId"
                    value={newAnimal.boxId}
                    onChange={handleInputChange}
                >
                    <MenuItem
                        value={0}
                        disabled
                    >Selectionnez le box</MenuItem>
                    {boxes.map((box) => (
                        <MenuItem key={box.id} value={box.id} disabled={(box.animals!.length >= box.capacity)}>
                            {box.name} — {box.address}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={onSubmit} variant="contained" disabled={isPending}>Ajouter</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAnimalDialog;
