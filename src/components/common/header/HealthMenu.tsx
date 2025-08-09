import {IconButton, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import type {HealthCareType} from "../../../types/HealthCare.type.ts";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import ScheduleIcon from '@mui/icons-material/Schedule';


type HealthMenuProps = {
    healthCares: HealthCareType[];
}

const HealthMenu = ({healthCares}: HealthMenuProps) => {
    dayjs.extend(relativeTime);

    return (
        <List sx={{bgcolor: 'background.paper'}}>
            <ListItemButton>
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="add">
                        <ScheduleIcon></ScheduleIcon>
                    </IconButton>}>
                    <ListItemText
                        primary={"Planifier un soin"}
                    />
                </ListItem>
            </ListItemButton>
            {healthCares.map(healthCare => (
                <ListItemButton key={healthCare.id}>
                    <ListItem secondaryAction={<Typography variant={"subtitle2"}>{dayjs().to(dayjs(healthCare.date))}</Typography>}>
                        <ListItemText
                            primary={healthCare.type}
                            secondary={healthCare.veterinarian.name}>
                        </ListItemText>
                    </ListItem>
                </ListItemButton>
            ))}
        </List>
    )
}

export default HealthMenu;