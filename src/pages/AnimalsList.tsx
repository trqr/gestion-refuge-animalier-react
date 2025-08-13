import {useState} from "react";
import {Box, Grid} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import FiltersSideBar from "../components/common/FiltersSideBar";
import AnimalCard from "../components/common/cards/AnimalCard.tsx";
import type {AnimalType} from "../types/Animal.type.ts";
import Page from "./layout/Page.tsx";

const AnimalsList = () => {
    const animals = useLoaderData() as AnimalType[];
    const [filteredAnimals, setFilteredAnimals] = useState<AnimalType[]>(animals);

    return (
        <Page title="Les animaux" description={"Liste des animaux."}>
            <Box sx={{display: "flex", flexDirection: "row", height: "100%", justifyContent: "space-between"}}>
                <FiltersSideBar
                    animals={animals}
                    onFilteredChange={setFilteredAnimals}
                />
                <Box sx={{flex: 1, paddingLeft: 2}}>
                    <Grid container spacing={2}>
                        {filteredAnimals.map((animal) => (
                            <AnimalCard key={animal.id} animal={animal}/>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Page>
    );
};

export default AnimalsList;
