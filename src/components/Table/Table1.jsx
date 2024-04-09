
import React , { useState ,useEffect}from 'react'
import * as Net from '../../api/other';
import {Button, Container} from 'react-bootstrap';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';


let modifiedArr =[]

function Table1(props) {
	const [data, setData] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);
	const get_ADDRESS_SEARCH =  () => {

		const retrieveDetailURL = '';
		const requestOptions = {
			method: "GET",
			params: {
				'currentPage': 1,
				'countPerPage': 10,
				'keyword' : "예강",
				'resultType': "json"
			}
		}
  
	  Net.requestFetch(retrieveDetailURL,
		  requestOptions,
		  function (resp) {
			 console.log(resp.results.juso);

			 modifiedArr = resp.results.juso.map(function(element){
				return { id: element.any , roadAddr: element.roadAddr , jibunAddr: element.jibunAddr, zipNo :element.zipNo};
			  });
			  console.log('lakku', modifiedArr)

			 setData(resp.results.juso)
		  }
		);
	}
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'No', width: 70 },
		{ field: 'roadAddr', headerName: '도로명주소', width: 130, renderCell: (params) => <img src={params.value} width = "40"/> },
		{ field: 'jibunAddr', headerName: '지번', width: 130  },
		{ field: 'zipNo', headerName: ' 우편번호', width: 130 },
	  ];
	const generateId = () => {
		return uuidv4();
	};

	const getRowId = (row) => {
		return row.id || generateId(); // If row.id doesn't exist, generate a new ID
	};

	return (
	<Container>	
	<div className="Button">
	 <Button onClick={() => get_ADDRESS_SEARCH()}>조회</Button>
    </div>
    <div className="DataGrid">
      <DataGrid
        rows={data}
		getRowId={getRowId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newSelectedIds) => {
          setSelectedIds(newSelectedIds);
        }}
        selectedIds={selectedIds}
		
      />
    </div>
	</Container>
);
}
export default Table1;