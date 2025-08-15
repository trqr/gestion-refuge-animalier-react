import {useEffect, useState, useTransition} from "react";
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {getArrivalsVsAdoptions} from "../../../api/services/Stats.service.ts";
import {Card, CardContent, Grid, Typography} from "@mui/material";

type DataPoint = {
    month: string;
    arrivals: number;
    adoptions: number;
};

const ArrivalsVsAdoptionsChart = () => {
    const [data, setData] = useState<DataPoint[]>([]);
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition( async () => {
            const fetchedData: DataPoint[] = await getArrivalsVsAdoptions();
            setData(fetchedData);
        })
    }, []);

    return (
        <Grid size={{xs: 12, md: 6}}>
            <Card>
                {!isPending &&
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Courbe des arrivées contre adoptions
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="arrivals" stroke="#ff7300" strokeWidth={2} name="Arrivées"/>
                            <Line type="monotone" dataKey="adoptions" stroke="#387908" strokeWidth={2} name="Adoptions"/>
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
                }
            </Card>
        </Grid>
    );
}

export default ArrivalsVsAdoptionsChart;
