import {useLoaderData, useRevalidator} from "react-router-dom";
import {Box, Button, Paper, Typography} from "@mui/material";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {useState} from "react";
import Page from "./layout/Page.tsx";
import {cancelAdoption, validateAdoption} from "../api/AdoptionRequests.ts";


const AdoptionsList = () => {
    const adoptions = useLoaderData();
    const {revalidate} = useRevalidator();
    const [selectedRows, setSelectedRows] = useState<number[]>([])

    const handleSelectionChange = (newSelection: any) => {
        const ids: never[] = Array.from(newSelection.ids)
        setSelectedRows(ids);
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {
            field: 'AdopterName',
            headerName: 'Adopter Name',
            width: 250,
            renderCell: (params) => params.row.adopter?.name || ''

        },
        {
            field: 'AdopterEmail',
            headerName: 'Adopter Email',
            width: 160,
            renderCell: (params) => params.row.adopter?.email || ''
        },
        {
            field: 'AdopterPhone',
            headerName: 'Adopter Phone',
            width: 130,
            renderCell: (params) => params.row.adopter?.phone || ''
        },
        {
            field: 'price',
            headerName: 'Animal ID and Name',
            type: 'number',
            width: 200,
            renderCell: (params) => `#${params.row.animal?.id} nommé ${params.row.animal?.name}` || ''
        },
        {
            field: 'status',
            headerName: 'Status',
            type: "string",
            width: 100,
        },
        {
            field: 'date',
            headerName: 'Date',
            type: "number",
            width: 130,
        }
    ];

    const paginationModel = {page: 0, pageSize: 10};

    const handleValidateAdoptions = async () => {
        await validateAdoption(selectedRows);
        await revalidate();
        setSelectedRows([]);
    }

    const handleCancelAdoptions = async () => {
        await cancelAdoption(selectedRows);
        await revalidate();
        setSelectedRows([]);
    }

    return (
        <Page title={"Adoptions"} description={"Liste des adoptions"}>
            <Paper sx={{height: 450, width: '100%'}}>
                <DataGrid

                    rows={adoptions}
                    columns={columns}
                    initialState={{pagination: {paginationModel}}}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionChange}
                    sx={{border: 0}}
                />
            </Paper>
            {selectedRows.length > 0 && (
                <Paper sx={{p: 2, mt: 2}}>
                    <Typography variant="body1">
                        {selectedRows.length} order(s) selected: {selectedRows.join(', ')}
                    </Typography>
                    <Box sx={{mt: 3, display: "flex", alignItems: "center", gap: 2}}>

                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!selectedRows}
                            onClick={handleValidateAdoptions}
                        >
                            Valider le(s) dossier(s)
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleCancelAdoptions}
                        >
                            Supprimer le(s) dossier(s)
                        </Button>
                    </Box>
                </Paper>
            )}
        </Page>
    )
}

export default AdoptionsList