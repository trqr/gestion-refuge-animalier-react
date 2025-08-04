import {IconButton, List, ListItem, ListItemButton, ListItemText, Skeleton, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState, useTransition} from "react";
import {useNavigate} from "react-router-dom";
import {type AnimalType, emptyAnimal} from "../../types/Animal.type.ts";
import {addAnimal, getAnimals} from "../../api/AnimalRequests.ts";
import AddAnimalDialog from "./AddAnimalDialog.tsx";

const AnimalMenu = () => {
    const [animals, setAnimals] = useState<AnimalType[]>([]);
    const [isPending, startTransition] = useTransition();
    const [openDialog, setOpenDialog] = useState(false);
    const [newAnimal, setNewAnimal] = useState<AnimalType>(emptyAnimal);
    const navigate = useNavigate()

    useEffect(() => {
        startTransition(async () => {
            const fetchedAnimals = await getAnimals();
            setAnimals(fetchedAnimals);
        })
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setNewAnimal(prev => ({
            ...prev,
            [name]: name === "boxId" ? Number(value) : value
        }));
    };

    const handleSubmit = async () => {
        await addAnimal(newAnimal).then((data) => navigate(`/animal/${data.id}`));
        setOpenDialog(false);
    }

    return (
        <>
        <List sx={{bgcolor: 'background.paper'}}>
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="add" onClick={() => setOpenDialog(true)}>
                        <AddIcon></AddIcon>
                    </IconButton>}>
                    <ListItemText
                        primary={"Ajouter un animal"}
                    />
                </ListItem>
            {isPending
                ? <Skeleton></Skeleton>
                : animals.map((animal: AnimalType) => (
                    <ListItemButton
                        key={animal.id}
                        onClick={() => navigate(`animal/${animal.id}`)}
                    >
                        <ListItem secondaryAction={
                            <Typography color={"textPrimary"}>{animal.race}</Typography>}>
                            <ListItemText
                                primary={animal.name}
                                secondary={`${animal.sex} - ${animal.type}`}
                            />
                        </ListItem>
                    </ListItemButton>
                ))}
        </List>
        <AddAnimalDialog
            newAnimal={newAnimal}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            handleInputChange={handleInputChange}
            onSubmit={handleSubmit}
        ></AddAnimalDialog>
        </>
    )
}

export default AnimalMenu;