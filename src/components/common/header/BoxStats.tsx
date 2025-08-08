import {useEffect, useState, useTransition} from "react";
import {Paper, Typography, Box, Skeleton, Grid} from "@mui/material";
import BoxMenu from "./BoxMenu.tsx";
import {getNumberOfBoxes, getNumberOfUsedBoxes} from "../../../api/BoxRequests.ts";

const BoxStats = () => {
    const [hover, setHover] = useState(false);
    const [totalNumberOfBoxes, setTotalNumberOfBoxes] = useState(0);
    const [totalNumberOfUsedBoxes, setTotalNumberOfUsedBoxes] = useState(0);
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(async () => {
            const totalBoxes = await getNumberOfBoxes();
            const usedBoxes = await getNumberOfUsedBoxes();
            startTransition( () => {
                setTotalNumberOfBoxes(totalBoxes);
                setTotalNumberOfUsedBoxes(usedBoxes);
            })
        })
    }, [])

    return (
        <Grid size={{xs: 12, md: 6, lg: 3}}>
            <Box position="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <Paper elevation={3} sx={{p: 3, textAlign: "center"}}>
                    <Typography variant="h6">Box</Typography>
                    <Typography variant="h4" color="primary">{isPending ? <Skeleton></Skeleton> : totalNumberOfUsedBoxes} / {totalNumberOfBoxes}</Typography>
                </Paper>
                {hover && (
                    <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        width="100%"
                        zIndex={10}
                    >
                        <BoxMenu/>
                    </Box>
                )}
            </Box>
        </Grid>
    )
}

export default BoxStats;