import {Icon, IconButton, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useState} from "react";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import RuleIcon from '@mui/icons-material/Rule';
import CreateAdoptionDialog from "../dialogs/CreateAdoptionDialog.tsx";
import {useNavigate} from "react-router-dom";

const AdoptionMenu = () => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <>
            <List sx={{bgcolor: 'background.paper'}}>
                <ListItemButton onClick={() => setOpen(true)}>
                    <ListItem secondaryAction={
                        <IconButton edge="end" aria-label="add">
                            <CreateNewFolderIcon></CreateNewFolderIcon>
                        </IconButton>}>
                        <ListItemText
                            primary={"Créer le dossier"}>
                        </ListItemText>
                    </ListItem>
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/adoptions")}>
                    <ListItem secondaryAction={
                        <IconButton edge="end" aria-label="add">
                            <RuleIcon fontSize={"small"}></RuleIcon>
                        </IconButton>}>
                        <ListItemText
                            primary={"Consulter les dossiers"}>
                        </ListItemText>
                    </ListItem>
                </ListItemButton>
            </List>
            <CreateAdoptionDialog open={open} setOpen={setOpen}></CreateAdoptionDialog>
        </>
    )
}

export default AdoptionMenu