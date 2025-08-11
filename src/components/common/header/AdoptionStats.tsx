import {useEffect, useState, useTransition} from "react";
import type {AdoptionType} from "../../../types/Adoption.type.ts";
import {getLastMonthAdoptions} from "../../../api/AdoptionRequests.ts";
import {Box, Grid, Paper, Skeleton, Typography} from "@mui/material";
import AdoptionMenu from "./AdoptionMenu.tsx";

const AdoptionStats = () => {
    const [hover, setHover] = useState(false);
    const [lastMonthAdoptions, setLastMonthAdoptions] = useState<AdoptionType[]>([])
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const fetchedAdoptions = await getLastMonthAdoptions();
            setLastMonthAdoptions(fetchedAdoptions);
        })
    }, []);

    return (
        <>
            <Grid size={{xs: 12, md: 6, lg: 3}}>
                <Box position="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <Paper elevation={3} sx={{p: 3, textAlign: "center"}}>
                        <Typography variant="h6">Adoptions récentes</Typography>
                        <Typography variant="h4" color="primary">{isPending ?
                            <Skeleton></Skeleton> : lastMonthAdoptions.length}</Typography>
                    </Paper>
                    {hover && (
                        <Box
                            position="absolute"
                            top="100%"
                            left={0}
                            width="100%"
                            zIndex={10}
                        >
                            <AdoptionMenu></AdoptionMenu>
                        </Box>
                    )}
                </Box>
            </Grid>
        </>
    )
}

export default AdoptionStats;