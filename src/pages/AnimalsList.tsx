import {useState} from "react";
import {Box, Grid} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import FiltersSideBar from "../components/common/FiltersSideBar";
import AnimalCard from "../components/common/cards/AnimalCard.tsx";
import type {AnimalType} from "../types/Animal.type.ts";

const AnimalsList = () => {
    const animals = useLoaderData() as AnimalType[];
    const [filteredAnimals, setFilteredAnimals] = useState<AnimalType[]>(animals);

    return (
        <Box sx={{display: "flex", flexDirection: "row", height: "100%"}}>
            <FiltersSideBar
                animals={animals}
                onFilteredChange={setFilteredAnimals}
            />
            <Box sx={{flex: 1, p: 2}}>
                <Grid container spacing={2}>
                    {filteredAnimals.map((animal) => (
                        <AnimalCard key={animal.id} animal={animal}/>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default AnimalsList;
