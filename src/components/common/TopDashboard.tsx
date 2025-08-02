import { useEffect, useState, useTransition} from "react";
import {getAllBoxes, getAllBoxesAvaibility} from "../../api/BoxRequests.ts";
import {Box, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import type {Cage} from "../../types/Cage.ts";

const TopDashboard = () => {
    const [boxes, setBoxes] = useState<Cage[]>([]);
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(async () => {
            const boxes = await getAllBoxesAvaibility();
            startTransition( () => {
                setBoxes(boxes);
                console.log(boxes);
            })
        })
    }, []);

    return (
        <>
            <List>
            {boxes.map((box: Cage) => (
                <ListItemButton
                    key={box.id}
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

export default TopDashboard;