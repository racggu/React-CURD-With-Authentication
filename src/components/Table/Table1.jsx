import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130,  renderCell: (params) => <img src={params.value} width = "130"/> },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'http://localhost:8080/static/products/DEFAULT/table1/SMALL/console-1.jpg', age: 35 },
];

export default function Table1() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </div>
  );
}
