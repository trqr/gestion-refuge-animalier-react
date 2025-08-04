import {Box, Grid, Paper, Skeleton, Typography} from "@mui/material";
import BoxMenu from "./BoxMenu.tsx";
import {useEffect, useState, useTransition} from "react";
import {getNumberOfBoxes, getNumberOfUsedBoxes} from "../../api/BoxRequests.ts";
import {getNumberOfAnimals} from "../../api/AnimalRequests.ts";
import AnimalMenu from "./AnimalMenu.tsx";

const AnimalStats = () => {
    const [totalAnimals, setTotalAnimals] = useState<number>(0)
    const [isPending, startTransition] = useTransition()
    const [hover, setHover] = useState(false);


    useEffect(() => {
        startTransition(async () => {
            const totalAnimals = await getNumberOfAnimals();
            startTransition(() => {
                setTotalAnimals(totalAnimals);
            })
        })
    }, [])


    return (
        <Grid size={{xs: 12, md: 6, lg: 3}}>
            <Box position="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <Paper elevation={3} sx={{p: 3, textAlign: "center"}}>
                    <Typography variant="h6">Animals</Typography>
                    <Typography variant="h4" color="primary">{isPending ?
                        <Skeleton></Skeleton> : totalAnimals}</Typography>
                </Paper>
                {hover && (
                    <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        width="100%"
                        zIndex={10}
                    >
                        <AnimalMenu/>
                    </Box>
                )}
            </Box>
        </Grid>
    )
}

export default AnimalStats;