import {IconButton, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {type AnimalType, emptyAnimal} from "../../../types/Animal.type.ts";
import {addAnimal} from "../../../api/AnimalRequests.ts";
import AddAnimalDialog from "../dialogs/AddAnimalDialog.tsx";
import PetsIcon from '@mui/icons-material/Pets';

const AnimalMenu = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [newAnimal, setNewAnimal] = useState<AnimalType>(emptyAnimal);
    const navigate = useNavigate()


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
                <ListItemButton onClick={() => navigate("/animals")}>
                    <ListItem secondaryAction={<PetsIcon color="primary"/>
                    }>
                        <ListItemText
                            primary={"Afficher la liste"}
                        />
                    </ListItem>
                </ListItemButton>
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