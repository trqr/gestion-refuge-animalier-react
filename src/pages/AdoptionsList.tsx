import {useLoaderData, useRevalidator} from "react-router-dom";
import { Paper } from "@mui/material";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {useState} from "react";
import Page from "./layout/Page.tsx";


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
        </Page>
    )
}

export default AdoptionsList