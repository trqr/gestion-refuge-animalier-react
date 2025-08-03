import { useEffect, useState, useTransition} from "react";
import { getAllBoxesAvaibility} from "../../api/BoxRequests.ts";
import {List, ListItem, ListItemButton, ListItemText, Skeleton, Typography} from "@mui/material";
import type {BoxAvailabilityType} from "../../types/BoxAvailability.type.ts";
import {useNavigate} from "react-router-dom";

const BoxMenu = () => {
    const [boxes, setBoxes] = useState<BoxAvailabilityType[]>([]);
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate()

    useEffect(() => {
        startTransition(async () => {
            const boxes = await getAllBoxesAvaibility();
            startTransition( () => {
                setBoxes(boxes);
            })
        })
    }, []);

    return (
        <>
            <List sx={{backgroundColor: "background.paper"}}>
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
        </>
    )
}

export default BoxMenu;