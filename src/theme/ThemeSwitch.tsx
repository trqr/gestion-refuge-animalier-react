import {Box, Switch, useColorScheme} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeSwitch = () => {
    const {mode, setMode} = useColorScheme();

    const handleChange = () => {
        setMode(mode === "light" ? "dark" : "light");
    };

    return (
        <Box sx={{display: "flex", alignItems: "center", gap: "6px", margin: "0 20px"}}>
            <DarkModeIcon fontSize="small"/>
            <Switch
                checked={mode === "light"}
                onChange={handleChange}
                size="small"
            />
            <LightModeIcon fontSize="small"/>
        </Box>
    );
};

export default ThemeSwitch;
