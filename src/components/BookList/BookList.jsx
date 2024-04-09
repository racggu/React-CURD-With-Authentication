import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Button, Container} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const CrudTable = () => {
  // Sample data
  const rows = [
    { id: 1, data1: 'Data 1', data2: 'Data 2' },
    { id: 2, data1: 'Another Data 1', data2: 'Another Data 2' },
  ];

  // Custom cell renderer function
  const customCellRenderer = (params) => (
    <div>
      <table>
      <tr>
        <td>{params.row.data1}</td>
        <td>{params.row.data2}</td>
      </tr>
      </table>

    </div>
  );

  // Column definitions
  const columns = [
    { field: <Container><div>{'data1'}</div> <div>{'data2'}</div></Container>, headerName: 'Data', width: 100, renderCell: customCellRenderer },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default CrudTable;