import React, { useState } from 'react';
import * as Net from '../../api/other';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

let modifiedArr =[]

const Modal = ({ isOpen, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);

  //part1. API
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

 //part2. DataGrid
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


   //part3. outher
   
	const handleSubmit = (event) => {
	  event.preventDefault();
	  get_ADDRESS_SEARCH(inputValue)
	};

  const handleClose = (clickrow) => {
    console.log("lakku", clickrow)
    onClose(); // Close the modal without saving
  };

  const handleSave = () => {
    onSave(inputValue); // Save the input value and then close the modal
    onClose(); // Close the modal after saving
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  if (!isOpen) {
    return null; // Return null if the modal is not open
  }

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
      <div className="modal-search">
          <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
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
		onCellDoubleClick={(clickrow) => handleClose(clickrow)} //console.log(clickrow)}
      />
    </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (value) => {
    setModalValue(value); // Save the value received from the modal
  };

  return (
    <div>
      <div className="text"><input type="text"/></div>
      <button onClick={openModal}>조회</button>
      <p>Modal Value: {modalValue}  ============================</p>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
    </div>
  );
};

export default App;