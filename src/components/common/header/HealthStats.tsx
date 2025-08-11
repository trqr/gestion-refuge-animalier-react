import {Box, Grid, Paper, Skeleton, Typography} from "@mui/material";
import {useEffect, useState, useTransition} from "react";
import type {HealthCareType} from "../../../types/HealthCare.type.ts";
import {getNextHealthCares} from "../../../api/HealthCareRequests.ts";
import HealthMenu from "./HealthMenu.tsx";

const HealthStats = () => {
    const [hover, setHover] = useState(false);
    const [nextHealthCares, setNextHealthCares] = useState<HealthCareType[]>([]);
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition( async () => {
            const fetchedHealthCares: HealthCareType[] = await getNextHealthCares();
            setNextHealthCares(fetchedHealthCares);
        })
    }, [])

    return (
        <Grid size={{xs: 12, md: 6, lg: 3}}>
            <Box position="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <Paper elevation={3} sx={{p: 3, textAlign: "center"}}>
                    <Typography variant="h6">Prochains soins</Typography>
                    <Typography variant="h4" color="primary">{isPending ?
                        <Skeleton></Skeleton> : nextHealthCares.length}</Typography>
                </Paper>
                {hover && (
                    <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        width="100%"
                        zIndex={10}
                    >
                        <HealthMenu healthCares={nextHealthCares}/>
                    </Box>
                )}
            </Box>
        </Grid>
    )
}

export default HealthStats;