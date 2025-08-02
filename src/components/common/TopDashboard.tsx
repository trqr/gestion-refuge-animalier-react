import { useEffect, useState, useTransition} from "react";
import {getAllBoxes} from "../../api/BoxRequests.ts";
import {Box, Typography} from "@mui/material";
import type {Cage} from "../../types/Cage.ts";

const TopDashboard = () => {
    const [boxes, setBoxes] = useState<Cage[]>([]);
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(async () => {
            const boxes = await getAllBoxes();
            startTransition( () => {
                setBoxes(boxes);
                console.log(boxes);
            })
        })
    }, []);

    return (
        <>
            {boxes.map((box: Cage) => (
                <Box key={box.id}>
                    <Typography variant={"h2"}>{box.name}</Typography>
                </Box>
            ))}
        </>
    )
}

export default TopDashboard;