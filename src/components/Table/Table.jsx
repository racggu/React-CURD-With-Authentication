
import React , { useState ,useEffect}from 'react'
import * as Net from '../../api/other';
import {Button, Container} from 'react-bootstrap';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';


let modifiedArr =[]

const Table1 = (setModalOpen) => {
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const get_ADDRESS_SEARCH =  (keyword) => {

		const retrieveDetailURL = '';
		const requestOptions = {
			method: "GET",
			params: {
				'currentPage': 1,
				'countPerPage': 1000,
				'keyword' : keyword,
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

	const customCellRenderer = (params) => (
		<div  style={{ whiteSpace: 'pre-wrap', lineHeight: '2' }}>
		  <table>
			  <tr>{params.row.roadAddr}</tr>
			  <tr>[지번] {params.row.jibunAddr}</tr>
		  </table>
		</div>
	);

	const columns: GridColDef[] = [
		{ field: 'roadAddr', headerName: '도로명주소', width: 500, renderCell: customCellRenderer },
		{ field: 'zipNo', headerName: ' 우편번호', width: 80 },
	  ];
	const generateId = () => {
		return uuidv4();
	};

	const getRowId = (row) => {
		return row.id || generateId(); // If row.id doesn't exist, generate a new ID
	};

	const handleChange = (event) => {
	  setSearchTerm(event.target.value);
	};
  
	const handleSubmit = (event) => {
	  event.preventDefault();
	  get_ADDRESS_SEARCH(searchTerm)
	};

    const handleCloseModal = () => {
		console.log('close modal', 'test');
		setModalOpen = false;
		console.log('close modal', setModalOpen);
    };

	return (
	<Container>	
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>

    <div className="DataGrid" style={{ width: 590}}>
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
		onCellDoubleClick={(clickrow) => handleCloseModal()} //console.log(clickrow)}
      />
    </div>
	</Container>
);
}
export default Table1;