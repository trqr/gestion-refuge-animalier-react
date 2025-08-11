import {useState, useMemo, useEffect} from "react";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Button,
} from "@mui/material";
import type {AnimalType} from "../../types/Animal.type.ts";

type Filters = {
    name: string;
    type: string;
    race: string;
    sex: string;
    behaviour: string;
    health: string;
    adopted: string;
};

interface FiltersSideBarProps {
    animals: AnimalType[];
    onFilteredChange: (filtered: AnimalType[]) => void;
}

const FiltersSideBar = ({animals, onFilteredChange}: FiltersSideBarProps) => {
    const [filters, setFilters] = useState<Filters>({
        name: "",
        type: "",
        race: "",
        sex: "",
        behaviour: "",
        health: "",
        adopted: "",
    });

    const handleChange = (field: keyof Filters, value: string) => {
        setFilters((prev) => ({...prev, [field]: value}));
    };

    const handleReset = () => {
        setFilters({
            name: "",
            type: "",
            race: "",
            sex: "",
            behaviour: "",
            health: "",
            adopted: "",
        });
    };

    const filteredAnimals = useMemo(() => {
        return animals.filter((animal) => {
            return (
                (!filters.name ||
                    animal.name.toLowerCase().includes(filters.name.toLowerCase())) &&
                (!filters.type || animal.type === filters.type) &&
                (!filters.race ||
                    animal.race.toLowerCase().includes(filters.race.toLowerCase())) &&
                (!filters.sex || animal.sex === filters.sex) &&
                (!filters.behaviour ||
                    animal.behaviour
                        .toLowerCase()
                        .includes(filters.behaviour.toLowerCase())) &&
                (!filters.health ||
                    animal.health.toLowerCase().includes(filters.health.toLowerCase())) &&
                (!filters.adopted ||
                    String(animal.adopted) === filters.adopted)
            );
        });
    }, [animals, filters]);

    useEffect(() => {
        onFilteredChange(filteredAnimals);
    }, [filteredAnimals, onFilteredChange]);

    return (
        <Box
            sx={{
                width: "22%",
                paddingRight: 2,
                borderRight: "1px solid #ccc",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h6">Filtres</Typography>

            <TextField
                label="Nom"
                value={filters.name}
                onChange={(e) => handleChange("name", e.target.value)}
                size="small"
            />

            <TextField
                label="Race"
                value={filters.race}
                onChange={(e) => handleChange("race", e.target.value)}
                size="small"
            />

            <FormControl size="small">
                <InputLabel>Type</InputLabel>
                <Select
                    value={filters.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                >
                    <MenuItem value="">Tous</MenuItem>
                    <MenuItem value="Chien">Chien</MenuItem>
                    <MenuItem value="Chat">Chat</MenuItem>
                    <MenuItem value="Oiseau">Oiseau</MenuItem>
                    <MenuItem value="Rongeur">Rongeur</MenuItem>
                </Select>
            </FormControl>

            <FormControl size="small">
                <InputLabel>Sexe</InputLabel>
                <Select
                    value={filters.sex}
                    onChange={(e) => handleChange("sex", e.target.value)}
                >
                    <MenuItem value="">Tous</MenuItem>
                    <MenuItem value="M">Mâle</MenuItem>
                    <MenuItem value="F">Femelle</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Comportement"
                value={filters.behaviour}
                onChange={(e) => handleChange("behaviour", e.target.value)}
                size="small"
            />

            <TextField
                label="Santé"
                value={filters.health}
                onChange={(e) => handleChange("health", e.target.value)}
                size="small"
            />

            <FormControl size="small">
                <InputLabel>Adoption</InputLabel>
                <Select
                    value={filters.adopted}
                    onChange={(e) => handleChange("adopted", e.target.value)}
                >
                    <MenuItem value="">Tous</MenuItem>
                    <MenuItem value="true">Adoptés</MenuItem>
                    <MenuItem value="false">Non adoptés</MenuItem>
                </Select>
            </FormControl>

            <Button variant="outlined" color="secondary" onClick={handleReset}>
                Réinitialiser
            </Button>
        </Box>
    );
};

export default FiltersSideBar;
