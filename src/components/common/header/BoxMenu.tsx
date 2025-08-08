import { useEffect, useState, useTransition} from "react";
import {createBox, getAllBoxesAvaibility} from "../../../api/BoxRequests.ts";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, List, ListItem, ListItemButton, ListItemText, Skeleton,
    TextField, Typography
} from "@mui/material";
import type {BoxAvailabilityType} from "../../../types/BoxAvailability.type.ts";
import {useNavigate} from "react-router-dom";
import {type BoxDetailsType, emptyBoxDetails} from "../../../types/BoxDetails.type.ts";
import AddIcon from "@mui/icons-material/Add";

const BoxMenu = () => {
    const [boxes, setBoxes] = useState<BoxAvailabilityType[]>([]);
    const [isPending, startTransition] = useTransition();
    const [openDialog, setOpenDialog] = useState(false);
    const [newBox, setNewBox] = useState<BoxDetailsType>(emptyBoxDetails);
    const navigate = useNavigate()

    useEffect(() => {
        getBoxes();
    }, []);

    const getBoxes = () => {
        startTransition( async () => {
            const boxes = await getAllBoxesAvaibility();
            setBoxes(boxes);
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewBox((prev) => ({
            ...prev,
            [name]: name === "capacity" ? parseInt(value) : value
        }));
    };

    const handleSubmit = async () => {
        await createBox(newBox).then((data) => navigate(`/box/${data.id}`));
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
                        primary={"Ajouter un Box"}
                    />
                </ListItem>
            </List>
            <List sx={{bgcolor: 'background.paper'}}>
            {isPending
                ? <Skeleton></Skeleton>
                : boxes.map((box: BoxAvailabilityType) => (
                <ListItemButton
                    key={box.id}
                    onClick={() => navigate(`box/${box.id}`)}
                >
                    <ListItem secondaryAction={box.available === 0 ? <Typography color={"error"}>FULL</Typography> : `${box.available} place(s) left` }>
                        <ListItemText
                            primary={box.name}
                            secondary={`${box.occupied}/${box.capacity}`}
                        />
                    </ListItem>
                </ListItemButton>
            ))}
            </List>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
                <DialogTitle>Ajouter un nouveau box</DialogTitle>
                <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2, mt: 1}}>
                    <TextField
                        label="Nom"
                        name="name"
                        value={newBox.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Type"
                        name="type"
                        value={newBox.type}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Capacité"
                        name="capacity"
                        type="number"
                        value={newBox.capacity}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Adresse"
                        name="address"
                        value={newBox.address}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BoxMenu;